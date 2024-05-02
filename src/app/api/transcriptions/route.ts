import { createTranscription } from "utils/openai";

export async function POST(request: Request) {
  const formData: FormData = await request.formData()
  const files = formData.getAll("files[]") as File[];

  try {
    const results = await Promise.all(
      files.map((file: any) =>
        createTranscription({ file, model: "whisper-1" })
      )
    );

    return Response.json({ status: "success", data: results })
  } catch (error: any) {
    return Response.json({ status: "error", error: error.message });
  }
}
