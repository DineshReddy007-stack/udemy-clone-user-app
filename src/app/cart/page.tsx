"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store';
import { fetchCart, removeFromCart, clearCart } from '@/lib/cartSlice';
import { addToWishlist } from '@/lib/wishlistSlice';
import { 
  ShoppingCart, 
  Trash2, 
  Heart, 
  ArrowLeft, 
  Star, 
  Clock, 
  Users,
  CreditCard,
  ShoppingBag
} from 'lucide-react';
import TopBar from '@/components/ui/TopBar';
import Footer from '@/components/ui/Footer';

// Updated Course interface to match your CourseCard interface
interface Course {
  _id: string;
  title: string;
  description?: string;
  instructor?: string;
  price?: number;
  thumbnail?: string;
  duration?: number;
  rating?: number;
  studentsEnrolled?: number; // Added this missing property
  level?: string;
  category?: string;
}

// Cart item interface
interface CartItem {
  _id: string;
  course: Course;
  addedAt?: string;
}

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { items: cartItems, total, loading, error } = useSelector((state: RootState) => state.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin');
      return;
    }
    
    dispatch(fetchCart());
  }, [isAuthenticated, dispatch, router]);

  const handleRemoveFromCart = async (courseId: string) => {
    try {
      await dispatch(removeFromCart(courseId));
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      try {
        await dispatch(clearCart());
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    }
  };

  const handleMoveToWishlist = async (courseId: string) => {
    try {
      await dispatch(addToWishlist(courseId));
      await dispatch(removeFromCart(courseId));
    } catch (error) {
      console.error('Failed to move to wishlist:', error);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Implement checkout logic here
    setTimeout(() => {
      alert('Checkout functionality would be implemented here!');
      setIsCheckingOut(false);
    }, 2000);
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-1">
              {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in your cart
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading your cart...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={() => dispatch(fetchCart())}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any courses to your cart yet. Start browsing to find your next learning adventure!
            </p>
            <div className="space-x-4">
              <button
                onClick={() => router.push('/courses')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Browse Courses
              </button>
              <button
                onClick={() => router.push('/wishlist')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                View Wishlist
              </button>
            </div>
          </div>
        ) : (
          /* Cart with Items */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    disabled={loading}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                  </button>
                </div>
              )}

              {/* Cart Items List */}
              {cartItems.map((item: CartItem) => (
                <div key={item._id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex gap-4">
                    {/* Course Thumbnail */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.course.thumbnail || '/api/placeholder/200/120'}
                        alt={item.course.title}
                        className="w-32 h-20 object-cover rounded-lg"
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 pr-4">
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {item.course.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            By {item.course.instructor || 'Unknown Instructor'}
                          </p>
                          
                          {/* Course Stats */}
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{(item.course.rating || 0).toFixed(1)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatDuration(item.course.duration || 0)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{(item.course.studentsEnrolled || 0).toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Course Description */}
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {item.course.description || 'No description available'}
                          </p>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">
                            {formatPrice(item.course.price || 0)}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                        <button
                          onClick={() => handleRemoveFromCart(item.course._id)}
                          className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                        <button
                          onClick={() => handleMoveToWishlist(item.course._id)}
                          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition"
                        >
                          <Heart className="w-4 h-4" />
                          Move to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>{formatPrice(total || 0)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">-$0.00</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total || 0)}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    30-Day Money-Back Guarantee
                  </p>
                </div>

                {/* Recommended Actions */}
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => router.push('/courses')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => router.push('/wishlist')}
                      className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition"
                    >
                      View Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}