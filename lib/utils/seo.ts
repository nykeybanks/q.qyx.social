// SEO utility functions for Q Social

interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: string
  twitterCard?: "summary" | "summary_large_image"
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  ogType = "website",
  twitterCard = "summary_large_image",
}: SEOMetadata) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qsocial.app"
  const fullTitle = `${title} | Q Social`

  return {
    title: fullTitle,
    description,
    keywords: ["Q Social", "Web3", "Social Media", "Blockchain", ...keywords].join(", "),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: baseUrl,
      images: ogImage ? [{ url: ogImage }] : [],
      siteName: "Q Social",
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function generateStructuredData(type: "Organization" | "WebSite" | "SocialMediaPosting", data: any) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
  }

  switch (type) {
    case "Organization":
      return {
        ...baseData,
        name: "Q Social",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://qsocial.app",
        logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        description: "Web3-powered social media ecosystem with Bitcoin Points rewards",
        ...data,
      }
    case "WebSite":
      return {
        ...baseData,
        name: "Q Social",
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://qsocial.app",
        potentialAction: {
          "@type": "SearchAction",
          target: `${process.env.NEXT_PUBLIC_SITE_URL}/explore?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
        ...data,
      }
    case "SocialMediaPosting":
      return {
        ...baseData,
        ...data,
      }
    default:
      return baseData
  }
}
