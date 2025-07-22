import { apiClient } from './apiClient';
import { API_CONFIG } from '@/config/api';
import { Course } from './courseService';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  role: 'student' | 'instructor' | 'admin';
  enrolledCourses: string[];
  wishlist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  _id: string;
  user: string;
  course: Course;
  enrollmentDate: string;
  progress: number;
  completed: boolean;
  certificate?: string;
}

class UserService {
  // Get user profile
  async getProfile() {
    try {
      const response = await apiClient.get<UserProfile>(
        API_CONFIG.ENDPOINTS.USERS.GET_PROFILE,
        true
      );
      return response;
    } catch (error) {
      console.error('Get profile failed:', error);
      throw error;
    }
  }

  // Update user profile
  async updateProfile(profileData: Partial<UserProfile>) {
    try {
      const response = await apiClient.put<UserProfile>(
        API_CONFIG.ENDPOINTS.USERS.UPDATE_PROFILE,
        profileData,
        true
      );
      return response;
    } catch (error) {
      console.error('Update profile failed:', error);
      throw error;
    }
  }

  // Get user enrollments
  async getEnrollments() {
    try {
      const response = await apiClient.get<Enrollment[]>(
        API_CONFIG.ENDPOINTS.USERS.GET_ENROLLMENTS,
        true
      );
      return response;
    } catch (error) {
      console.error('Get enrollments failed:', error);
      throw error;
    }
  }

  // Get user wishlist
  async getWishlist() {
    try {
      const response = await apiClient.get<Course[]>(
        API_CONFIG.ENDPOINTS.USERS.GET_WISHLIST,
        true
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
      const response = await apiClient.post(
        `${API_CONFIG.ENDPOINTS.USERS.GET_WISHLIST}/${courseId}`,
        {},
        true
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
      const response = await apiClient.delete(
        `${API_CONFIG.ENDPOINTS.USERS.GET_WISHLIST}/${courseId}`,
        true
      );
      return response;
    } catch (error) {
      console.error('Remove from wishlist failed:', error);
      throw error;
    }
  }
}

export const userService = new UserService();