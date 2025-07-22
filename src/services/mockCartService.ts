// src/services/mockCartService.ts - Fixed Mock Service
export interface CartResponse {
  success: boolean;
  data: {
    items: any[];
    total: number;
    user: string;
  };
  message?: string;
}

class MockCartService {
  private cartKey = 'mock_cart_items';
  
  private getCart(): any[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(this.cartKey);
      if (!stored) return [];
      
      const parsed = JSON.parse(stored);
      // Ensure we always return an array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('🛒 Mock: Error parsing cart from localStorage:', error);
      // Clear corrupted data and return empty array
      localStorage.removeItem(this.cartKey);
      return [];
    }
  }

  private saveCart(cart: any[]): void {
    if (typeof window === 'undefined') return;
    try {
      // Ensure we're always saving an array
      const cartArray = Array.isArray(cart) ? cart : [];
      localStorage.setItem(this.cartKey, JSON.stringify(cartArray));
    } catch (error) {
      console.error('🛒 Mock: Error saving cart to localStorage:', error);
    }
  }

  // Get user's cart
  async getCart(): Promise<CartResponse> {
    console.log('🛒 Mock: Getting cart');
    return new Promise((resolve) => {
      setTimeout(() => {
        const cart = this.getCart();
        console.log('🛒 Mock: Current cart items:', cart, 'Type:', typeof cart, 'IsArray:', Array.isArray(cart));
        
        // Double-check it's an array
        const cartArray = Array.isArray(cart) ? cart : [];
        
        resolve({
          success: true,
          data: {
            items: cartArray,
            total: cartArray.reduce((sum, item) => sum + (item.course?.price || 0), 0),
            user: 'mock-user'
          }
        });
      }, 300);
    });
  }

  // Add course to cart
  async addToCart(courseId: string): Promise<CartResponse> {
    console.log('🛒 Mock: Adding to cart', courseId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate courseId
          if (!courseId || typeof courseId !== 'string') {
            console.error('🛒 Mock: Invalid courseId:', courseId);
            reject(new Error('Invalid course ID'));
            return;
          }

          const cart = this.getCart();
          const cartArray = Array.isArray(cart) ? cart : [];
          
          // Check if already in cart
          const existingItem = cartArray.find(item => item.course?._id === courseId);
          if (existingItem) {
            reject(new Error('Course already in cart'));
            return;
          }

          // Mock course data (in real app, this would come from backend)
          const courseIdSuffix = courseId.length >= 4 ? courseId.slice(-4) : courseId;
          const mockCourse = {
            _id: courseId,
            title: `Mock Course ${courseIdSuffix}`,
            description: 'This is a mock course for testing cart functionality',
            instructor: 'Mock Instructor',
            price: 99.99,
            thumbnail: '/api/placeholder/300/200',
            duration: 120,
            rating: 4.5
          };

          const cartItem = {
            _id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            course: mockCourse,
            addedAt: new Date().toISOString()
          };

          // Create new array instead of mutating
          const newCart = [...cartArray, cartItem];
          this.saveCart(newCart);
          
          console.log('🛒 Mock: Course added successfully. New cart:', newCart);
          
          resolve({
            success: true,
            data: {
              items: newCart,
              total: newCart.reduce((sum, item) => sum + (item.course?.price || 0), 0),
              user: 'mock-user'
            }
          });
        } catch (error) {
          console.error('🛒 Mock: Error adding to cart:', error);
          reject(new Error(`Failed to add item to cart: ${error.message}`));
        }
      }, 300);
    });
  }

  // Remove course from cart
  async removeFromCart(courseId: string): Promise<{ success: boolean; message?: string }> {
    console.log('🛒 Mock: Removing from cart', courseId);
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const cart = this.getCart();
          const cartArray = Array.isArray(cart) ? cart : [];
          const newCart = cartArray.filter(item => item.course?._id !== courseId);
          this.saveCart(newCart);
          
          console.log('🛒 Mock: Course removed. New cart:', newCart);
          
          resolve({
            success: true,
            message: 'Course removed from cart'
          });
        } catch (error) {
          console.error('🛒 Mock: Error removing from cart:', error);
          resolve({
            success: false,
            message: 'Failed to remove item from cart'
          });
        }
      }, 300);
    });
  }

  // Clear entire cart
  async clearCart(): Promise<{ success: boolean; message?: string }> {
    console.log('🛒 Mock: Clearing cart');
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          this.saveCart([]);
          console.log('🛒 Mock: Cart cleared');
          
          resolve({
            success: true,
            message: 'Cart cleared'
          });
        } catch (error) {
          console.error('🛒 Mock: Error clearing cart:', error);
          resolve({
            success: false,
            message: 'Failed to clear cart'
          });
        }
      }, 300);
    });
  }

  // Get cart item count
  async getCartCount(): Promise<{ success: boolean; data: { count: number } }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          const cart = this.getCart();
          const cartArray = Array.isArray(cart) ? cart : [];
          resolve({
            success: true,
            data: { count: cartArray.length }
          });
        } catch (error) {
          console.error('🛒 Mock: Error getting cart count:', error);
          resolve({
            success: true,
            data: { count: 0 }
          });
        }
      }, 100);
    });
  }

  // Clear cart data (for logout)
  clearCartData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.cartKey);
    }
  }
}

export const mockCartAPI = new MockCartService();