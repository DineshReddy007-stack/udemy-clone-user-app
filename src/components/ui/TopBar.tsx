"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Search, Heart, ShoppingCart, Bell, LogOut, User } from "lucide-react";
import { AppDispatch, RootState } from "@/lib/store";
import { logoutUser, initializeAuth } from "@/lib/authSlice";
import { fetchCart, resetCart } from "@/lib/cartSlice";
import { fetchWishlist, resetWishlist } from "@/lib/wishlistSlice";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { topBarData, iconNavigationItems } from "@/data/navigation";

export default function TopBar() {
  const { logo, search, navigationItems } = topBarData;
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { isAuthenticated, user: authUser, loading, token } = useSelector((state: RootState) => state.auth);
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  // Initialize auth state on component mount
  useEffect(() => {
    console.log('🔧 TopBar: Initializing auth state from localStorage...');
    dispatch(initializeAuth());
  }, [dispatch]);

  // Fetch cart and wishlist when user is authenticated
  useEffect(() => {
    console.log('🔍 TopBar: Auth state changed:', { 
      isAuthenticated, 
      hasUser: !!authUser, 
      hasToken: !!token,
      loading 
    });

    if (isAuthenticated && authUser && token && !loading) {
      console.log('🔐 User authenticated, fetching cart and wishlist...');
      
      // Add a small delay to ensure token is properly set
      setTimeout(() => {
        console.log('🔐 Dispatching cart and wishlist fetch...');
        dispatch(fetchCart()).catch(err => {
          console.error('❌ Failed to fetch cart:', err);
        });
        dispatch(fetchWishlist()).catch(err => {
          console.error('❌ Failed to fetch wishlist:', err);
        });
      }, 100);
    } else if (!isAuthenticated) {
      console.log('🔐 User not authenticated, resetting cart and wishlist...');
      // Reset cart and wishlist when user logs out
      dispatch(resetCart());
      dispatch(resetWishlist());
    } else {
      console.log('🔐 User auth state not ready:', { 
        isAuthenticated, 
        hasUser: !!authUser, 
        hasToken: !!token,
        loading 
      });
    }
  }, [isAuthenticated, authUser, token, loading, dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      router.push('/signin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderHoverCard = (item: typeof navigationItems[0]) => {
    if (!item.hoverCard) return null;

    return (
      <HoverCard key={item.id}>
        <HoverCardTrigger asChild>
          <button className={item.className}>
            {item.label}
          </button>
        </HoverCardTrigger>
        <HoverCardContent className={`${item.hoverCard.width} p-4 bg-white rounded-lg shadow-lg z-[9999]`}>
          {item.hoverCard.title ? (
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {item.hoverCard.title}
              </h3>
              <Link href={item.hoverCard.buttonLink} className="block">
                <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition font-semibold">
                  {item.hoverCard.buttonText}
                </button>
              </Link>
            </div>
          ) : (
            <>
              <p className="text-gray-800 font-semibold mb-4">
                {item.hoverCard.description}
              </p>
              <Link href={item.hoverCard.buttonLink} className="block">
                <button className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition">
                  {item.hoverCard.buttonText}
                </button>
              </Link>
            </>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  };

  const renderNavigationItem = (item: typeof navigationItems[0]) => {
    switch (item.type) {
      case 'dropdown':
        return renderHoverCard(item);
      case 'link':
        return (
          <Link key={item.id} href={item.href!} className={item.className}>
            {item.label}
          </Link>
        );
      default:
        return null;
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getCartCount = () => cartItems.length;
  const getWishlistCount = () => wishlistItems.length;

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">
          {/* Logo Section */}
          <div className="flex items-center space-x-6">
            <Link href={logo.href} className={`flex items-center ${logo.className}`}>
              {logo.text}
            </Link>
          </div>

          {/* Search Section */}
          <div className="flex-1 mx-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={search.placeholder}
                className={search.className}
                aria-label="Search for courses"
              />
            </div>
          </div>
          
          {/* Navigation Section */}
          <div className="flex items-center space-x-4 text-gray-700">
            {/* Navigation Links */}
            {navigationItems.map(renderNavigationItem)}
            
            {/* Show different content based on auth state */}
            {isAuthenticated && authUser ? (
              <>
                {/* Wishlist Button */}
                <div className="relative">
                  <Link href="/wishlist">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition relative"
                      aria-label="Wishlist"
                    >
                      <Heart className="w-5 h-5" />
                      {getWishlistCount() > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {getWishlistCount()}
                        </span>
                      )}
                    </button>
                  </Link>
                </div>

                {/* Cart Button */}
                <div className="relative">
                  <Link href="/cart">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition relative"
                      aria-label="Shopping Cart"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-black text-white text-xs rounded-full flex items-center justify-center font-medium">
                          {getCartCount()}
                        </span>
                      )}
                    </button>
                  </Link>
                </div>

                {/* Notifications Button */}
                <div className="relative">
                  <button 
                    className="p-2 hover:bg-gray-100 rounded-full transition relative"
                    aria-label="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {/* You can add notification count here */}
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                  </button>
                </div>
                
                {/* User Profile with Dropdown */}
                <div className="relative">
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button 
                        className="h-8 w-8 rounded-full bg-black text-white font-semibold text-sm hover:bg-purple-700 transition"
                        aria-label={`User profile for ${authUser?.name || 'User'}`}
                      >
                        {authUser?.name ? getUserInitials(authUser.name) : 'U'}
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 p-0 bg-white rounded-lg shadow-lg border z-[9999]">
                      <div className="p-4">
                        {/* User Info */}
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="h-12 w-12 rounded-full bg-purple-600 text-white font-semibold text-lg flex items-center justify-center">
                            {authUser?.name ? getUserInitials(authUser.name) : 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{authUser?.name || 'User'}</p>
                            <p className="text-sm text-gray-600">{authUser?.email}</p>
                          </div>
                        </div>
                        
                        {/* Menu Items */}
                        <div className="space-y-1">
                          <Link href="/profile">
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">My Profile</span>
                            </button>
                          </Link>
                          
                          <Link href="/my-courses">
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition">
                              <Heart className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">My Courses</span>
                            </button>
                          </Link>

                          <Link href="/cart">
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition">
                              <ShoppingCart className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">Cart ({getCartCount()})</span>
                            </button>
                          </Link>

                          <Link href="/wishlist">
                            <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition">
                              <Heart className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-700">Wishlist ({getWishlistCount()})</span>
                            </button>
                          </Link>
                          
                          <hr className="my-2" />
                          
                          <button 
                            onClick={handleLogout}
                            disabled={loading}
                            className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-md transition disabled:opacity-50"
                          >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span className="text-red-600">
                              {loading ? 'Logging out...' : 'Logout'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </>
            ) : (
              <>
                {/* Auth buttons for non-authenticated users */}
                <Link href="/signin">
                  <button className="px-4 py-2 text-gray-700 hover:text-purple-600 transition font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition font-medium">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}