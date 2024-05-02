import { sql } from "@vercel/postgres";
import { EventType } from "models/event";
import { FileType } from "models/file";

export interface FileEventType {
  id?: string;
  file_id: string;
  event_id: string;
}

class FileEventManager {
  async insert(event: EventType, files: FileType[]): Promise<boolean> {
    const query = `
      INSERT INTO file_events (file_id, event_id) VALUES ${files.map(file => {
        return `('${file.id}', '${event.id}')`;
      }).join(', ')}
      RETURNING *;
    `;

    await sql.query(query);

    return true;
  }
}

export default new FileEventManager();
