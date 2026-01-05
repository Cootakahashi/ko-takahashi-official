import React, { useEffect } from 'react';
import { siteMetadata, socialLinks, companyLinks } from '../config';
import { LanguageCode, getTranslation } from '../i18n';

interface SeoProps {
  currentLang?: LanguageCode;
  pageOverride?: {
    title?: string;
    description?: string;
  };
}

const Seo: React.FC<SeoProps> = ({ currentLang = 'ja', pageOverride }) => {
  const t = getTranslation(currentLang);

  useEffect(() => {
    // 1. Determine Title & Desc
    const title = pageOverride?.title || t.meta_title;
    const description = pageOverride?.description || t.meta_description;

    // 2. Update Document
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    // 3. Inject JSON-LD (Person Entity)
    // Only inject Main Entity on home page or if specifically needed. 
    // For now, we keep the Person entity everywhere as it's a portfolio site.
    const sameAsUrls = socialLinks.map(link => link.url);
    
    const worksForOrganizations = companyLinks.map(link => ({
      "@type": "Organization",
      "name": link.platform,
      "url": link.url
    }));

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": t.hero_name, 
      "alternateName": "Ko Takahashi",
      "url": "https://jon-and-coo.com", 
      "image": "https://picsum.photos/400/400",
      "jobTitle": [
        "CEO",
        "Founder",
        "Software Engineer"
      ],
      "worksFor": worksForOrganizations,
      "knowsAbout": ["Culture OS", "Matsuri Platform", "The J-Times", "Engineering", "Management"],
      "description": description,
      "sameAs": [
        ...sameAsUrls,
        ...companyLinks.map(link => link.url)
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentLang, t, pageOverride]);

  return null;
};

export default Seo;