// src/services/authService.ts - Enhanced version
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
    refreshToken?: string;
  };
  message?: string;
}

class AuthService {
  // Helper method to store auth data with enhanced detection
  private storeAuthData(data: any) {
    console.log('💾 === ENHANCED STORING AUTH DATA ===');
    console.log('💾 Raw input data:', JSON.stringify(data, null, 2));
    console.log('💾 Data type:', typeof data);
    
    // Try to find token in various locations and formats
    let foundToken = null;
    const tokenSearchPaths = [
      'token',
      'accessToken', 
      'authToken',
      'jwt',
      'access_token',
      'auth_token',
      'data.token',
      'data.accessToken',
      'user.token'
    ];
    
    console.log('💾 Searching for token in paths:', tokenSearchPaths);
    
    for (const path of tokenSearchPaths) {
      let value = data;
      const parts = path.split('.');
      
      for (const part of parts) {
        if (value && typeof value === 'object' && value[part]) {
          value = value[part];
        } else {
          value = null;
          break;
        }
      }
      
      if (value && typeof value === 'string' && value.length > 10) {
        foundToken = value;
        console.log(`💾 ✅ Found token at path '${path}':`, foundToken.substring(0, 30) + '...');
        break;
      } else if (value) {
        console.log(`💾 ⚠️ Found value at '${path}' but it's not a valid token:`, typeof value, value);
      }
    }
    
    // If no token found in standard locations, check all string properties
    if (!foundToken) {
      console.log('💾 No token found in standard paths, checking all properties...');
      const checkForTokens = (obj: any, prefix = '') => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;
            
            if (typeof value === 'string' && value.length > 50 && (
              value.startsWith('eyJ') || // JWT tokens usually start with eyJ
              value.includes('.') && value.split('.').length === 3 // JWT has 3 parts
            )) {
              console.log(`💾 🔍 Potential token found at '${fullKey}':`, value.substring(0, 30) + '...');
              foundToken = value;
              return;
            } else if (typeof value === 'object' && value !== null) {
              checkForTokens(value, fullKey);
            }
          }
        }
      };
      
      checkForTokens(data);
    }
    
    if (foundToken) {
      localStorage.setItem('authToken', foundToken);
      console.log('💾 ✅ Token stored in localStorage as "authToken"');
      
      // Immediate verification
      const verification = localStorage.getItem('authToken');
      console.log('💾 ✅ Immediate verification:', verification ? 'SUCCESS' : 'FAILED');
      
      if (verification) {
        console.log('💾 ✅ Token first 30 chars:', verification.substring(0, 30) + '...');
      }
    } else {
      console.log('💾 ❌ NO TOKEN FOUND ANYWHERE');
      console.log('💾 Full data structure:', JSON.stringify(data, null, 2));
    }
    
    // Handle user data
    let userData = null;
    if (data.user) {
      userData = data.user;
    } else if (data.data && data.data.user) {
      userData = data.data.user;
    }
    
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('💾 ✅ User stored:', userData);
    } else {
      console.log('💾 ❌ No user found in response data');
    }
    
    // Handle refresh token
    const refreshToken = data.refreshToken || data.data?.refreshToken;
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
      console.log('💾 ✅ Refresh token stored');
    }
    
    // Final verification of all stored data
    console.log('💾 === FINAL STORAGE VERIFICATION ===');
    console.log('💾 authToken stored:', !!localStorage.getItem('authToken'));
    console.log('💾 user stored:', !!localStorage.getItem('user'));
    console.log('💾 refreshToken stored:', !!localStorage.getItem('refreshToken'));
    
    // Also log what's actually in localStorage now
    console.log('💾 Current localStorage contents:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        console.log(`  ${key}:`, value?.substring(0, 50) + (value && value.length > 50 ? '...' : ''));
      }
    }
  }

  // Login user
  async login(credentials: LoginCredentials) {
    try {
      console.log('🔵 === LOGIN ATTEMPT ===');
      console.log('🔵 Email:', credentials.email);
      console.log('🔵 API endpoint:', API_CONFIG.ENDPOINTS.AUTH.LOGIN);
      
      const response = await apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      console.log('🔵 === LOGIN RESPONSE ===');
      console.log('🔵 Raw response:', response);
      console.log('🔵 Response type:', typeof response);
      
      if (response) {
        // Store the data regardless of structure - let storeAuthData figure it out
        console.log('✅ Login response received, attempting to store auth data...');
        this.storeAuthData(response);
        
        // Return a consistent format
        return {
          success: true,
          data: response.data || response,
          message: response.message || 'Login successful'
        };
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      throw error;
    }
  }

  // Register user
  async register(userData: RegisterData) {
    try {
      console.log('🔵 === REGISTRATION ATTEMPT ===');
      console.log('🔵 User data:', { email: userData.email, name: userData.name });
      
      const response = await apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REGISTER,
        userData
      );

      console.log('🔵 === REGISTRATION RESPONSE ===');
      console.log('🔵 Raw response:', response);
      
      if (response) {
        console.log('✅ Registration response received, attempting to store auth data...');
        this.storeAuthData(response);
        
        return {
          success: true,
          data: response.data || response,
          message: response.message || 'Registration successful'
        };
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('❌ Registration failed:', error);
      throw error;
    }
  }

  // Logout user
  async logout() {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT, {}, true);
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      this.clearAuth();
    }
  }

  // Get current user profile
  async getCurrentUser() {
    try {
      const response = await apiClient.get<{success: boolean; data: User}>(
        API_CONFIG.ENDPOINTS.AUTH.PROFILE,
        true
      );
      
      console.log('🔵 Get current user response:', response);
      return response;
    } catch (error) {
      console.error('Get current user failed:', error);
      throw error;
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiClient.post<AuthResponse>(
        API_CONFIG.ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );

      if (response.success && response.data) {
        this.storeAuthData(response.data);
      }

      return response;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    const isAuth = !!(token && user);
    console.log('🔍 isAuthenticated check:', { hasToken: !!token, hasUser: !!user, result: isAuth });
    return isAuth;
  }

  // Get stored user data
  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      console.log('🔍 getStoredUser:', user ? 'User found' : 'No user');
      return user;
    } catch (error) {
      console.error('Failed to parse stored user:', error);
      return null;
    }
  }

  // Get stored token
  getStoredToken(): string | null {
    const token = localStorage.getItem('authToken');
    console.log('🔍 getStoredToken:', token ? `Token found (${token.length} chars)` : 'No token');
    return token;
  }

  // Set auth token
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
    console.log('🔑 ✅ Token manually set in localStorage');
  }

  // Set user data
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    console.log('👤 ✅ User manually set in localStorage');
  }

  // Clear all auth data
  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    console.log('🧹 ✅ All auth data cleared from localStorage');
  }
}

export const authService = new AuthService();