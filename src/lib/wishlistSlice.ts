// src/lib/wishlistSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { wishlistAPI } from '@/services/wishlistService';

export interface WishlistItem {
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

interface WishlistState {
  items: WishlistItem[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const state = getState() as { auth: { isAuthenticated: boolean; user: any } };
      if (!state.auth.isAuthenticated || !state.auth.user) {
        console.log('🔐 User not authenticated, skipping wishlist fetch');
        return [];
      }

      const response = await wishlistAPI.getWishlist();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to fetch wishlist');
    } catch (error: any) {
      console.error('❌ Fetch wishlist error:', error);
      
      // Handle auth errors gracefully
      if (error.message.includes('Authentication required') || 
          error.message.includes('No authentication token')) {
        console.log('🔐 Auth error in wishlist fetch, returning empty wishlist');
        return [];
      }
      
      return rejectWithValue(error.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (courseId: string, { rejectWithValue, getState }) => {
    try {
      // Check if user is authenticated
      const state = getState() as { auth: { isAuthenticated: boolean; user: any } };
      if (!state.auth.isAuthenticated || !state.auth.user) {
        throw new Error('Please sign in to add items to wishlist');
      }

      const response = await wishlistAPI.addToWishlist(courseId);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Failed to add to wishlist');
    } catch (error: any) {
      console.error('❌ Add to wishlist error:', error);
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await wishlistAPI.removeFromWishlist(courseId);
      if (response.success) {
        return courseId;
      }
      throw new Error(response.message || 'Failed to remove from wishlist');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  'wishlist/toggleWishlist',
  async (courseId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { wishlist: WishlistState };
      const isInWishlist = state.wishlist.items.some(item => item.course._id === courseId);
      
      if (isInWishlist) {
        const response = await wishlistAPI.removeFromWishlist(courseId);
        if (response.success) {
          return { action: 'removed', courseId };
        }
      } else {
        const response = await wishlistAPI.addToWishlist(courseId);
        if (response.success && response.data) {
          return { action: 'added', data: response.data };
        }
      }
      throw new Error('Failed to toggle wishlist');
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to toggle wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetWishlist: (state) => {
      state.items = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.error = null;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.course._id !== action.payload);
      })
      
      // Toggle wishlist
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        if (action.payload.action === 'added') {
          state.items.push(action.payload.data);
        } else {
          state.items = state.items.filter(item => item.course._id !== action.payload.courseId);
        }
      });
  },
});

export const { clearError, resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;