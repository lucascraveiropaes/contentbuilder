import { sql } from "@vercel/postgres";
import { FileType } from "models/file";

export interface EventType {
  id?: string;
  time: Date;
  type: string;
  files?: FileType[];
}

class EventManager {
  async insert(event: EventType): Promise<EventType> {
    const { rows }: any = await sql`
      INSERT INTO events (time, type)
      VALUES (${event.time.toISOString()}, ${event.type})
      RETURNING *;
    `;

    return rows[0] as EventType;
  }

  async get(eventId: string) {
    const { rows }: any = await sql`
      SELECT id, time, type
      FROM events
      WHERE id = ${eventId};
    `;

    const event = rows[0] as EventType;
    event.files = await this.getFilesByEventId(eventId);

    return event;
  }

  async getFilesByEventId(eventId: string) {
    const { rows }: any = await sql`
      SELECT f.id, f.name, f.hash, f.upload_date, f.status, f.transcription, f.summary, f.dubbed
      FROM files f
      JOIN file_events fe ON fe.file_id = f.id
      WHERE fe.event_id = ${eventId};
    `;
    return rows.map((row: any) => row as FileType);
  }
}

export default new EventManager();
