export interface ScheduleEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  link?: string;
  status: 'upcoming' | 'past';
  tags: string[];
}

export const scheduleData = {
  meta: {
    title: "Schedule & Events | 高橋 高",
    description: "高橋高およびJon & Coo Inc.の登壇予定、イベント、プロジェクトのマイルストーン。"
  },
  events: [
    {
      id: "ev_001",
      date: "2025-04-15",
      title: "Culture OS Beta Launch",
      description: "The official public beta release of the Culture OS framework. A pivotal moment for digital-physical community integration.",
      location: "Tokyo / Online",
      status: "upcoming",
      tags: ["Launch", "Product"],
      link: "https://jon-and-coo.com"
    },
    {
      id: "ev_002",
      date: "2025-05-20",
      title: "Zen & Tech Summit 2025",
      description: "Keynote speech: 'Engineering Silence'. Discussing how to reduce digital noise in modern UI/UX.",
      location: "Kyoto, Japan",
      status: "upcoming",
      tags: ["Speaking", "Keynote"]
    },
    {
      id: "ev_003",
      date: "2025-06-10",
      title: "Matsuri Platform Developer Meetup",
      description: "Technical deep dive into the rust-based architecture behind Matsuri Platform.",
      location: "Shibuya, Tokyo",
      status: "upcoming",
      tags: ["Community", "Dev"]
    },
    {
      id: "ev_004",
      date: "2024-12-01",
      title: "Jon & Coo Inc. Founding",
      description: "The beginning of the journey. Incorporated in Tokyo.",
      location: "Tokyo",
      status: "past",
      tags: ["Milestone"]
    },
    {
      id: "ev_005",
      date: "2024-11-15",
      title: "J-Times Architecture Reveal",
      description: "Published the technical whitepaper for the decentralized media architecture.",
      location: "Online",
      status: "past",
      tags: ["Publication"]
    }
  ] as ScheduleEvent[]
};