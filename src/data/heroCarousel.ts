export interface HeroButton {
  id: string;
  text: string;
  type: 'primary' | 'secondary';
  action: string;
  href?: string;
  icon?: React.ComponentType<{ size?: number }>;
  className: string;
  ariaLabel?: string;
}

export interface HeroStats {
  id: string;
  value: string;
  label: string;
  isVisible: boolean;
}

export interface HeroFloatingElement {
  id: string;
  content: string;
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  type: 'rating' | 'badge' | 'info';
  className: string;
}

export interface HeroVisualContent {
  id: string;
  title: string;
  description: string;
  floatingElements: HeroFloatingElement[];
  backgroundPattern?: {
    enabled: boolean;
    elements: Array<{
      id: string;
      size: string;
      position: string;
      opacity: string;
    }>;
  };
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  priority: number;
  isActive: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  backgroundColor: string;
  textColor: string;
  stats: HeroStats;
  buttons: HeroButton[];
  visualContent: HeroVisualContent;
  metadata: {
    targetAudience: string[];
    skillLevel: 'beginner' | 'intermediate' | 'advanced' | 'all';
    estimatedDuration: string;
    courseCount: number;
  };
}

export interface HeroCarouselSettings {
  id: string;
  autoPlay: {
    enabled: boolean;
    interval: number;
    pauseOnHover: boolean;
  };
  transitions: {
    duration: number;
    easing: string;
  };
  navigation: {
    arrows: boolean;
    dots: boolean;
    keyboard: boolean;
  };
  accessibility: {
    announceSlides: boolean;
    focusOnSlideChange: boolean;
  };
}

export interface HeroCarouselData {
  id: string;
  title: string;
  slides: HeroSlide[];
  settings: HeroCarouselSettings;
}

// Hero carousel data
export const heroCarouselData: HeroCarouselData = {
  id: "hero-carousel-001",
  title: "Featured Learning Opportunities",
  
  slides: [
    {
      id: "slide-skills-001",
      title: "Skills that get you hired",
      subtitle: "Get the skills you need for the job you want. Start your learning journey today.",
      category: "career-development",
      priority: 1,
      isActive: true,
      icon: undefined, // Will be imported in component
      backgroundColor: "bg-purple-600",
      textColor: "text-white",
      stats: {
        id: "stats-skills-001",
        value: "12M+",
        label: "learners",
        isVisible: true
      },
      buttons: [
        {
          id: "btn-explore-skills-001",
          text: "Explore skills",
          type: "primary",
          action: "navigate",
          href: "/skills",
          className: "bg-white text-gray-900 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg",
          ariaLabel: "Explore available skills and courses"
        },
        {
          id: "btn-watch-demo-001",
          text: "Watch demo",
          type: "secondary",
          action: "modal",
          className: "flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors",
          ariaLabel: "Watch demo video"
        }
      ],
      visualContent: {
        id: "visual-skills-001",
        title: "Interactive Learning",
        description: "Hands-on projects and real-world examples",
        floatingElements: [
          {
            id: "floating-rating-001",
            content: "4.5★",
            position: "top-right",
            type: "rating",
            className: "absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          },
          {
            id: "floating-certificate-001",
            content: "Certificate included",
            position: "bottom-left",
            type: "badge",
            className: "absolute bottom-4 left-4 bg-white/20 px-3 py-1 rounded-full"
          }
        ],
        backgroundPattern: {
          enabled: true,
          elements: [
            {
              id: "pattern-circle-1",
              size: "w-32 h-32",
              position: "top-10 right-10",
              opacity: "opacity-10"
            },
            {
              id: "pattern-circle-2", 
              size: "w-24 h-24",
              position: "bottom-10 right-32",
              opacity: "opacity-10"
            },
            {
              id: "pattern-circle-3",
              size: "w-16 h-16", 
              position: "top-1/2 right-1/4",
              opacity: "opacity-10"
            }
          ]
        }
      },
      metadata: {
        targetAudience: ["professionals", "career-changers", "students"],
        skillLevel: "all",
        estimatedDuration: "3-6 months",
        courseCount: 15420
      }
    },
    {
      id: "slide-python-001",
      title: "Learn Python today",
      subtitle: "Join millions learning to code with Python. Start with the basics and build real projects.",
      category: "programming",
      priority: 2,
      isActive: true,
      icon: undefined, // Will be imported in component
      backgroundColor: "bg-blue-600",
      textColor: "text-white",
      stats: {
        id: "stats-python-001",
        value: "5M+",
        label: "Python students",
        isVisible: true
      },
      buttons: [
        {
          id: "btn-start-coding-001",
          text: "Start coding",
          type: "primary",
          action: "navigate",
          href: "/courses/python",
          className: "bg-white text-gray-900 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg",
          ariaLabel: "Start learning Python programming"
        },
        {
          id: "btn-watch-demo-002",
          text: "Watch demo",
          type: "secondary", 
          action: "modal",
          className: "flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors",
          ariaLabel: "Watch Python course demo"
        }
      ],
      visualContent: {
        id: "visual-python-001",
        title: "Interactive Learning",
        description: "Hands-on projects and real-world examples",
        floatingElements: [
          {
            id: "floating-rating-002",
            content: "4.7★",
            position: "top-right",
            type: "rating",
            className: "absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          },
          {
            id: "floating-projects-001",
            content: "10+ Projects",
            position: "bottom-left",
            type: "badge",
            className: "absolute bottom-4 left-4 bg-white/20 px-3 py-1 rounded-full"
          }
        ]
      },
      metadata: {
        targetAudience: ["beginners", "developers", "data-scientists"],
        skillLevel: "beginner",
        estimatedDuration: "2-4 months", 
        courseCount: 3200
      }
    },
    {
      id: "slide-webdev-001",
      title: "Build websites that work",
      subtitle: "Learn modern web development with HTML, CSS, JavaScript, and popular frameworks.",
      category: "web-development",
      priority: 3,
      isActive: true,
      icon: undefined, // Will be imported in component
      backgroundColor: "bg-teal-600",
      textColor: "text-white",
      stats: {
        id: "stats-webdev-001",
        value: "8M+",
        label: "web developers",
        isVisible: true
      },
      buttons: [
        {
          id: "btn-start-building-001",
          text: "Start building",
          type: "primary",
          action: "navigate",
          href: "/courses/web-development",
          className: "bg-white text-gray-900 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg",
          ariaLabel: "Start learning web development"
        },
        {
          id: "btn-watch-demo-003",
          text: "Watch demo",
          type: "secondary",
          action: "modal", 
          className: "flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors",
          ariaLabel: "Watch web development demo"
        }
      ],
      visualContent: {
        id: "visual-webdev-001",
        title: "Interactive Learning",
        description: "Hands-on projects and real-world examples",
        floatingElements: [
          {
            id: "floating-rating-003",
            content: "4.6★",
            position: "top-right",
            type: "rating",
            className: "absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          },
          {
            id: "floating-portfolio-001",
            content: "Portfolio Ready",
            position: "bottom-left",
            type: "badge",
            className: "absolute bottom-4 left-4 bg-white/20 px-3 py-1 rounded-full"
          }
        ]
      },
      metadata: {
        targetAudience: ["beginners", "career-changers", "freelancers"],
        skillLevel: "beginner",
        estimatedDuration: "4-6 months",
        courseCount: 5420
      }
    },
    {
      id: "slide-datascience-001", 
      title: "Master data science",
      subtitle: "Turn data into insights. Learn the tools and techniques used by top companies.",
      category: "data-science",
      priority: 4,
      isActive: true,
      icon: undefined, // Will be imported in component
      backgroundColor: "bg-red-600",
      textColor: "text-white",
      stats: {
        id: "stats-datascience-001",
        value: "3M+",
        label: "data scientists",
        isVisible: true
      },
      buttons: [
        {
          id: "btn-explore-datascience-001",
          text: "Explore data science",
          type: "primary",
          action: "navigate",
          href: "/courses/data-science",
          className: "bg-white text-gray-900 px-8 py-4 rounded font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg",
          ariaLabel: "Explore data science courses"
        },
        {
          id: "btn-watch-demo-004",
          text: "Watch demo",
          type: "secondary",
          action: "modal",
          className: "flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded font-bold text-lg hover:bg-white hover:text-gray-900 transition-colors",
          ariaLabel: "Watch data science demo"
        }
      ],
      visualContent: {
        id: "visual-datascience-001",
        title: "Interactive Learning",
        description: "Hands-on projects and real-world examples", 
        floatingElements: [
          {
            id: "floating-rating-004",
            content: "4.8★",
            position: "top-right",
            type: "rating",
            className: "absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"
          },
          {
            id: "floating-analytics-001",
            content: "Real Analytics",
            position: "bottom-left",
            type: "badge",
            className: "absolute bottom-4 left-4 bg-white/20 px-3 py-1 rounded-full"
          }
        ]
      },
      metadata: {
        targetAudience: ["analysts", "developers", "researchers"],
        skillLevel: "intermediate",
        estimatedDuration: "6-8 months",
        courseCount: 2100
      }
    }
  ],

  settings: {
    id: "carousel-settings-001",
    autoPlay: {
      enabled: true,
      interval: 4000,
      pauseOnHover: true
    },
    transitions: {
      duration: 700,
      easing: "ease-in-out"
    },
    navigation: {
      arrows: true,
      dots: true,
      keyboard: true
    },
    accessibility: {
      announceSlides: true,
      focusOnSlideChange: false
    }
  }
};

// Helper functions
export const getSlideById = (id: string): HeroSlide | undefined => {
  return heroCarouselData.slides.find(slide => slide.id === id);
};

export const getActiveSlides = (): HeroSlide[] => {
  return heroCarouselData.slides.filter(slide => slide.isActive);
};

export const getSlidesByCategory = (category: string): HeroSlide[] => {
  return heroCarouselData.slides.filter(slide => slide.category === category);
};

export const getSlidesBySkillLevel = (level: string): HeroSlide[] => {
  return heroCarouselData.slides.filter(slide => 
    slide.metadata.skillLevel === level || slide.metadata.skillLevel === 'all'
  );
};

export const getButtonById = (slideId: string, buttonId: string): HeroButton | undefined => {
  const slide = getSlideById(slideId);
  return slide?.buttons.find(button => button.id === buttonId);
};

export const getFloatingElementById = (slideId: string, elementId: string): HeroFloatingElement | undefined => {
  const slide = getSlideById(slideId);
  return slide?.visualContent.floatingElements.find(element => element.id === elementId);
};

export const getTotalLearners = (): number => {
  return heroCarouselData.slides.reduce((total, slide) => {
    const value = slide.stats.value.replace(/[^\d]/g, '');
    const multiplier = slide.stats.value.includes('M') ? 1000000 : 1000;
    return total + (parseInt(value) * multiplier);
  }, 0);
};

export const getCarouselSettings = () => {
  return heroCarouselData.settings;
};

export const getSlidesOrderedByPriority = (): HeroSlide[] => {
  return [...heroCarouselData.slides].sort((a, b) => a.priority - b.priority);
};