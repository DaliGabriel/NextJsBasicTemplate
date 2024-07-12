import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: "Please log in" }, { status: 401 });
  }

  const data = await request.formData();
  const imageType = data.get("image").type || "";
  const imageSize = data.get("image").size || "";

  if (imageSize > 4000000) {
    return NextResponse.json(
      { message: "The image cannot exceed 4MB." },
      { status: 400 }
    );
  }

  const ImageRequestFile = data.get("image");

  let imageExtension = imageType.split("/");
  imageExtension = imageExtension[1];

  if (
    imageExtension != "webp" &&
    imageExtension != "jpeg" &&
    imageExtension != "png" &&
    imageExtension != "jpg"
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid image extension. Please upload an image with .webp, .jpeg, .png, or .jpg extension.",
      },
      { status: 500 }
    );
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

  async function blobToGenerativePart(blob, mimeType) {
    const arrayBuffer = await blob.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(arrayBuffer).toString("base64"),
        mimeType,
      },
    };
  }

  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: generation_config,
    safetySettings: safety_settings,
  });

    const prompt =
    "You are a copywriter expert on jewelry. Give me a concise and short description of this image of, using different words, only describe the jewelry, its colors and shapes and don’t write much about how to use it. Change the golden word for 18-karat gold and the silver word for platinum.";
  const imageParts = [await blobToGenerativePart(ImageRequestFile, imageType)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  let responsejson = {};

  // console.log(text);

  if (response?.candidates[0]?.finishReason === "OTHER") {

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    return NextResponse.json(
      { message: "An external error has occurred." },
      { status: 400 }
    );
    
  }


  // Wait for 1 second before processing the request
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return NextResponse.json({ message: text }, { status: 200 });
}
