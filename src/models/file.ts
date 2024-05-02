import { sql } from "@vercel/postgres";

export interface FileType {
  id?: string;
  hash: string;
  name: string;
  upload_date: Date;
  status: string;
  transcription: string;
  summary: string;
  dubbed: string;
}

class FileManager {
  async insert(file: FileType): Promise<FileType | null> {
    const { rows }: any = await sql`
      INSERT INTO files (hash, name, upload_date, status, transcription, summary, dubbed)
      VALUES (${file.hash}, ${file.name}, ${file.upload_date.toISOString()}, ${file.status}, ${file.transcription}, ${file.summary}, ${file.dubbed})
      RETURNING *;
    `;

    return rows[0] as FileType;
  }

  async update(file: FileType): Promise<FileType> {
    const { rows }: any = await sql`
      UPDATE files
      SET
        hash = ${file.hash},
        name = ${file.name},
        upload_date = ${file.upload_date.toISOString()},
        status = ${file.status},
        transcription = ${file.transcription},
        summary = ${file.summary},
        dubbed = ${file.dubbed}
      WHERE id = ${file.id}
      RETURNING *;
    `;

    return rows[0] as FileType;
  }
}

export default new FileManager();
