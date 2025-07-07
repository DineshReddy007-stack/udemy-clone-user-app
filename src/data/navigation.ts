export interface HoverCardContent {
  id: string;
  title?: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  width: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  type: 'link' | 'button' | 'icon' | 'dropdown';
  icon?: React.ComponentType<{ className?: string }>;
  hoverCard?: HoverCardContent;
  isExternal?: boolean;
  hasNotification?: boolean;
  className?: string;
}

export interface UserProfile {
  id: string;
  initials: string;
  name: string;
  email: string;
  avatar?: string;
  hasNotification: boolean;
  notificationCount?: number;
}

export interface TopBarData {
  logo: {
    id: string;
    text: string;
    href: string;
    className: string;
  };
  search: {
    id: string;
    placeholder: string;
    className: string;
  };
  navigationItems: NavigationItem[];
  user: UserProfile;
}

// TopBar navigation data
export const topBarData: TopBarData = {
  logo: {
    id: "logo-001",
    text: "Udemy clone",
    href: "/",
    className: "text-2xl font-bold text-Black"
  },
  
  search: {
    id: "search-001",
    placeholder: "Search for anything",
    className: "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
  },
  
  navigationItems: [
    {
      id: "nav-business-001",
      label: "Udemy Business",
      type: "dropdown",
      className: "text-black hover:text-purple-600 px-3 py-1 rounded-md transition",
      hoverCard: {
        id: "hover-business-001",
        description: "Get your team access to over 30,000 top Udemy courses, anytime, anywhere.",
        buttonText: "Try Udemy Business",
        buttonLink: "/business/try",
        width: "w-80"
      }
    },
    {
      id: "nav-teach-001",
      label: "Teach on Udemy",
      type: "dropdown",
      className: "text-black hover:text-purple-600 px-3 py-1 rounded-md transition",
      hoverCard: {
        id: "hover-teach-001",
        title: "Turn what you know into an opportunity and reach millions around the world.",
        description: "",
        buttonText: "Learn more",
        buttonLink: "/teach/learn-more",
        width: "w-96"
      }
    },
    {
      id: "nav-learning-001",
      label: "My Learning",
      href: "/my-courses",
      type: "link",
      className: "hover:text-purple-600 transition-colors"
    }
  ],
  
  user: {
    id: "user-001",
    initials: "VR",
    name: "Vangala Reddy",
    email: "vangala@example.com",
    hasNotification: false,
  }
};

// Icon navigation items (separate for better organization)
export interface IconNavigationItem {
  id: string;
  type: 'wishlist' | 'cart' | 'notifications';
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  hasNotification?: boolean;
  notificationCount?: number;
  className: string;
}

export const iconNavigationItems: IconNavigationItem[] = [
  {
    id: "icon-wishlist-001",
    type: "wishlist",
    icon: undefined, // Will be imported in component
    label: "Wishlist",
    href: "/wishlist",
    className: "text-gray-600 hover:text-purple-600 transition-colors",
    hasNotification: false
  },
  {
    id: "icon-cart-001",
    type: "cart",
    icon: undefined, // Will be imported in component
    label: "Shopping Cart",
    href: "/cart",
    className: "text-gray-600 hover:text-purple-600 transition-colors",
    hasNotification: true,

  },
  {
    id: "icon-notifications-001",
    type: "notifications",
    icon: undefined, // Will be imported in component
    label: "Notifications",
    href: "/notifications",
    className: "text-gray-600 hover:text-purple-600 transition-colors",
    hasNotification: true,
  }
];

// Helper functions
export const getNavigationItemById = (id: string): NavigationItem | undefined => {
  return topBarData.navigationItems.find(item => item.id === id);
};

export const getIconNavigationById = (id: string): IconNavigationItem | undefined => {
  return iconNavigationItems.find(item => item.id === id);
};

export const getHoverCardById = (id: string): HoverCardContent | undefined => {
  const navItem = topBarData.navigationItems.find(item => item.hoverCard?.id === id);
  return navItem?.hoverCard;
};

export const getUserProfile = (): UserProfile => {
  return topBarData.user;
};

export const getTotalNotifications = (): number => {
  const iconNotifications = iconNavigationItems.reduce((total, item) => 
    total + (item.notificationCount || 0), 0
  );
  const userNotifications = topBarData.user.notificationCount || 0;
  return iconNotifications + userNotifications;
};