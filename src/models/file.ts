import { sql } from "@vercel/postgres";

export interface FileType {
  id?: string;
  hash: string;
  upload_date: Date;
  status: string;
  transcription: string;
  summary: string;
  dubbed: string;
}

class FileManager {
  async insert(file: FileType): Promise<FileType | null> {
    try {
      const { rows }: any = await sql`
        INSERT INTO files (hash, upload_date, status, transcription, summary, dubbed)
        VALUES (${file.hash}, ${file.upload_date.toISOString()}, ${file.status}, ${file.transcription}, ${file.summary}, ${file.dubbed})
      `;

      if (rows.length > 0)
        return rows[0] as FileType;

      return null;
    } catch (error) {
      console.error("Failed to insert file:", error);
      return null;
    }
  }
}

export default new FileManager();
