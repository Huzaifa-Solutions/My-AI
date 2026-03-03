export interface AgendaItem {
  id: string;
  topic: string;
  duration: number; // in minutes
  description: string;
  stakeholders: string[];
  startTime?: string;
}

export interface MeetingAgenda {
  title: string;
  date: string;
  stakeholders: string[];
  items: AgendaItem[];
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
}
