// src/services/wishlistService.ts
import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';

export interface WishlistResponse {
  success: boolean;
  data: any[];
  message?: string;
}

class WishlistService {
  // Get user's wishlist
  async getWishlist() {
    try {
      const response = await apiClient.get<WishlistResponse>(
        API_CONFIG.ENDPOINTS.WISHLIST.GET_WISHLIST,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('Get wishlist failed:', error);
      throw error;
    }
  }

  // Add course to wishlist
  async addToWishlist(courseId: string) {
    try {
      const response = await apiClient.post<{ success: boolean; data: any; message?: string }>(
        API_CONFIG.ENDPOINTS.WISHLIST.ADD_TO_WISHLIST,
        { courseId },
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('Add to wishlist failed:', error);
      throw error;
    }
  }

  // Remove course from wishlist
  async removeFromWishlist(courseId: string) {
    try {
      const response = await apiClient.delete<{ success: boolean; message?: string }>(
        `${API_CONFIG.ENDPOINTS.WISHLIST.REMOVE_FROM_WISHLIST}/${courseId}`,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('Remove from wishlist failed:', error);
      throw error;
    }
  }

  // Check if course is in wishlist
  async isInWishlist(courseId: string) {
    try {
      const response = await apiClient.get<{ success: boolean; data: { isInWishlist: boolean } }>(
        `${API_CONFIG.ENDPOINTS.WISHLIST.CHECK_WISHLIST}/${courseId}`,
        true // requireAuth
      );
      return response;
    } catch (error) {
      console.error('Check wishlist failed:', error);
      throw error;
    }
  }
}

export const wishlistAPI = new WishlistService();