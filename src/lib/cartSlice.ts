// src/lib/cartSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cartAPI } from '@/services/cartService';

export interface CartItem {
  _id: string;
  course: {
    _id: string;
    title: string;
    description: string;
    instructor: string;
    price: number;
    thumbnail?: string;
    duration: number;
    rating: number;
  };
  addedAt: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  total: 0,
  loading: false,
  error: null,
};

// Async thunks
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const state = getState() as { auth: { isAuthenticated: boolean; user: any } };
      if (!state.auth.isAuthenticated || !state.auth.user) {
        console.log('🔐 User not authenticated, skipping cart fetch');
        return { items: [], total: 0, itemCount: 0 };
      }

      const response = await cartAPI.getCart();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch cart');
    } catch (error: any) {
      console.error('❌ Fetch cart error:', error);
      
      // Handle auth errors gracefully
      if (error.message.includes('Authentication required') || 
          error.message.includes('No authentication token')) {
        console.log('🔐 Auth error in cart fetch, returning empty cart');
        return { items: [], total: 0, itemCount: 0 };
      }
      
      return rejectWithValue(error.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (courseId: string, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const state = getState() as { auth: { isAuthenticated: boolean; user: any } };
      if (!state.auth.isAuthenticated || !state.auth.user) {
        throw new Error('Please sign in to add items to cart');
      }

      const response = await cartAPI.addToCart(courseId);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to add to cart');
    } catch (error: any) {
      console.error('❌ Add to cart error:', error);
      return rejectWithValue(error.message || 'Failed to add to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await cartAPI.removeFromCart(courseId);
      if (response.success) {
        return courseId;
      }
      throw new Error(response.message || 'Failed to remove from cart');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove from cart');
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartAPI.clearCart();
      if (response.success) {
        return true;
      }
      throw new Error(response.message || 'Failed to clear cart');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetCart: (state) => {
      state.items = [];
      state.total = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.error = null;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove from cart
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.course._id !== action.payload);
        state.total = state.items.reduce((sum, item) => sum + item.course.price, 0);
      })
      
      // Clear cart
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
        state.total = 0;
      });
  },
});

export const { clearError, resetCart } = cartSlice.actions;
export default cartSlice.reducer;