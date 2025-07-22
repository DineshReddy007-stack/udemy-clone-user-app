// src/config/api.ts - Fixed Version
export const API_CONFIG = {
  // Base URL without /api
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://udemy-clone-api-rbe6.onrender.com',
  ENDPOINTS: {
    // Auth endpoints
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      REFRESH: '/api/auth/refresh',
      LOGOUT: '/api/auth/logout',
      PROFILE: '/api/auth/profile'
    },
    // Course endpoints
    COURSES: {
      GET_ALL: '/api/courses',
      GET_BY_ID: (id: string) => `/api/courses/${id}`,
      GET_BY_CATEGORY: (category: string) => `/api/courses/category/${category}`,
      CREATE: '/api/courses',
      UPDATE: (id: string) => `/api/courses/${id}`,
      DELETE: (id: string) => `/api/courses/${id}`,
      SEARCH: '/api/courses/search',
      POPULAR: '/api/courses/popular',
      TRENDING: '/api/courses/trending'
    },
    // Cart endpoints - FIXED: Added /api/ prefix
    CART: {
      GET_CART: '/api/cart',
      ADD_TO_CART: '/api/cart',
      REMOVE_FROM_CART: '/api/cart',
      CLEAR_CART: '/api/cart/clear',
      GET_COUNT: '/api/cart/count',
      CHECK_IN_CART: '/api/cart/check'
    },
    // Wishlist endpoints - FIXED: Added /api/ prefix
    WISHLIST: {
      GET_WISHLIST: '/api/wishlist',
      ADD_TO_WISHLIST: '/api/wishlist',
      REMOVE_FROM_WISHLIST: '/api/wishlist',
      CHECK_WISHLIST: '/api/wishlist/check'
    },
    // User endpoints
    USERS: {
      GET_PROFILE: '/api/users/profile',
      UPDATE_PROFILE: '/api/users/profile',
      GET_ENROLLMENTS: '/api/users/enrollments',
      GET_WISHLIST: '/api/users/wishlist'
    },
    // Enrollment endpoints
    ENROLLMENTS: {
      CREATE: '/api/enrollments',
      GET_BY_USER: (userId: string) => `/api/enrollments/user/${userId}`,
      GET_BY_COURSE: (courseId: string) => `/api/enrollments/course/${courseId}`,
      UPDATE_PROGRESS: (id: string) => `/api/enrollments/${id}/progress`
    },
    // Review endpoints
    REVIEWS: {
      CREATE: '/api/reviews',
      GET_BY_COURSE: (courseId: string) => `/api/reviews/course/${courseId}`,
      UPDATE: (id: string) => `/api/reviews/${id}`,
      DELETE: (id: string) => `/api/reviews/${id}`
    }
  }
};

// Enhanced request headers with localStorage fallback
export const getAuthHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  // If token is provided, use it
  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Using provided token for headers');
  } else {
    // Otherwise, get from localStorage
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        headers.Authorization = `Bearer ${storedToken}`;
        console.log('🔑 Using stored token from localStorage');
      } else {
        console.log('🔑 No token found in localStorage');
      }
    }
  }
  
  return headers;
};

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Helper function to get current auth token
export const getCurrentToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getCurrentToken();
};

// Enhanced debug helper
export const testBackendConnection = async () => {
  try {
    console.log('🔍 Testing backend connection...');
    
    // Test health endpoint
    console.log('🔍 Testing health endpoint...');
    const healthResponse = await fetch(`${API_CONFIG.BASE_URL}/health`);
    console.log('🔍 Health response status:', healthResponse.status);
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check successful:', healthData);
    }
    
    // Test cart endpoint (should return auth error)
    console.log('🔍 Testing cart endpoint...');
    const cartResponse = await fetch(`${API_CONFIG.BASE_URL}/api/cart`);
    console.log('🔍 Cart response status:', cartResponse.status);
    
    const cartText = await cartResponse.text();
    console.log('🔍 Cart response:', cartText.substring(0, 200));
    
    if (cartText.includes('<!DOCTYPE') || cartText.includes('<html')) {
      console.error('❌ Backend is returning HTML - routes not configured properly');
      return false;
    } else {
      console.log('✅ Backend is returning JSON - routes are working');
      return true;
    }
  } catch (error) {
    console.error('❌ Backend connection test failed:', error);
    return false;
  }
};

// Test specific cart endpoint
export const testCartEndpoint = async () => {
  try {
    console.log('🔍 Testing cart endpoint specifically...');
    
    const token = getCurrentToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Using token for cart test');
    } else {
      console.log('🔑 No token available for cart test');
    }
    
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/cart`, {
      method: 'GET',
      headers
    });
    
    console.log('🔍 Cart test response status:', response.status);
    
    const responseText = await response.text();
    console.log('🔍 Cart test response:', responseText);
    
    // Try to parse as JSON
    try {
      const data = JSON.parse(responseText);
      console.log('✅ Cart endpoint returns valid JSON:', data);
      
      if (response.status === 401) {
        console.log('✅ Cart endpoint properly requires authentication');
      } else if (response.status === 200) {
        console.log('✅ Cart endpoint returned data successfully');
      }
      
      return data;
    } catch (parseError) {
      console.error('❌ Cart endpoint returned invalid JSON');
      return null;
    }
  } catch (error) {
    console.error('❌ Cart endpoint test failed:', error);
    return null;
  }
};

// Debug info function
export const getAPIDebugInfo = () => {
  return {
    baseURL: API_CONFIG.BASE_URL,
    hasToken: !!getCurrentToken(),
    tokenPreview: getCurrentToken()?.substring(0, 20) + '...',
    endpoints: {
      auth: API_CONFIG.ENDPOINTS.AUTH.LOGIN,
      cart: API_CONFIG.ENDPOINTS.CART.GET_CART,
      wishlist: API_CONFIG.ENDPOINTS.WISHLIST.GET_WISHLIST
    },
    fullURLs: {
      authLogin: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`,
      cart: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CART.GET_CART}`,
      wishlist: `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WISHLIST.GET_WISHLIST}`
    }
  };
};

// Make functions available in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).testBackendConnection = testBackendConnection;
  (window as any).testCartEndpoint = testCartEndpoint;
  (window as any).getAPIDebugInfo = getAPIDebugInfo;
  
  console.log('🔧 Debug functions available:');
  console.log('- testBackendConnection()');
  console.log('- testCartEndpoint()');  
  console.log('- getAPIDebugInfo()');
}