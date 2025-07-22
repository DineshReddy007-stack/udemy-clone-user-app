// src/services/cartService.ts
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import { mockCartAPI } from './mockCartService'; // Keep for fallback

export interface CartResponse {
  success: boolean;
  data: {
    items: any[];
    total: number;
    itemCount: number;
    user: string;
  };
  message?: string;
}

class CartService {
  // Set to false to use real API, true for mock
  private useMock = false; // Changed to false to use real API

  // Get user's cart
  async getCart() {
    if (this.useMock) {
      console.log('🛒 Using mock cart service');
      return mockCartAPI.getCart();
    }

    try {
      console.log('🛒 Getting cart from API');
      const response = await apiClient.get<CartResponse>(
        API_CONFIG.ENDPOINTS.CART.GET_CART,
        true // requireAuth
      );
      console.log('🛒 Cart response:', response);
      return response;
    } catch (error) {
      console.error('❌ Get cart failed:', error);
      throw error;
    }
  }

  // Add course to cart
  async addToCart(courseId: string) {
    if (this.useMock) {
      console.log('🛒 Using mock cart service');
      return mockCartAPI.addToCart(courseId);
    }

    try {
      console.log('🛒 Adding to cart via API:', courseId);
      const response = await apiClient.post<CartResponse>(
        API_CONFIG.ENDPOINTS.CART.ADD_TO_CART,
        { courseId },
        true // requireAuth
      );
      console.log('🛒 Add to cart response:', response);
      return response;
    } catch (error) {
      console.error('❌ Add to cart failed:', error);
      throw error;
    }
  }

  // Remove course from cart
  async removeFromCart(courseId: string) {
    if (this.useMock) {
      console.log('🛒 Using mock cart service');
      return mockCartAPI.removeFromCart(courseId);
    }

    try {
      console.log('🛒 Removing from cart via API:', courseId);
      const response = await apiClient.delete<{ success: boolean; message?: string }>(
        `${API_CONFIG.ENDPOINTS.CART.REMOVE_FROM_CART}/${courseId}`,
        true // requireAuth
      );
      console.log('🛒 Remove from cart response:', response);
      return response;
    } catch (error) {
      console.error('❌ Remove from cart failed:', error);
      throw error;
    }
  }

  // Clear entire cart
  async clearCart() {
    if (this.useMock) {
      console.log('🛒 Using mock cart service');
      return mockCartAPI.clearCart();
    }

    try {
      console.log('🛒 Clearing cart via API');
      const response = await apiClient.delete<{ success: boolean; message?: string }>(
        API_CONFIG.ENDPOINTS.CART.CLEAR_CART,
        true // requireAuth
      );
      console.log('🛒 Clear cart response:', response);
      return response;
    } catch (error) {
      console.error('❌ Clear cart failed:', error);
      throw error;
    }
  }

  // Get cart item count
  async getCartCount() {
    if (this.useMock) {
      console.log('🛒 Using mock cart service');
      return mockCartAPI.getCartCount();
    }

    try {
      const response = await apiClient.get<{ success: boolean; data: { count: number } }>(
        API_CONFIG.ENDPOINTS.CART.GET_COUNT,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('❌ Get cart count failed:', error);
      throw error;
    }
  }

  // Check if course is in cart
  async checkInCart(courseId: string) {
    if (this.useMock) {
      // Mock doesn't have this method, so return false
      return { success: true, data: { isInCart: false } };
    }

    try {
      const response = await apiClient.get<{ success: boolean; data: { isInCart: boolean } }>(
        `${API_CONFIG.ENDPOINTS.CART.CHECK_IN_CART}/${courseId}`,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('❌ Check in cart failed:', error);
      throw error;
    }
  }
}

export const cartAPI = new CartService();