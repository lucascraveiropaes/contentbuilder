import FileEventManager from "models/file_event";
import { decodeFiles } from "utils/compress";
import { getFilesWithTranscription } from "utils/server";
import EventManager from "models/event";

export async function POST(request: Request) {
  const formData: FormData = await request.formData()
  const zip: any = formData.get("zip");
  const files = await decodeFiles(zip);

  try {
    const results = await getFilesWithTranscription(files);

    const event = await EventManager.insert({
      time: new Date(),
      type: "transcription",
    });

    await FileEventManager.insert(event, results);

    return Response.json({ status: "success", data: event });
  } catch (error: any) {
    return Response.json({ status: "error", error: error.message });
  }
}
