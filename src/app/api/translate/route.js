import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Wait for 1 second before processing the request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const body = await request.text();

  // Convertir la cadena de texto a un objeto
  const parsedBody = JSON.parse(body);

  // Acceder al valor de userEmail
  const message = parsedBody.message;

  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: "Please log in" }, { status: 401 });
  }

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI);

  //Set up the model
  let generation_config = {
    temperature: 1,
    top_p: 0.95,
    top_k: 0,
    max_output_tokens: 8192,
  };

  let safety_settings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
  ];

  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig: generation_config,
    safetySettings: safety_settings,
  });

  const prompt = "You could translate this to spanish?" + message;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  if (response?.candidates[0]?.finishReason === "OTHER") {
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (response?.candidates[0]?.finishReason === "OTHER") {
      return NextResponse.json(
        { message: "An external error has occurred." },
        { status: 400 }
      );
    }
  }

  return NextResponse.json({ message: text }, { status: 200 });
}
