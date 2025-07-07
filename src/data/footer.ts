export interface FooterLink {
  id: string;
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  isExternal?: boolean;
  target?: '_blank' | '_self';
  ariaLabel?: string;
}

export interface FooterSection {
  id: string;
  label: string;
  order: number;
  isVisible: boolean;
  links: FooterLink[];
}

export interface FooterBrand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logoText: {
    main: string;
    accent: string;
  };
  language: {
    current: string;
    available: string[];
  };
}

export interface FooterBottom {
  id: string;
  copyright: {
    text: string;
    year: number;
    company: string;
  };
  socialLinks: FooterLink[];
  languageSelector: {
    enabled: boolean;
    current: string;
    options: Array<{
      code: string;
      name: string;
      flag?: string;
    }>;
  };
}

export interface FooterData {
  brand: FooterBrand;
  sections: FooterSection[];
  bottom: FooterBottom;
  settings: {
    animationDelay: number;
    animationDuration: number;
    theme: 'light' | 'dark';
  };
}

// Footer data structure
export const footerData: FooterData = {
  brand: {
    id: "brand-001",
    name: "Udemy Clone",
    tagline: "Learn without limits",
    description: "Learn skills you need to advance your career. Join millions of learners from around the world already learning on Udemy.",
    logoText: {
      main: "udemy",
      accent: "clone"
    },
    language: {
      current: "English",
      available: ["English", "Spanish", "French", "German", "Japanese"]
    }
  },

  sections: [
    {
      id: "section-business-001",
      label: "Udemy Business",
      order: 1,
      isVisible: true,
      links: [
        {
          id: "link-teach-001",
          title: "Teach on Udemy",
          href: "/teach",
          isExternal: false,
          ariaLabel: "Learn about teaching on Udemy platform"
        },
        {
          id: "link-app-001",
          title: "Get the app",
          href: "/mobile",
          isExternal: false,
          ariaLabel: "Download Udemy mobile application"
        },
        {
          id: "link-about-001",
          title: "About us",
          href: "/about",
          isExternal: false,
          ariaLabel: "Learn more about Udemy company"
        },
        {
          id: "link-contact-001",
          title: "Contact us",
          href: "/contact",
          isExternal: false,
          ariaLabel: "Get in touch with Udemy support"
        }
      ]
    },
    {
      id: "section-community-001",
      label: "Community",
      order: 2,
      isVisible: true,
      links: [
        {
          id: "link-careers-001",
          title: "Careers",
          href: "/careers",
          isExternal: false,
          ariaLabel: "Explore career opportunities at Udemy"
        },
        {
          id: "link-blog-001",
          title: "Blog",
          href: "/blog",
          isExternal: false,
          ariaLabel: "Read Udemy blog posts and articles"
        },
        {
          id: "link-help-001",
          title: "Help and Support",
          href: "/help",
          isExternal: false,
          ariaLabel: "Get help and support for Udemy"
        },
        {
          id: "link-affiliate-001",
          title: "Affiliate",
          href: "/affiliate",
          isExternal: false,
          ariaLabel: "Join Udemy affiliate program"
        },
        {
          id: "link-investors-001",
          title: "Investors",
          href: "/investors",
          isExternal: false,
          ariaLabel: "Investor relations and information"
        }
      ]
    },
    {
      id: "section-legal-001",
      label: "Legal",
      order: 3,
      isVisible: true,
      links: [
        {
          id: "link-terms-001",
          title: "Terms",
          href: "/terms",
          isExternal: false,
          ariaLabel: "Read terms of service"
        },
        {
          id: "link-privacy-001",
          title: "Privacy policy",
          href: "/privacy",
          isExternal: false,
          ariaLabel: "Read privacy policy"
        },
        {
          id: "link-cookies-001",
          title: "Cookie settings",
          href: "/cookies",
          isExternal: false,
          ariaLabel: "Manage cookie preferences"
        },
        {
          id: "link-sitemap-001",
          title: "Sitemap",
          href: "/sitemap",
          isExternal: false,
          ariaLabel: "View website sitemap"
        },
        {
          id: "link-accessibility-001",
          title: "Accessibility statement",
          href: "/accessibility",
          isExternal: false,
          ariaLabel: "Read accessibility statement"
        }
      ]
    },
    {
      id: "section-social-001",
      label: "Follow us",
      order: 4,
      isVisible: true,
      links: [
        {
          id: "social-facebook-001",
          title: "Facebook",
          href: "https://facebook.com/udemy",
          isExternal: true,
          target: "_blank",
          ariaLabel: "Follow Udemy on Facebook"
        },
        {
          id: "social-instagram-001",
          title: "Instagram",
          href: "https://instagram.com/udemy",
          isExternal: true,
          target: "_blank",
          ariaLabel: "Follow Udemy on Instagram"
        },
        {
          id: "social-linkedin-001",
          title: "LinkedIn",
          href: "https://linkedin.com/company/udemy",
          isExternal: true,
          target: "_blank",
          ariaLabel: "Follow Udemy on LinkedIn"
        },
        {
          id: "social-youtube-001",
          title: "YouTube",
          href: "https://youtube.com/udemy",
          isExternal: true,
          target: "_blank",
          ariaLabel: "Subscribe to Udemy on YouTube"
        },
        {
          id: "social-twitter-001",
          title: "Twitter",
          href: "https://twitter.com/udemy",
          isExternal: true,
          target: "_blank",
          ariaLabel: "Follow Udemy on Twitter"
        }
      ]
    }
  ],

  bottom: {
    id: "footer-bottom-001",
    copyright: {
      text: "All rights reserved.",
      year: new Date().getFullYear(),
      company: "Udemy Clone"
    },
    socialLinks: [
      {
        id: "bottom-facebook-001",
        title: "Facebook",
        href: "https://facebook.com/udemy",
        isExternal: true,
        target: "_blank",
        ariaLabel: "Follow us on Facebook"
      },
      {
        id: "bottom-instagram-001",
        title: "Instagram", 
        href: "https://instagram.com/udemy",
        isExternal: true,
        target: "_blank",
        ariaLabel: "Follow us on Instagram"
      },
      {
        id: "bottom-linkedin-001",
        title: "LinkedIn",
        href: "https://linkedin.com/company/udemy",
        isExternal: true,
        target: "_blank",
        ariaLabel: "Follow us on LinkedIn"
      },
      {
        id: "bottom-youtube-001", 
        title: "YouTube",
        href: "https://youtube.com/udemy",
        isExternal: true,
        target: "_blank",
        ariaLabel: "Subscribe to our YouTube channel"
      },
      {
        id: "bottom-twitter-001",
        title: "Twitter",
        href: "https://twitter.com/udemy", 
        isExternal: true,
        target: "_blank",
        ariaLabel: "Follow us on Twitter"
      }
    ],
    languageSelector: {
      enabled: true,
      current: "en",
      options: [
        { code: "en", name: "English", flag: "🇺🇸" },
        { code: "es", name: "Español", flag: "🇪🇸" },
        { code: "fr", name: "Français", flag: "🇫🇷" },
        { code: "de", name: "Deutsch", flag: "🇩🇪" },
        { code: "ja", name: "日本語", flag: "🇯🇵" }
      ]
    }
  },

  settings: {
    animationDelay: 0.1,
    animationDuration: 0.8,
    theme: 'light'
  }
};

// Helper functions
export const getFooterSectionById = (id: string): FooterSection | undefined => {
  return footerData.sections.find(section => section.id === id);
};

export const getFooterLinkById = (id: string): FooterLink | undefined => {
  return footerData.sections
    .flatMap(section => section.links)
    .find(link => link.id === id);
};

export const getVisibleSections = (): FooterSection[] => {
  return footerData.sections
    .filter(section => section.isVisible)
    .sort((a, b) => a.order - b.order);
};

export const getSocialLinks = (): FooterLink[] => {
  const socialSection = footerData.sections.find(section => section.id === 'section-social-001');
  return socialSection?.links || [];
};

export const getBottomSocialLinks = (): FooterLink[] => {
  return footerData.bottom.socialLinks;
};

export const getBrandInfo = () => {
  return footerData.brand;
};

export const getCopyrightText = (): string => {
  const { copyright } = footerData.bottom;
  return `© ${copyright.year} ${copyright.company}. ${copyright.text}`;
};

export const getLanguageOptions = () => {
  return footerData.bottom.languageSelector.options;
};

export const getCurrentLanguage = (): string => {
  return footerData.bottom.languageSelector.current;
};

export const getTotalFooterLinks = (): number => {
  return footerData.sections.reduce((total, section) => total + section.links.length, 0);
};