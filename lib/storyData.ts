export interface StorySection {
  id: string;
  title: string;
  jpTitle: string;
  content: string;
}

export const storyData = {
  meta: {
    title: "Our Story & Philosophy | 高橋 高",
    description: "Culture OSの起源、テクノロジーと日本文化を融合させる高橋高の哲学とビジョン。"
  },
  sections: [
    {
      id: "origin",
      title: "The Origin",
      jpTitle: "起源",
      content: "Everything began with a single question: How can we digitize the intangible atmosphere of Japanese culture? Born in a traditional landscape, the silence of the Torii gates and the complexity of modern code became my dual languages. I saw technology not just as a tool, but as a modern scroll—a canvas to paint the future while honoring the ink of the past."
    },
    {
      id: "philosophy",
      title: "Zen & Tech",
      jpTitle: "禅と技術",
      content: "Engineering is a martial art. It requires the discipline of a craftsman (Shokunin) and the emptiness of Zen (Mu). At Jon & Coo Inc., we believe that true innovation stems from silence. We strip away the noise to reveal the essence. Our code is clean, our designs are quiet, and our impact is heavy. This is the 'Zen-Tech' philosophy: maximum functionality with minimal disturbance."
    },
    {
      id: "vision",
      title: "Culture OS",
      jpTitle: "文化OS",
      content: "We are building the 'Culture OS'—an operating system for society that harmonizes human intent with algorithmic efficiency. It is a platform where Matsuri (Festivals) meet the Metaverse, where community bonds are strengthened by blockchain, and where the Japanese spirit (Wa) scales globally without losing its soul."
    }
  ]
};