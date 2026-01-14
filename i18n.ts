import { LanguageCode } from './types';
export type { LanguageCode };

interface TranslationData {
  meta_title: string;
  meta_description: string;
  hero_name: string;
  hero_name_sub: string;
  hero_role_titles: string;
  hero_catchphrase: string;
  hero_subcatchphrase: string;
  section_about: string;
  section_ventures: string;
  bio_text: string;
  categories: {
    All: string;
    Business: string;
    Tech: string;
    Visual: string;
    Personal: string;
    Corporate: string;
    Platform: string;
    Media: string;
  };
  companies: {
    [key: string]: {
      description: string;
      operated_by: string;
    }
  };
  footer_designed_by: string;
  official_portfolio: string;
}

export const translations: Record<LanguageCode, TranslationData> = {
  ja: {
    meta_title: "高橋 高 (Ko Takahashi) | Beyond the Script",
    meta_description: "誰かの書いた脚本を超えて。11歳で学校を辞め、23歳ですべてを失い、7年間の沈黙を経て蘇った男の物語。リアルな日本を、一緒に歩こう。",
    hero_name: "高橋 高",
    hero_name_sub: "Ko Takahashi",
    hero_role_titles: "旅人 / 探求者 / 語り部",
    hero_catchphrase: "誰かの書いた脚本を、生きていませんか？",
    hero_subcatchphrase: "11歳で社会のレールから降りた。そこから私の『台本のない旅』が始まった。",
    section_about: "About",
    section_ventures: "私が届けたいもの",
    bio_text: "23歳ですべてを失った。破産、裏切り、孤独。7年間誰とも会わず、ただ学び続けた。言葉を、コードを、歴史を。それは世界ともう一度繋がるための準備だった。今、私は『Matsuri』を通じて、ガイドブックには載らない本当の日本を届けている。観光客としてではなく、探求者として。一緒に歩こう。",
    official_portfolio: "Official Portfolio",
    categories: {
      All: "All",
      Business: "Business",
      Tech: "Tech",
      Visual: "Visual",
      Personal: "Personal",
      Corporate: "Corporate",
      Platform: "Platform",
      Media: "Media"
    },
    companies: {
      "jon_coo": {
        description: "Corporate Entity. Creating Culture OS.",
        operated_by: "FOUNDER & CEO"
      },
      "matsuri": {
        description: "Next-gen Digital Experience Platform.",
        operated_by: "LEAD ARCHITECT"
      },
      "j_times": {
        description: "Global Media Outlet.",
        operated_by: "EDITOR IN CHIEF"
      }
    },
    footer_designed_by: "Designed for Impact."
  },
  en: {
    meta_title: "Ko Takahashi | Beyond the Script",
    meta_description: "Going beyond the script someone else wrote for you. The story of a man who left school at 11, lost everything at 23, and was reborn after 7 years of silence. Walk with me through the real Japan.",
    hero_name: "Ko Takahashi",
    hero_name_sub: "高橋 高",
    hero_role_titles: "Traveler / Seeker / Storyteller",
    hero_catchphrase: "Are you living someone else's script?",
    hero_subcatchphrase: "I stepped off society's rails at age 11. That's when my unscripted journey began.",
    section_about: "About",
    section_ventures: "Core Ventures",
    bio_text: "Bridging the realms of engineering and management. Through the development of Culture OS and Matsuri Platform, implementing 'Japanese Ma and texture' into the digital void. Creating next-generation experiences with serene aesthetics and logical rigor.",
    official_portfolio: "Official Portfolio",
    categories: {
      All: "All",
      Business: "Business",
      Tech: "Tech",
      Visual: "Visual",
      Personal: "Personal",
      Corporate: "Corporate",
      Platform: "Platform",
      Media: "Media"
    },
    companies: {
      "jon_coo": {
        description: "Corporate Entity. Creating Culture OS.",
        operated_by: "FOUNDER & CEO"
      },
      "matsuri": {
        description: "Next-gen Digital Experience Platform.",
        operated_by: "LEAD ARCHITECT"
      },
      "j_times": {
        description: "Global Media Outlet.",
        operated_by: "EDITOR IN CHIEF"
      }
    },
    footer_designed_by: "Designed for Impact."
  },
  zh: {
    meta_title: "高桥 高 (Ko Takahashi) | Official Portfolio",
    meta_description: "高桥高的官方作品集。Culture OS 和 Matsuri Platform 的开发者。追求技术与日本文化融合的工程领导者。",
    hero_name: "高桥 高",
    hero_name_sub: "Ko Takahashi",
    hero_role_titles: "Engineer / Entrepreneur / Philosopher",
    hero_catchphrase: "重新编程文化。",
    hero_subcatchphrase: "从新宿街头到全球建筑师。",
    section_about: "关于",
    section_ventures: "核心业务",
    bio_text: "跨越工程与管理的领域。通过开发 Culture OS 和 Matsuri Platform，将“日本的间与质感”植入数字空间。以宁静的美学和严谨的逻辑创造下一代体验。",
    official_portfolio: "官方作品集",
    categories: {
      All: "全部",
      Business: "商业",
      Tech: "技术",
      Visual: "视觉",
      Personal: "个人",
      Corporate: "企业",
      Platform: "平台",
      Media: "媒体"
    },
    companies: {
      "jon_coo": {
        description: "企业实体。创造 Culture OS。",
        operated_by: "FOUNDER & CEO"
      },
      "matsuri": {
        description: "下一代数字体验平台。",
        operated_by: "LEAD ARCHITECT"
      },
      "j_times": {
        description: "全球媒体渠道。",
        operated_by: "EDITOR IN CHIEF"
      }
    },
    footer_designed_by: "为影响力而设计。"
  },
  ko: {
    meta_title: "타카하시 코 (Ko Takahashi) | Official Portfolio",
    meta_description: "타카하시 코의 공식 포트폴리오. Culture OS, Matsuri Platform 개발자. 기술과 일본 문화의 융합을 추구하는 엔지니어링 리더.",
    hero_name: "타카하시 코",
    hero_name_sub: "Ko Takahashi",
    hero_role_titles: "Engineer / Entrepreneur / Philosopher",
    hero_catchphrase: "문화를 재프로그래밍.",
    hero_subcatchphrase: "신주쿠 거리에서 글로벌 아키텍트로.",
    section_about: "소개",
    section_ventures: "핵심 사업",
    bio_text: "엔지니어링과 경영의 영역을 횡단합니다. Culture OS와 Matsuri Platform 개발을 통해 디지털의 차가움에 '일본적인 마(間)와 질감'을 구현합니다. 정謐한 미의식과 논리적 사고로 차세대 경험을 창조합니다.",
    official_portfolio: "공식 포트폴리오",
    categories: {
      All: "전체",
      Business: "비즈니스",
      Tech: "기술",
      Visual: "비주얼",
      Personal: "개인",
      Corporate: "기업",
      Platform: "플랫폼",
      Media: "미디어"
    },
    companies: {
      "jon_coo": {
        description: "기업 엔티티. Culture OS 창조.",
        operated_by: "FOUNDER & CEO"
      },
      "matsuri": {
        description: "차세대 디지털 경험 플랫폼.",
        operated_by: "LEAD ARCHITECT"
      },
      "j_times": {
        description: "글로벌 미디어 아울렛.",
        operated_by: "EDITOR IN CHIEF"
      }
    },
    footer_designed_by: "임팩트를 위한 디자인."
  },
  th: {
    meta_title: "Ko Takahashi | Official Portfolio",
    meta_description: "พอร์ตโฟลิโออย่างเป็นทางการของ Ko Takahashi ผู้พัฒนา Culture OS และ Matsuri Platform ผู้นำด้านวิศวกรรมที่มุ่งมั่นผสมผสานเทคโนโลยีและวัฒนธรรมญี่ปุ่น",
    hero_name: "Ko Takahashi",
    hero_name_sub: "高橋 高",
    hero_role_titles: "Engineer / Entrepreneur / Philosopher",
    hero_catchphrase: "เขียนโปรแกรมวัฒนธรรมใหม่",
    hero_subcatchphrase: "จากถนนชินจูกุสู่สถาปนิกระดับโลก",
    section_about: "เกี่ยวกับ",
    section_ventures: "ธุรกิจหลัก",
    bio_text: "เชื่อมโยงขอบเขตของวิศวกรรมและการจัดการ ผ่านการพัฒนา Culture OS และ Matsuri Platform โดยนำ 'ความว่างและพื้นผิวแบบญี่ปุ่น' มาสู่ความว่างเปล่าทางดิจิทัล สร้างสรรค์ประสบการณ์ยุคหน้าด้วยสุนทรียศาสตร์ที่เงียบสงบและตรรกะที่เข้มงวด",
    official_portfolio: "พอร์ตโฟลิโออย่างเป็นทางการ",
    categories: {
      All: "ทั้งหมด",
      Business: "ธุรกิจ",
      Tech: "เทคโนโลยี",
      Visual: "ภาพ",
      Personal: "ส่วนตัว",
      Corporate: "องค์กร",
      Platform: "แพลตฟอร์ม",
      Media: "สื่อ"
    },
    companies: {
      "jon_coo": {
        description: "นิติบุคคลองค์กร สร้างสรรค์ Culture OS",
        operated_by: "FOUNDER & CEO"
      },
      "matsuri": {
        description: "แพลตฟอร์มประสบการณ์ดิจิทัลยุคหน้า",
        operated_by: "LEAD ARCHITECT"
      },
      "j_times": {
        description: "สื่อระดับโลก",
        operated_by: "EDITOR IN CHIEF"
      }
    },
    footer_designed_by: "ออกแบบเพื่อสร้างผลกระทบ"
  }
};

export const getTranslation = (lang: LanguageCode) => {
  return translations[lang] || translations['en'];
};