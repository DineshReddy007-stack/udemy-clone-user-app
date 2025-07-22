// src/components/ui/CourseCard.tsx
"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Clock, Users, Heart, ShoppingCart } from 'lucide-react';
import { AppDispatch, RootState } from '@/lib/store';
import { addToCart } from '@/lib/cartSlice';
import { toggleWishlist } from '@/lib/wishlistSlice';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  thumbnail?: string;
  duration: number;
  rating: number;
  studentsCount?: number;
  category?: string;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  // Get auth state
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  // Get cart and wishlist states
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  // Debug: Log cart items when they change
  useEffect(() => {
    console.log(`🔍 CourseCard: Cart items updated for course ${course.title}`);
    console.log(`🔍 CourseCard: Total cart items: ${cartItems.length}`);
    console.log(`🔍 CourseCard: Cart items:`, cartItems);
  }, [cartItems, course.title]);

  // Debug: Log wishlist items when they change
  useEffect(() => {
    console.log(`🔍 CourseCard: Wishlist items updated for course ${course.title}`);
    console.log(`🔍 CourseCard: Total wishlist items: ${wishlistItems.length}`);
    console.log(`🔍 CourseCard: Wishlist items:`, wishlistItems);
  }, [wishlistItems, course.title]);

  // Check if course is in cart
  const isInCart = cartItems.some(item => item.course._id === course._id);
  console.log(`🔍 CourseCard: Is ${course.title} in cart?`, isInCart);

  // Check if course is in wishlist
  const isInWishlist = wishlistItems.some(item => item.course._id === course._id);
  console.log(`🔍 CourseCard: Is ${course.title} in wishlist?`, isInWishlist);

  const handleAddToCart = async () => {
    console.log('🛒 === COMPREHENSIVE ADD TO CART DEBUG ===');
    
    // Check auth state
    console.log('🛒 Redux Auth state:', { isAuthenticated, user: !!user });
    
    // Comprehensive localStorage check
    console.log('🛒 LocalStorage comprehensive check:');
    console.log('  - All keys:', Object.keys(localStorage));
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        console.log(`  - ${key}:`, value?.substring(0, 50) + (value && value.length > 50 ? '...' : ''));
      }
    }
    
    // Check multiple possible token keys
    const possibleTokenKeys = ['authToken', 'token', 'accessToken', 'jwt', 'auth_token'];
    let foundToken = null;
    
    for (const key of possibleTokenKeys) {
      const token = localStorage.getItem(key);
      if (token) {
        console.log(`🛒 ✅ Found token in '${key}':`, token.substring(0, 30) + '...');
        foundToken = token;
        break;
      }
    }
    
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      console.log('🛒 ❌ Redux says user not authenticated');
      alert('Please sign in to add items to cart');
      return;
    }
    
    // Check if any token exists
    if (!foundToken) {
      console.error('🛒 ❌ No token found in any expected location!');
      console.error('🛒 Checked keys:', possibleTokenKeys);
      
      // Show user a more helpful message
      alert('Authentication token not found. Please try logging in again.');
      return;
    }
    
    // If found token is not in 'authToken', copy it there
    if (!localStorage.getItem('authToken') && foundToken) {
      console.log('🛒 🔧 Copying token to authToken key...');
      localStorage.setItem('authToken', foundToken);
    }
    
    console.log('🛒 ✅ Token verified, proceeding with addToCart');
    console.log('🛒 Token preview:', foundToken.substring(0, 30) + '...');
    console.log('🛒 Course ID:', course._id);
    
    try {
      console.log('🛒 Dispatching addToCart action...');
      const result = await dispatch(addToCart(course._id));
      console.log('🛒 ✅ Successfully added to cart:', result);
    } catch (error) {
      console.error('🛒 ❌ Failed to add to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  const handleToggleWishlist = async () => {
    console.log('❤️ === TOGGLE WISHLIST DEBUG ===');
    
    // Check auth state
    console.log('❤️ Auth state:', { isAuthenticated, user: !!user });
    
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      console.log('❤️ ❌ User not authenticated');
      alert('Please sign in to add items to wishlist');
      return;
    }
    
    // Check if token exists before dispatching
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('❤️ ❌ No token found before dispatch!');
      alert('Please login first to add items to wishlist');
      return;
    }
    
    console.log('❤️ ✅ Token found, proceeding with toggleWishlist');
    console.log('❤️ Course ID:', course._id);
    console.log('❤️ Currently in wishlist:', isInWishlist);
    
    try {
      console.log('❤️ Dispatching toggleWishlist action...');
      const result = await dispatch(toggleWishlist(course._id));
      console.log('❤️ ✅ Successfully toggled wishlist:', result);
    } catch (error) {
      console.error('❤️ ❌ Failed to toggle wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      {/* Course Image */}
      <div className="relative h-48 bg-gray-200">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-white text-lg font-semibold">
              {course.title.charAt(0)}
            </span>
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
          disabled={!isAuthenticated}
        >
          <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Course Title */}
        <Link href={`/courses/${course._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>

        {/* Description */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
          {course.description}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{course.rating.toFixed(1)}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{course.duration}h</span>
          </div>

          {/* Students Count */}
          {course.studentsCount && (
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{course.studentsCount}</span>
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${course.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isInCart || !isAuthenticated}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isInCart
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : isAuthenticated
                  ? 'bg-black text-white hover:bg-black'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              {isInCart ? 'In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>

        {/* Auth Warning */}
        {!isAuthenticated && (
          <div className="mt-2 text-xs text-gray-500 text-center">
            <Link href="/signin" className="text-blue-600 hover:underline">
              Sign in
            </Link>
            {' '}to add to cart or wishlist
          </div>
        )}
      </div>
    </div>
  );
}