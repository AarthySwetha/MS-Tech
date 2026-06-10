const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { length, width, height, areaType, cameraQuality, indoorOutdoor, notes } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const systemPrompt = `You are an expert CCTV installation consultant for MS Tech (based in Erode, Tamil Nadu, India). Given room/area dimensions and requirements, you estimate the number of cameras needed and the cost in INR (₹).

Pricing reference (INR):
- HD (2MP) Dome/Bullet Camera: ₹2,500 each
- Full HD (4MP) Camera: ₹4,500 each
- 4K (8MP) Camera: ₹8,000 each
- PTZ Camera: ₹15,000 each
- DVR/NVR (8 channel): ₹8,000
- DVR/NVR (16 channel): ₹14,000
- Hard Disk (2TB): ₹6,500
- Cabling & accessories per camera: ₹800
- Installation labour per camera: ₹1,200

Coverage rules:
- A standard fixed camera covers ~25-40 sqm effectively
- Outdoor needs weatherproof bullet cameras
- Large open areas (>100 sqm) benefit from 1 PTZ + fixed cameras
- Always recommend at least one camera per entry/exit point

Respond ONLY by calling the provide_estimate tool.`;

    const userPrompt = `Area dimensions: ${length}m x ${width}m (height: ${height}m)
Area type: ${areaType}
Camera quality preference: ${cameraQuality}
Indoor/Outdoor: ${indoorOutdoor}
Additional notes: ${notes || "none"}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "provide_estimate",
            description: "Provide CCTV camera estimate",
            parameters: {
              type: "object",
              properties: {
                totalArea: { type: "number", description: "Total area in square meters" },
                cameraCount: { type: "number", description: "Total number of cameras needed" },
                cameraBreakdown: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: { type: "string" },
                      quantity: { type: "number" },
                      unitPrice: { type: "number" },
                      reason: { type: "string" },
                    },
                    required: ["type", "quantity", "unitPrice", "reason"],
                  },
                },
                additionalEquipment: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      item: { type: "string" },
                      quantity: { type: "number" },
                      unitPrice: { type: "number" },
                    },
                    required: ["item", "quantity", "unitPrice"],
                  },
                },
                installationCost: { type: "number", description: "Total installation labour cost in INR" },
                cablingCost: { type: "number", description: "Total cabling cost in INR" },
                totalCost: { type: "number", description: "Grand total in INR" },
                recommendations: { type: "string", description: "Expert advice and placement suggestions" },
              },
              required: ["totalArea", "cameraCount", "cameraBreakdown", "additionalEquipment", "installationCost", "cablingCost", "totalCost", "recommendations"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "provide_estimate" } },
      }),
    });

    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
        status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in workspace settings." }), {
        status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No estimate returned by AI");
    const estimate = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify({ estimate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("estimate-cameras error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
