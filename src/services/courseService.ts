import { apiClient } from './apiClient';
import { API_CONFIG, PaginatedResponse } from '@/config/api';

export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  subcategory: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  price: number;
  originalPrice?: number;
  thumbnail: string;
  duration: number; // in minutes
  rating: number;
  reviewCount: number;
  studentCount: number;
  language: string;
  subtitles: string[];
  requirements: string[];
  learningOutcomes: string[];
  curriculum: any[];
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseFilters {
  category?: string;
  subcategory?: string;
  level?: string[];
  price?: 'free' | 'paid';
  rating?: number;
  duration?: string;
  language?: string[];
  features?: string[];
  search?: string;
}

export interface CoursePagination {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

class CourseService {
  // Get all courses with filters and pagination
  async getCourses(
    filters: CourseFilters = {},
    pagination: CoursePagination = {}
  ) {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      // Add pagination to params
      Object.entries(pagination).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const queryString = params.toString();
      const endpoint = queryString 
        ? `${API_CONFIG.ENDPOINTS.COURSES.GET_ALL}?${queryString}`
        : API_CONFIG.ENDPOINTS.COURSES.GET_ALL;

      const response = await apiClient.get<PaginatedResponse<Course>>(endpoint);
      return response;
    } catch (error) {
      console.error('Get courses failed:', error);
      throw error;
    }
  }

  // Get course by ID
  async getCourseById(id: string) {
    try {
      const response = await apiClient.get<Course>(
        API_CONFIG.ENDPOINTS.COURSES.GET_BY_ID(id)
      );
      return response;
    } catch (error) {
      console.error('Get course by ID failed:', error);
      throw error;
    }
  }

  // Get courses by category
  async getCoursesByCategory(
    category: string, 
    filters: CourseFilters = {},
    pagination: CoursePagination = {}
  ) {
    try {
      const params = new URLSearchParams();
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      // Add pagination to params
      Object.entries(pagination).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const queryString = params.toString();
      const endpoint = queryString 
        ? `${API_CONFIG.ENDPOINTS.COURSES.GET_BY_CATEGORY(category)}?${queryString}`
        : API_CONFIG.ENDPOINTS.COURSES.GET_BY_CATEGORY(category);

      const response = await apiClient.get<PaginatedResponse<Course>>(endpoint);
      return response;
    } catch (error) {
      console.error('Get courses by category failed:', error);
      throw error;
    }
  }

  // Search courses
  async searchCourses(
    query: string,
    filters: CourseFilters = {},
    pagination: CoursePagination = {}
  ) {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      
      // Add filters to params
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
          } else {
            params.append(key, value.toString());
          }
        }
      });

      // Add pagination to params
      Object.entries(pagination).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString());
        }
      });

      const endpoint = `${API_CONFIG.ENDPOINTS.COURSES.SEARCH}?${params.toString()}`;
      const response = await apiClient.get<PaginatedResponse<Course>>(endpoint);
      return response;
    } catch (error) {
      console.error('Search courses failed:', error);
      throw error;
    }
  }

  // Get popular courses
  async getPopularCourses(limit: number = 10) {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.COURSES.POPULAR}?limit=${limit}`;
      const response = await apiClient.get<Course[]>(endpoint);
      return response;
    } catch (error) {
      console.error('Get popular courses failed:', error);
      throw error;
    }
  }

  // Get trending courses
  async getTrendingCourses(limit: number = 10) {
    try {
      const endpoint = `${API_CONFIG.ENDPOINTS.COURSES.TRENDING}?limit=${limit}`;
      const response = await apiClient.get<Course[]>(endpoint);
      return response;
    } catch (error) {
      console.error('Get trending courses failed:', error);
      throw error;
    }
  }

  // Create course (for instructors)
  async createCourse(courseData: Partial<Course>) {
    try {
      const response = await apiClient.post<Course>(
        API_CONFIG.ENDPOINTS.COURSES.CREATE,
        courseData,
        true
      );
      return response;
    } catch (error) {
      console.error('Create course failed:', error);
      throw error;
    }
  }

  // Update course
  async updateCourse(id: string, courseData: Partial<Course>) {
    try {
      const response = await apiClient.put<Course>(
        API_CONFIG.ENDPOINTS.COURSES.UPDATE(id),
        courseData,
        true
      );
      return response;
    } catch (error) {
      console.error('Update course failed:', error);
      throw error;
    }
  }

  // Delete course
  async deleteCourse(id: string) {
    try {
      const response = await apiClient.delete(
        API_CONFIG.ENDPOINTS.COURSES.DELETE(id),
        true
      );
      return response;
    } catch (error) {
      console.error('Delete course failed:', error);
      throw error;
    }
  }
}

export const courseService = new CourseService();