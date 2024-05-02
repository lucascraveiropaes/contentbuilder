import { sql } from "@vercel/postgres";

export interface EventType {
  id?: string;
  time: Date;
  type: string;
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
}

export default new EventManager();
