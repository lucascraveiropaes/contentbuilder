import FileManager, { FileType } from "models/file";
import { createTranscription } from "utils/openai";
import FileEventManager from "models/file_event";
import { decodeFiles } from "utils/compress";
import { fileToHash } from "utils/server";
import EventManager from "models/event";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  const formData: FormData = await request.formData()
  const zip: any = formData.get("zip");
  const files = await decodeFiles(zip);

  try {
    const results = await Promise.all(
      files.map(async (file: any) => {
        const hash = await fileToHash(file) as string;

        const { rows } = await sql`SELECT * FROM files WHERE hash=${hash}`;

        console.log(rows.length)

        if (rows.length !== 0) {
          return rows[0] as FileType;
        } else {
          const { text: transcription } = await createTranscription({ file, model: "whisper-1" });

          return await FileManager.insert({
            hash: hash,
            upload_date: new Date(),
            status: "Completed",
            transcription: transcription,
            summary: "",
            dubbed: "",
          }) as FileType;
        }
      })
    );

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
