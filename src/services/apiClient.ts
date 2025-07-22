// src/services/apiClient.ts
import { API_CONFIG, getAuthHeaders, ApiResponse, getCurrentToken } from '@/config/api';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    console.log('🔧 ApiClient initialized with base URL:', this.baseURL);
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      console.log('📡 API Request:', options.method || 'GET', url);
      
      const config: RequestInit = {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers,
        },
      };

      console.log('📡 Request config:', {
        url,
        method: config.method,
        headers: config.headers,
        body: config.body
      });

      const response = await fetch(url, config);
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
      
      // Get response text first to handle both JSON and HTML responses
      const responseText = await response.text();
      console.log('📡 Raw response (first 500 chars):', responseText.substring(0, 500));
      
      // Check if response is HTML (likely an error page)
      if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
        console.error('❌ Received HTML instead of JSON - Backend may be down or endpoint not found');
        console.error('❌ Full HTML response:', responseText);
        throw new Error(`Server returned HTML instead of JSON. Status: ${response.status}. Check if backend is running and endpoint exists.`);
      }

      // Try to parse JSON
      let data;
      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        console.error('❌ Response text:', responseText);
        throw new Error('Invalid JSON response from server. Check backend logs.');
      }

      console.log('📡 Parsed response data:', data);

      if (!response.ok) {
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data
        });
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      console.log('✅ API Request successful:', data);
      return data;
    } catch (error) {
      console.error('❌ API request failed:', error);
      
      // Enhanced error handling for common issues
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('❌ Network error - Backend server may be down');
        throw new Error('Network error: Cannot connect to backend server. Please check if the backend is running on the correct port.');
      }
      
      if (error.message.includes('CORS')) {
        console.error('❌ CORS error - Check backend CORS configuration');
        throw new Error('CORS error: Backend server is not allowing requests from this origin.');
      }
      
      throw error;
    }
  }

  private async authenticatedRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    console.log(`🔍 ${options.method || 'GET'} ${endpoint} (authenticated: true)`);
    
    // Multiple ways to get the token
    let token: string | null = null;
    
    // Method 1: Try getCurrentToken function
    try {
      token = getCurrentToken();
      console.log('🔑 getCurrentToken() result:', token ? 'Token found' : 'No token');
    } catch (error) {
      console.log('🔑 getCurrentToken() failed:', error);
    }
    
    // Method 2: Direct localStorage access as fallback
    if (!token && typeof window !== 'undefined') {
      token = localStorage.getItem('authToken');
      console.log('🔑 Direct localStorage check:', token ? 'Token found' : 'No token');
    }
    
    // Method 3: Check alternative token keys (just in case)
    if (!token && typeof window !== 'undefined') {
      const alternatives = ['token', 'accessToken', 'jwt', 'auth_token'];
      for (const key of alternatives) {
        const altToken = localStorage.getItem(key);
        if (altToken) {
          console.log(`🔑 Found token in alternative key '${key}'`);
          token = altToken;
          break;
        }
      }
    }
    
    // Debug: Show all localStorage keys
    if (!token && typeof window !== 'undefined') {
      console.log('🔍 All localStorage keys:', Object.keys(localStorage));
      console.log('🔍 Full localStorage contents:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          const value = localStorage.getItem(key);
          console.log(`  ${key}:`, value?.substring(0, 50) + (value && value.length > 50 ? '...' : ''));
        }
      }
    }
    
    if (!token) {
      console.error('❌ No authentication token found anywhere');
      console.error('❌ Checked: getCurrentToken(), localStorage.authToken, and alternatives');
      throw new Error('Authentication required. Please login first.');
    }

    console.log('🔑 Using token (first 30 chars):', token.substring(0, 30) + '...');
    
    // Prepare headers with explicit token
    const authHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    console.log('🔑 Authorization header being sent:', authHeaders.Authorization.substring(0, 50) + '...');

    const config: RequestInit = {
      ...options,
      headers: {
        ...authHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await this.request<T>(endpoint, config);
      return response;
    } catch (error) {
      console.error('❌ Authenticated request failed:', error);
      
      // If it's a 401 error, the token might be expired
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        console.log('🔄 Token might be expired, clearing auth data');
        // Clear invalid token data
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          localStorage.removeItem('refreshToken');
        }
        
        throw new Error('Session expired. Please login again.');
      }
      
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, authenticated = false): Promise<ApiResponse<T>> {
    console.log(`🔍 GET ${endpoint} (authenticated: ${authenticated})`);
    const requestMethod = authenticated ? this.authenticatedRequest : this.request;
    return requestMethod.call(this, endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(
    endpoint: string,
    data?: any,
    authenticated = false
  ): Promise<ApiResponse<T>> {
    console.log(`📝 POST ${endpoint} (authenticated: ${authenticated})`);
    if (data) {
      console.log('📝 POST data:', data);
    }
    const requestMethod = authenticated ? this.authenticatedRequest : this.request;
    return requestMethod.call(this, endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    data?: any,
    authenticated = true
  ): Promise<ApiResponse<T>> {
    console.log(`✏️ PUT ${endpoint} (authenticated: ${authenticated})`);
    if (data) {
      console.log('✏️ PUT data:', data);
    }
    const requestMethod = authenticated ? this.authenticatedRequest : this.request;
    return requestMethod.call(this, endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    authenticated = true
  ): Promise<ApiResponse<T>> {
    console.log(`🗑️ DELETE ${endpoint} (authenticated: ${authenticated})`);
    const requestMethod = authenticated ? this.authenticatedRequest : this.request;
    return requestMethod.call(this, endpoint, { method: 'DELETE' });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    data?: any,
    authenticated = true
  ): Promise<ApiResponse<T>> {
    console.log(`🔧 PATCH ${endpoint} (authenticated: ${authenticated})`);
    if (data) {
      console.log('🔧 PATCH data:', data);
    }
    const requestMethod = authenticated ? this.authenticatedRequest : this.request;
    return requestMethod.call(this, endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // Health check method for debugging
  async healthCheck(): Promise<ApiResponse<any>> {
    console.log('🏥 Performing health check...');
    try {
      const response = await this.get('/health');
      console.log('✅ Health check successful:', response);
      return response;
    } catch (error) {
      console.error('❌ Health check failed:', error);
      throw error;
    }
  }

  // Test authentication method
  async testAuth(): Promise<boolean> {
    console.log('🔐 Testing authentication...');
    try {
      await this.get('/auth/profile', true);
      console.log('✅ Authentication test successful');
      return true;
    } catch (error) {
      console.error('❌ Authentication test failed:', error);
      return false;
    }
  }

  // Debug method to show current configuration
  getDebugInfo(): object {
    const token = getCurrentToken();
    return {
      baseURL: this.baseURL,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'No token',
      environment: process.env.NODE_ENV,
      apiConfig: API_CONFIG,
      localStorageItems: {
        authToken: !!localStorage.getItem('authToken'),
        user: !!localStorage.getItem('user'),
        refreshToken: !!localStorage.getItem('refreshToken')
      }
    };
  }
}

export const apiClient = new ApiClient();

// Add debug methods to window in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).apiClient = apiClient;
  (window as any).debugAPI = {
    healthCheck: () => apiClient.healthCheck(),
    testAuth: () => apiClient.testAuth(),
    getDebugInfo: () => apiClient.getDebugInfo(),
    testCart: () => apiClient.get('/api/cart', true),
    testAddToCart: (courseId: string) => apiClient.post('/api/cart', { courseId }, true),
    checkToken: () => {
      console.log('=== TOKEN DEBUG ===');
      console.log('localStorage token:', localStorage.getItem('authToken'));
      console.log('localStorage user:', localStorage.getItem('user'));
      console.log('Current token:', getCurrentToken());
      console.log('Auth headers:', {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('authToken') ? `Bearer ${localStorage.getItem('authToken')?.substring(0, 20)}...` : 'No token'
      });
    }
  };
  
  console.log('🔧 Debug tools available on window.debugAPI');
  console.log('🔧 Available methods: healthCheck, testAuth, getDebugInfo, testCart, testAddToCart, checkToken');
}