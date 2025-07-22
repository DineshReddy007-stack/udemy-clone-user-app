"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchWishlist, removeFromWishlist } from '@/lib/wishlistSlice';
import { addToCart } from '@/lib/cartSlice';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Star, 
  Clock, 
  Users, 
  ArrowLeft,
  Share2,
  Filter,
  Search,
  Grid,
  List,
  BookOpen
} from 'lucide-react';

interface WishlistItem {
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
    studentsEnrolled: number;
    level: string;
    category: string;
  };
  addedAt: string;
}

export default function WishlistPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  
  const { items: wishlistItems, loading, error } = useSelector((state: RootState) => state.wishlist);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'price' | 'rating'>('recent');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
    
    dispatch(fetchWishlist());
  }, [dispatch, isAuthenticated, router]);

  // Filter and sort wishlist items
  const filteredItems = React.useMemo(() => {
    const filtered = wishlistItems.filter(item => 
      item.course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || item.course.category === selectedCategory)
    );

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.course.title.localeCompare(b.course.title);
        case 'price':
          return a.course.price - b.course.price;
        case 'rating':
          return b.course.rating - a.course.rating;
        case 'recent':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      }
    });

    return filtered;
  }, [wishlistItems, searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = [...new Set(wishlistItems.map(item => item.course.category))];
    return cats.filter(Boolean);
  }, [wishlistItems]);

  const handleRemoveFromWishlist = async (courseId: string) => {
    try {
      await dispatch(removeFromWishlist(courseId));
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    }
  };

  const handleAddToCart = async (courseId: string) => {
    try {
      await dispatch(addToCart(courseId));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const isInCart = (courseId: string) => {
    return cartItems.some(item => item.course._id === courseId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Heart className="w-8 h-8 text-red-500 fill-current" />
                  My Wishlist
                </h1>
                <p className="text-gray-600 mt-1">
                  {wishlistItems.length} course{wishlistItems.length !== 1 ? 's' : ''} saved for later
                </p>
              </div>
            </div>
            
            {wishlistItems.length > 0 && (
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                <Share2 className="w-4 h-4" />
                Share Wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">❌ {error}</div>
            <button
              onClick={() => dispatch(fetchWishlist())}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : wishlistItems.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Start exploring courses and save your favorites here for easy access later.
              </p>
              <button
                onClick={() => router.push('/courses')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Browse Courses
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Filters and Controls */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search wishlist..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {/* Category Filter */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="recent">Recently Added</option>
                    <option value="title">Title A-Z</option>
                    <option value="price">Price Low-High</option>
                    <option value="rating">Highest Rated</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            {filteredItems.length !== wishlistItems.length && (
              <div className="mb-4">
                <p className="text-gray-600">
                  Showing {filteredItems.length} of {wishlistItems.length} courses
                </p>
              </div>
            )}

            {/* Wishlist Items */}
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
              : "space-y-4"
            }>
              {filteredItems.map((item) => (
                <WishlistItemCard
                  key={item._id}
                  item={item}
                  viewMode={viewMode}
                  isInCart={isInCart(item.course._id)}
                  onRemove={() => handleRemoveFromWishlist(item.course._id)}
                  onAddToCart={() => handleAddToCart(item.course._id)}
                  onViewCourse={() => router.push(`/courses/${item.course._id}`)}
                  formatPrice={formatPrice}
                  formatDuration={formatDuration}
                  formatDate={formatDate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Wishlist Item Card Component
interface WishlistItemCardProps {
  item: WishlistItem;
  viewMode: 'grid' | 'list';
  isInCart: boolean;
  onRemove: () => void;
  onAddToCart: () => void;
  onViewCourse: () => void;
  formatPrice: (price: number) => string;
  formatDuration: (minutes: number) => string;
  formatDate: (date: string) => string;
}

function WishlistItemCard({
  item,
  viewMode,
  isInCart,
  onRemove,
  onAddToCart,
  onViewCourse,
  formatPrice,
  formatDuration,
  formatDate
}: WishlistItemCardProps) {
  const { course } = item;

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition">
        <div className="flex gap-6">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={course.thumbnail || '/api/placeholder/200/120'}
              alt={course.title}
              className="w-48 h-28 object-cover rounded-lg cursor-pointer"
              onClick={onViewCourse}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 
                  className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition"
                  onClick={onViewCourse}
                >
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>By {course.instructor}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(course.duration)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsEnrolled.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize">
                    {course.level}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex flex-col items-end gap-3 ml-6">
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPrice(course.price)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Added {formatDate(item.addedAt)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onRemove}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={onAddToCart}
                    disabled={isInCart}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      isInCart
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {isInCart ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition group">
      {/* Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail || '/api/placeholder/300/180'}
          alt={course.title}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onViewCourse}
        />
        
        {/* Remove Button */}
        <button
          onClick={onRemove}
          className="absolute top-3 right-3 p-2 bg-white/90 text-red-600 rounded-full hover:bg-white shadow-sm transition opacity-0 group-hover:opacity-100"
          title="Remove from wishlist"
        >
          <Trash2 className="w-4 h-4" />
        </button>

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full capitalize">
            {course.level}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 
          className="font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600 transition"
          onClick={onViewCourse}
        >
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">By {course.instructor}</p>

        <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(course.duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-bold text-gray-900">
            {formatPrice(course.price)}
          </div>
          <div className="text-xs text-gray-500">
            {formatDate(item.addedAt)}
          </div>
        </div>

        <button
          onClick={onAddToCart}
          disabled={isInCart}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition ${
            isInCart
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}