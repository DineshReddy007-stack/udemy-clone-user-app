export interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  lastUpdated: string;
  bestseller?: boolean;
  highestRated?: boolean;
  new?: boolean;
  category: string;
  subcategory: string;
  description: string;
  learningOutcomes: string[];
  requirements: string[];
  language: string;
}

export interface FilterOption {
  id: string;
  name: string;
  count: number;
  isSelected: boolean;
}

export interface FilterSection {
  id: string;
  title: string;
  type: 'checkbox' | 'radio' | 'range';
  options: FilterOption[];
  isCollapsed: boolean;
}

export interface DevelopmentPageData {
  pageInfo: {
    title: string;
    description: string;
    totalCourses: number;
    category: string;
  };
  hero: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    stats: {
      students: string;
      courses: string;
      instructors: string;
    };
  };
  filters: FilterSection[];
  sortOptions: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  courses: Course[];
  featuredTopics: Array<{
    id: string;
    name: string;
    courseCount: number;
    trending: boolean;
  }>;
}

export const developmentPageData: DevelopmentPageData = {
  pageInfo: {
    title: "Development Courses",
    description: "Learn programming and software development from industry experts",
    totalCourses: 15420,
    category: "development"
  },

  hero: {
    title: "Development",
    subtitle: "Expand your career opportunities with Python, JavaScript, React, and more",
    backgroundImage: "/images/development-hero.jpg",
    stats: {
      students: "15M+",
      courses: "15,420",
      instructors: "3,200+"
    }
  },

  filters: [
    {
      id: "filter-topic-001",
      title: "Topic",
      type: "checkbox",
      isCollapsed: false,
      options: [
        { id: "web-dev", name: "Web Development", count: 5420, isSelected: false },
        { id: "mobile-dev", name: "Mobile Development", count: 2100, isSelected: false },
        { id: "data-science", name: "Data Science", count: 3200, isSelected: false },
        { id: "game-dev", name: "Game Development", count: 890, isSelected: false },
        { id: "devops", name: "DevOps", count: 1200, isSelected: false },
        { id: "software-testing", name: "Software Testing", count: 680, isSelected: false }
      ]
    },
    {
      id: "filter-level-001", 
      title: "Level",
      type: "checkbox",
      isCollapsed: false,
      options: [
        { id: "beginner", name: "Beginner", count: 8500, isSelected: false },
        { id: "intermediate", name: "Intermediate", count: 4200, isSelected: false },
        { id: "advanced", name: "Advanced", count: 2720, isSelected: false },
        { id: "all-levels", name: "All Levels", count: 6800, isSelected: false }
      ]
    },
    {
      id: "filter-language-001",
      title: "Language", 
      type: "checkbox",
      isCollapsed: true,
      options: [
        { id: "english", name: "English", count: 12400, isSelected: false },
        { id: "spanish", name: "Spanish", count: 1200, isSelected: false },
        { id: "french", name: "French", count: 800, isSelected: false },
        { id: "german", name: "German", count: 600, isSelected: false }
      ]
    },
    {
      id: "filter-price-001",
      title: "Price",
      type: "checkbox", 
      isCollapsed: true,
      options: [
        { id: "free", name: "Free", count: 1200, isSelected: false },
        { id: "paid", name: "Paid", count: 14220, isSelected: false }
      ]
    },
    {
      id: "filter-features-001",
      title: "Features",
      type: "checkbox",
      isCollapsed: true, 
      options: [
        { id: "subtitles", name: "Subtitles", count: 8900, isSelected: false },
        { id: "quizzes", name: "Quizzes", count: 6700, isSelected: false },
        { id: "assignments", name: "Coding Exercises", count: 5400, isSelected: false },
        { id: "certificate", name: "Certificate", count: 12100, isSelected: false }
      ]
    }
  ],

  sortOptions: [
    { id: "most-popular", label: "Most Popular", value: "popular" },
    { id: "highest-rated", label: "Highest Rated", value: "rating" },
    { id: "newest", label: "Newest", value: "newest" },
    { id: "price-low", label: "Price: Low to High", value: "price-asc" },
    { id: "price-high", label: "Price: High to Low", value: "price-desc" }
  ],

  courses: [
    {
      id: "course-react-001",
      title: "The Complete React Developer Course (w/ Hooks and Redux)",
      instructor: "Andrew Mead",
      rating: 4.7,
      reviewCount: 89234,
      price: 89.99,
      originalPrice: 199.99,
      thumbnail: "/images/courses/react-course.jpg",
      duration: "39 hours",
      level: "All Levels",
      lastUpdated: "12/2024",
      bestseller: true,
      category: "development",
      subcategory: "web-development",
      description: "Learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!",
      learningOutcomes: [
        "Build amazing single page applications with React JS and Redux",
        "Master fundamental concepts behind structuring Redux applications",
        "Realize the power of building composable components"
      ],
      requirements: [
        "Basic knowledge of HTML, CSS and JavaScript",
        "No prior React experience necessary"
      ],
      language: "English"
    },
    {
      id: "course-python-001", 
      title: "Complete Python Bootcamp From Zero to Hero in Python 3",
      instructor: "Jose Portilla",
      rating: 4.6,
      reviewCount: 467892,
      price: 79.99,
      originalPrice: 149.99,
      thumbnail: "/images/courses/python-course.jpg",
      duration: "22 hours",
      level: "All Levels", 
      lastUpdated: "11/2024",
      bestseller: true,
      category: "development",
      subcategory: "programming-languages",
      description: "Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games",
      learningOutcomes: [
        "Learn to use Python professionally, learning both Python 2 and Python 3!",
        "Create games with Python, like Tic Tac Toe and Blackjack!",
        "Learn advanced Python features, like the collections module and how to work with timestamps!"
      ],
      requirements: [
        "Access to a computer with an internet connection"
      ],
      language: "English"
    },
    {
      id: "course-javascript-001",
      title: "The Complete JavaScript Course 2024: From Zero to Expert!",
      instructor: "Jonas Schmedtmann", 
      rating: 4.7,
      reviewCount: 178945,
      price: 94.99,
      originalPrice: 189.99,
      thumbnail: "/images/courses/javascript-course.jpg",
      duration: "69 hours",
      level: "All Levels",
      lastUpdated: "12/2024",
      bestseller: true,
      category: "development",
      subcategory: "web-development", 
      description: "The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!",
      learningOutcomes: [
        "Become an advanced, confident, and modern JavaScript developer from scratch",
        "Build 6 beautiful real-world projects for your portfolio (not boring toy apps)",
        "Become job-ready by understanding how JavaScript really works behind the scenes"
      ],
      requirements: [
        "No coding experience is necessary to take this course! I take you from beginner to expert!",
        "Any computer and OS will work — Windows, macOS or Linux. We will set up your text editor the course."
      ],
      language: "English"
    },
    {
      id: "course-nodejs-001",
      title: "The Complete Node.js Developer Course (3rd Edition)",
      instructor: "Andrew Mead",
      rating: 4.7,
      reviewCount: 89543,
      price: 89.99,
      originalPrice: 179.99, 
      thumbnail: "/images/courses/nodejs-course.jpg",
      duration: "35 hours",
      level: "Intermediate",
      lastUpdated: "10/2024",
      highestRated: true,
      category: "development",
      subcategory: "web-development",
      description: "Learn Node.js by building real-world applications with Node JS, Express, MongoDB, Jest, and more!",
      learningOutcomes: [
        "Build, test, and launch Node apps",
        "Create Express web servers and APIs", 
        "Store data with Mongoose and MongoDB"
      ],
      requirements: [
        "Basic JavaScript knowledge is required",
        "No previous Node.js experience necessary"
      ],
      language: "English"
    },
    {
      id: "course-flutter-001",
      title: "Flutter & Dart - The Complete Guide [2024 Edition]",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.6,
      reviewCount: 67234,
      price: 94.99,
      originalPrice: 199.99,
      thumbnail: "/images/courses/flutter-course.jpg", 
      duration: "41 hours",
      level: "All Levels",
      lastUpdated: "12/2024",
      new: true,
      category: "development",
      subcategory: "mobile-development",
      description: "A Complete Guide to the Flutter SDK & Flutter Framework for building native iOS and Android apps",
      learningOutcomes: [
        "Learn Flutter and Dart from the ground up, step-by-step",
        "Build engaging native mobile apps for both Android and iOS",
        "Use features like Google Maps, the device camera, authentication and much more!"
      ],
      requirements: [
        "NO prior knowledge of Flutter or Dart required!",
        "Basic programming knowledge will help but is NOT required"
      ],
      language: "English"
    },
    {
      id: "course-docker-001",
      title: "Docker and Kubernetes: The Complete Guide",
      instructor: "Stephen Grider",
      rating: 4.6,
      reviewCount: 45678,
      price: 89.99,
      originalPrice: 169.99,
      thumbnail: "/images/courses/docker-course.jpg",
      duration: "22 hours", 
      level: "Intermediate",
      lastUpdated: "11/2024",
      category: "development",
      subcategory: "devops",
      description: "Build, test, and deploy Docker applications with Kubernetes while learning production-style development workflows",
      learningOutcomes: [
        "Learn Docker from scratch, no previous experience required",
        "Master using Docker Compose to simplify the deployment of multi-container applications",
        "Apply Docker mastery to build a continuous integration pipeline with GitHub Actions"
      ],
      requirements: [
        "Basic understanding of command line interface",
        "No prior Docker or Kubernetes experience necessary"
      ],
      language: "English"
    }
  ],

  featuredTopics: [
    { id: "python", name: "Python", courseCount: 3200, trending: true },
    { id: "javascript", name: "JavaScript", courseCount: 2800, trending: true },
    { id: "react", name: "React JS", courseCount: 1900, trending: true },
    { id: "angular", name: "Angular", courseCount: 1200, trending: false },
    { id: "vue", name: "Vue.js", courseCount: 800, trending: true },
    { id: "nodejs", name: "Node.js", courseCount: 1500, trending: false },
    { id: "machine-learning", name: "Machine Learning", courseCount: 2100, trending: true },
    { id: "data-structures", name: "Data Structures", courseCount: 900, trending: false }
  ]
};