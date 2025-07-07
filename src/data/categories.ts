export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  courseCount?: number;
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  courseCount?: number;
  isPopular?: boolean;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "dev-001",
    name: "Development",
    slug: "development",
    description: "Learn programming and software development",
    icon: "💻",
    color: "blue",
    courseCount: 15420,
    isPopular: true,
    subcategories: [
      {
        id: "dev-web-001",
        name: "Web Development",
        slug: "web-development",
        description: "Build modern websites and web applications",
        courseCount: 5420,
        isPopular: true
      },
      {
        id: "dev-mobile-001",
        name: "Mobile App Development",
        slug: "mobile-app-development",
        description: "Create mobile apps for iOS and Android",
        courseCount: 2100,
        isPopular: true
      },
      {
        id: "dev-game-001",
        name: "Game Development",
        slug: "game-development",
        description: "Build games and interactive experiences",
        courseCount: 890,
        isPopular: false
      },
      {
        id: "dev-desktop-001",
        name: "Desktop Software Development",
        slug: "desktop-software-development",
        description: "Create desktop applications",
        courseCount: 450,
        isPopular: false
      },
      {
        id: "dev-data-001",
        name: "Data Science",
        slug: "data-science",
        description: "Analyze data and build ML models",
        courseCount: 3200,
        isPopular: true
      },
      {
        id: "dev-devops-001",
        name: "DevOps",
        slug: "devops",
        description: "Deployment and infrastructure management",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "dev-testing-001",
        name: "Software Testing",
        slug: "software-testing",
        description: "Quality assurance and testing methodologies",
        courseCount: 680,
        isPopular: false
      },
      {
        id: "dev-lang-001",
        name: "Programming Languages",
        slug: "programming-languages",
        description: "Learn specific programming languages",
        courseCount: 1480,
        isPopular: true
      }
    ]
  },
  {
    id: "bus-001",
    name: "Business",
    slug: "business",
    description: "Develop business and entrepreneurial skills",
    icon: "💼",
    color: "green",
    courseCount: 8920,
    isPopular: true,
    subcategories: [
      {
        id: "bus-entre-001",
        name: "Entrepreneurship",
        slug: "entrepreneurship",
        description: "Start and grow your own business",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "bus-strategy-001",
        name: "Business Strategy",
        slug: "business-strategy",
        description: "Strategic planning and business growth",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "bus-law-001",
        name: "Business Law",
        slug: "business-law",
        description: "Legal aspects of business operations",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "bus-analytics-001",
        name: "Business Analytics",
        slug: "business-analytics",
        description: "Data-driven business decision making",
        courseCount: 780,
        isPopular: true
      },
      {
        id: "bus-ops-001",
        name: "Operations",
        slug: "operations",
        description: "Business operations and process optimization",
        courseCount: 560,
        isPopular: false
      },
      {
        id: "bus-pm-001",
        name: "Project Management",
        slug: "project-management",
        description: "Manage projects effectively",
        courseCount: 1450,
        isPopular: true
      },
      {
        id: "bus-sales-001",
        name: "Sales",
        slug: "sales",
        description: "Sales techniques and customer relations",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "bus-hr-001",
        name: "Human Resources",
        slug: "human-resources",
        description: "HR management and people operations",
        courseCount: 670,
        isPopular: false
      }
    ]
  },
  {
    id: "fin-001",
    name: "Finance & Accounting",
    slug: "finance-accounting",
    description: "Master financial skills and accounting principles",
    icon: "💰",
    color: "yellow",
    courseCount: 4560,
    isPopular: true,
    subcategories: [
      {
        id: "fin-acc-001",
        name: "Accounting",
        slug: "accounting",
        description: "Financial accounting and bookkeeping",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "fin-book-001",
        name: "Bookkeeping",
        slug: "bookkeeping",
        description: "Record and manage financial transactions",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "fin-analysis-001",
        name: "Financial Analysis",
        slug: "financial-analysis",
        description: "Analyze financial data and performance",
        courseCount: 560,
        isPopular: true
      },
      {
        id: "fin-invest-001",
        name: "Investing",
        slug: "investing",
        description: "Investment strategies and portfolio management",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "fin-trading-001",
        name: "Trading",
        slug: "trading",
        description: "Stock trading and market analysis",
        courseCount: 780,
        isPopular: true
      },
      {
        id: "fin-crypto-001",
        name: "Cryptocurrency",
        slug: "cryptocurrency",
        description: "Blockchain and cryptocurrency investing",
        courseCount: 450,
        isPopular: true
      },
      {
        id: "fin-personal-001",
        name: "Personal Finance",
        slug: "personal-finance",
        description: "Personal money management and budgeting",
        courseCount: 230,
        isPopular: false
      },
      {
        id: "fin-tax-001",
        name: "Tax Preparation",
        slug: "tax-preparation",
        description: "Tax filing and preparation services",
        courseCount: 110,
        isPopular: false
      }
    ]
  },
  {
    id: "it-001",
    name: "IT & Software",
    slug: "it-software",
    description: "Information technology and software systems",
    icon: "🖥️",
    color: "purple",
    courseCount: 6780,
    isPopular: true,
    subcategories: [
      {
        id: "it-cert-001",
        name: "IT Certifications",
        slug: "it-certifications",
        description: "Professional IT certification courses",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "it-network-001",
        name: "Network & Security",
        slug: "network-security",
        description: "Network administration and cybersecurity",
        courseCount: 1890,
        isPopular: true
      },
      {
        id: "it-hardware-001",
        name: "Hardware",
        slug: "hardware",
        description: "Computer hardware and maintenance",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "it-os-001",
        name: "Operating Systems",
        slug: "operating-systems",
        description: "Linux, Windows, and macOS administration",
        courseCount: 560,
        isPopular: true
      },
      {
        id: "it-software-001",
        name: "Software Engineering",
        slug: "software-engineering",
        description: "Software development methodologies",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "it-database-001",
        name: "Database Design",
        slug: "database-design",
        description: "Database design and management",
        courseCount: 670,
        isPopular: true
      },
      {
        id: "it-cloud-001",
        name: "Cloud Computing",
        slug: "cloud-computing",
        description: "AWS, Azure, and Google Cloud platforms",
        courseCount: 1100,
        isPopular: true
      },
      {
        id: "it-cyber-001",
        name: "Cybersecurity",
        slug: "cybersecurity",
        description: "Information security and ethical hacking",
        courseCount: 1130,
        isPopular: true
      }
    ]
  },
  {
    id: "personal-001",
    name: "Personal Development",
    slug: "personal-development",
    description: "Develop yourself personally and professionally",
    icon: "🌱",
    color: "pink",
    courseCount: 3450,
    isPopular: true,
    subcategories: [
      {
        id: "personal-prod-001",
        name: "Productivity",
        slug: "productivity",
        description: "Time management and productivity techniques",
        courseCount: 560,
        isPopular: true
      },
      {
        id: "personal-lead-001",
        name: "Leadership",
        slug: "leadership",
        description: "Leadership skills and team management",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "personal-career-001",
        name: "Career Development",
        slug: "career-development",
        description: "Advance your career and professional growth",
        courseCount: 670,
        isPopular: true
      },
      {
        id: "personal-memory-001",
        name: "Memory & Study Skills",
        slug: "memory-study-skills",
        description: "Improve learning and memory techniques",
        courseCount: 230,
        isPopular: false
      },
      {
        id: "personal-motiv-001",
        name: "Motivation",
        slug: "motivation",
        description: "Self-motivation and goal achievement",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "personal-brand-001",
        name: "Personal Brand Building",
        slug: "personal-brand-building",
        description: "Build and promote your personal brand",
        courseCount: 280,
        isPopular: false
      },
      {
        id: "personal-creative-001",
        name: "Creativity",
        slug: "creativity",
        description: "Unleash your creative potential",
        courseCount: 190,
        isPopular: false
      },
      {
        id: "personal-influence-001",
        name: "Influence",
        slug: "influence",
        description: "Persuasion and influence techniques",
        courseCount: 290,
        isPopular: false
      }
    ]
  },
  {
    id: "design-001",
    name: "Design",
    slug: "design",
    description: "Creative design and visual arts",
    icon: "🎨",
    color: "red",
    courseCount: 5670,
    isPopular: true,
    subcategories: [
      {
        id: "design-web-001",
        name: "Web Design",
        slug: "web-design",
        description: "User interface and web design",
        courseCount: 1890,
        isPopular: true
      },
      {
        id: "design-graphic-001",
        name: "Graphic Design",
        slug: "graphic-design",
        description: "Visual communication and branding",
        courseCount: 1560,
        isPopular: true
      },
      {
        id: "design-ux-001",
        name: "User Experience Design",
        slug: "user-experience-design",
        description: "UX/UI design and user research",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "design-game-001",
        name: "Game Design",
        slug: "game-design",
        description: "Game mechanics and level design",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "design-3d-001",
        name: "3D & Animation",
        slug: "3d-animation",
        description: "3D modeling and animation",
        courseCount: 450,
        isPopular: true
      },
      {
        id: "design-fashion-001",
        name: "Fashion Design",
        slug: "fashion-design",
        description: "Fashion design and clothing creation",
        courseCount: 120,
        isPopular: false
      },
      {
        id: "design-interior-001",
        name: "Interior Design",
        slug: "interior-design",
        description: "Space planning and interior decoration",
        courseCount: 80,
        isPopular: false
      },
      {
        id: "design-arch-001",
        name: "Architectural Design",
        slug: "architectural-design",
        description: "Building and structural design",
        courseCount: 30,
        isPopular: false
      }
    ]
  },
  {
    id: "marketing-001",
    name: "Marketing",
    slug: "marketing",
    description: "Digital marketing and brand promotion",
    icon: "📈",
    color: "teal",
    courseCount: 4890,
    isPopular: true,
    subcategories: [
      {
        id: "marketing-digital-001",
        name: "Digital Marketing",
        slug: "digital-marketing",
        description: "Online marketing strategies and tactics",
        courseCount: 1560,
        isPopular: true
      },
      {
        id: "marketing-social-001",
        name: "Social Media Marketing",
        slug: "social-media-marketing",
        description: "Social media strategy and content creation",
        courseCount: 1200,
        isPopular: true
      },
      {
        id: "marketing-content-001",
        name: "Content Marketing",
        slug: "content-marketing",
        description: "Content strategy and creation",
        courseCount: 670,
        isPopular: true
      },
      {
        id: "marketing-seo-001",
        name: "Search Engine Optimization",
        slug: "search-engine-optimization",
        description: "SEO and search marketing",
        courseCount: 890,
        isPopular: true
      },
      {
        id: "marketing-email-001",
        name: "Email Marketing",
        slug: "email-marketing",
        description: "Email campaigns and automation",
        courseCount: 340,
        isPopular: false
      },
      {
        id: "marketing-affiliate-001",
        name: "Affiliate Marketing",
        slug: "affiliate-marketing",
        description: "Affiliate programs and partnerships",
        courseCount: 120,
        isPopular: false
      },
      {
        id: "marketing-video-001",
        name: "Video Marketing",
        slug: "video-marketing",
        description: "Video content and YouTube marketing",
        courseCount: 80,
        isPopular: false
      },
      {
        id: "marketing-analytics-001",
        name: "Marketing Analytics",
        slug: "marketing-analytics",
        description: "Marketing data analysis and metrics",
        courseCount: 30,
        isPopular: false
      }
    ]
  }
];

// Helper functions
export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(cat => cat.id === id);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(cat => cat.slug === slug);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string): Subcategory | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

export const getSubcategoryBySlug = (categorySlug: string, subcategorySlug: string): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug);
  return category?.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getPopularCategories = (): Category[] => {
  return categories.filter(cat => cat.isPopular);
};

export const getPopularSubcategories = (categoryId?: string): Subcategory[] => {
  if (categoryId) {
    const category = getCategoryById(categoryId);
    return category?.subcategories.filter(sub => sub.isPopular) || [];
  }
  
  return categories.flatMap(cat => 
    cat.subcategories.filter(sub => sub.isPopular)
  );
};

export const getTotalCourseCount = (): number => {
  return categories.reduce((total, cat) => total + (cat.courseCount || 0), 0);
};