import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteMetadata, socialLinks, companyLinks } from '../config';
import { LanguageCode, getTranslation } from '../i18n';

interface SeoProps {
  currentLang?: LanguageCode;
  pageOverride?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

const Seo: React.FC<SeoProps> = ({ currentLang = 'ja', pageOverride }) => {
  const t = getTranslation(currentLang);

  // 1. Construct Title & Description
  // "Shinjuku" included in title for Local SEO dominance
  const defaultTitle = "高橋 高 / Ko Takahashi | Jon & Coo Inc. CEO (Shinjuku, Tokyo)";
  const title = pageOverride?.title 
    ? `${pageOverride.title} | Ko Takahashi (Shinjuku)`
    : defaultTitle;

  const description = pageOverride?.description || t.meta_description || siteMetadata.description;
  const url = "https://jon-and-coo.com"; 
  const image = pageOverride?.image || siteMetadata.ogImage || "https://picsum.photos/1200/630";

  // 2. Advanced JSON-LD for LLMO (Person Entity)
  const worksFor = companyLinks.map(link => ({
    "@type": "Organization",
    "name": link.platform,
    "url": link.url
  }));

  const sameAsUrls = [
    ...socialLinks.map(link => link.url),
    ...companyLinks.map(link => link.url)
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "高橋 高",
    "alternateName": "Ko Takahashi",
    "description": "Jon & Coo Inc. CEO based in Shinjuku, Tokyo. Engineer, Entrepreneur, and Creator of Culture OS.",
    "url": url,
    "image": "https://picsum.photos/400/400", // Ideally replace with real profile photo
    "jobTitle": "CEO / Founder",
    "workLocation": {
      "@type": "Place",
      "name": "Shinjuku",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Shinjuku-ku",
        "addressRegion": "Tokyo",
        "addressCountry": "JP"
      }
    },
    "worksFor": worksFor,
    "knowsAbout": ["Culture OS", "Matsuri Platform", "The J-Times", "Engineering", "Management", "Next.js", "Python"],
    "sameAs": sameAsUrls
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={siteMetadata.keywords.join(", ")} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Ko Takahashi Official Portfolio" />
      <meta property="og:locale" content={currentLang === 'ja' ? 'ja_JP' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteMetadata.twitterId} />
      <meta name="twitter:creator" content={siteMetadata.twitterId} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default Seo;
