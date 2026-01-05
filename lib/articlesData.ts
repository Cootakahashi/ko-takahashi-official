export interface Article {
  id: string;
  title: string;
  summary: string;
  platform: 'Note' | 'Zenn' | 'Qiita' | 'Internal';
  url: string;
  date: string;
  tags: string[];
}

export const articlesData = {
  meta: {
    title: "Articles & Insights | 高橋 高",
    description: "テクノロジー、デザイン、日本文化に関する高橋高の考察と記事アーカイブ。"
  },
  articles: [
    {
      id: "art_001",
      title: "Culture OS: The Intersection of Tradition and Code",
      summary: "Exploring how Japanese 'Ma' (negative space) can inform software architecture. A philosophical deep dive into building systems that breathe.",
      platform: "Note",
      url: "https://note.com/ko_takahashi",
      date: "2024.03.15",
      tags: ["Philosophy", "Design"]
    },
    {
      id: "art_002",
      title: "Rust for Pythonistas: Building the Matsuri Engine",
      summary: "Why we chose Rust for the core of the Matsuri Platform. Performance benchmarks and the developer experience of shifting paradigms.",
      platform: "Zenn",
      url: "https://zenn.dev/rust_start",
      date: "2024.02.10",
      tags: ["Tech", "Rust", "Engineering"]
    },
    {
      id: "art_003",
      title: "Silent UI: Reducing Cognitive Load in Enterprise Apps",
      summary: "Techniques for creating 'Zen' digital environments. How visual silence leads to higher user productivity.",
      platform: "Internal",
      url: "#",
      date: "2024.01.28",
      tags: ["UI/UX", "Productivity"]
    },
    {
      id: "art_004",
      title: "Next.js 14 & R3F: Optimization for Luxury Webs",
      summary: "A technical case study on building the Jon & Coo portfolio. Managing WebGL contexts and LCP scores.",
      platform: "Qiita",
      url: "https://qiita.com/rustprogram2022",
      date: "2023.12.05",
      tags: ["Next.js", "Three.js", "Performance"]
    },
    {
      id: "art_005",
      title: "The J-Times: Decentralizing Media Narratives",
      summary: "The architectural decisions behind our global media outlet. Immutable logs and community governance.",
      platform: "Note",
      url: "https://note.com/ko_takahashi",
      date: "2023.11.20",
      tags: ["Web3", "Media"]
    }
  ] as Article[]
};