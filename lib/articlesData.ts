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
      id: "qiita_001",
      title: "Goodbye to ChatGPT's 'Amnesia'. Implementing 'Super Long-Term Memory' (Memory as a Service) API with Django x Railway",
      summary: "The biggest reason why we don't feel attached to AI is amnesia. How to implement a 'brain' that permanently remembers conversations with users using Django and pgvector.",
      platform: "Qiita",
      url: "https://qiita.com/rustprogram2022/items/52d645ef0785a51749f1",
      date: "2026.01.01",
      tags: ["Python", "Django", "AI", "RAG"]
    },
    {
      id: "qiita_002",
      title: "Is 'Look at the Tech' just sour grapes? Reading the 'Real Price' of Blockchain that isn't on the charts on the night of the crash",
      summary: "Irreversible infrastructure progress proceeding behind the price collapse. A comprehensive research report on the structural disconnect between market price and intrinsic value.",
      platform: "Qiita",
      url: "https://qiita.com/rustprogram2022/items/b3bfbe8522df351f1ce1",
      date: "2026.01.02",
      tags: ["Blockchain", "Web3", "Economy"]
    },
    {
      id: "zenn_001",
      title: "Consulting worries with AI? How to interact with a 'non-denying good understander' where you can spill your true feelings",
      summary: "Why does AI become a 'shelter for the heart'? A proposal for a healthy new relationship with AI that replies immediately even at 3 AM and takes secrets to the grave.",
      platform: "Zenn",
      url: "https://zenn.dev/rust_start/articles/74d89153bf6c4c",
      date: "2026.01.03",
      tags: ["AI", "Mental Health", "Life"]
    },
    {
      id: "zenn_002",
      title: "All Solana Token Design Technologies 2026: Token-2022 Utilization and Security Strategy",
      summary: "A comprehensive technical explanation of on-chain business logic using Token-2022 (Token Extensions) and countermeasures against Solana-specific security threats.",
      platform: "Zenn",
      url: "https://zenn.dev/rust_start/articles/cbde2deec0e520",
      date: "2026.01.04",
      tags: ["Solana", "Rust", "Security", "Blockchain"]
    }
  ] as Article[]
};