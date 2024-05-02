import FileManager, { FileType } from "models/file";
import { createTranscription, createSummary } from "utils/openai";
import { sql } from "@vercel/postgres";

export async function fileToHash(file: Blob): Promise<string | null> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-512", arrayBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
  } catch (error) {
    console.error("Error hashing the file:", error);
    return null;
  }
}

export async function getFilesWithTranscription(files: File[]) {
  return await Promise.all(
    files.map(async (file: any) => {
      const hash = await fileToHash(file) as string;

      const { rows } = await sql`SELECT * FROM files WHERE hash=${hash}`;

      if (rows.length !== 0) {
        return rows[0] as FileType;
      } else {
        const fileBeforeInsert = {
          hash: hash,
          name: file.name,
          upload_date: new Date(),
          status: "Completed",
          transcription: "",
          summary: "",
          dubbed: "",
        };

        try {
          const { text: transcription } = await createTranscription({ file, model: "whisper-1" });
          fileBeforeInsert.transcription = transcription;
        } catch (error) {
          fileBeforeInsert.status = "Failed";
        }

        return await FileManager.insert(fileBeforeInsert) as FileType;
      }
    })
  );
}

export async function getSummaryFromFiles(files: FileType[]) {
  return Promise.all(files.map(async (file) => {
    if (!file.summary) {
      file.summary = await createSummary(file.transcription);

      await FileManager.update(file);
    }

    return file;
  }));
}
