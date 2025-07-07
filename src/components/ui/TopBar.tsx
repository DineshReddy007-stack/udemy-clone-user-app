"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, Bell } from "lucide-react";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { topBarData, iconNavigationItems } from "@/data/navigation";

export default function TopBar() {
  const { logo, search, navigationItems, user } = topBarData;

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

  const getIconComponent = (type: string) => {
    switch (type) {
      case 'wishlist':
        return Heart;
      case 'cart':
        return ShoppingCart;
      case 'notifications':
        return Bell;
      default:
        return Heart;
    }
  };

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
            
            {/* Icon Navigation */}
            {iconNavigationItems.map((iconItem) => {
              const IconComponent = getIconComponent(iconItem.type);
              return (
                <div key={iconItem.id} className="relative">
                  {iconItem.href ? (
                    <Link href={iconItem.href}>
                      <button 
                        className={iconItem.className}
                        aria-label={iconItem.label}
                      >
                        <IconComponent className="w-5 h-5" />
                        {iconItem.hasNotification && iconItem.notificationCount && (
                          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {iconItem.notificationCount}
                          </span>
                        )}
                      </button>
                    </Link>
                  ) : (
                    <button 
                      className={iconItem.className}
                      aria-label={iconItem.label}
                    >
                      <IconComponent className="w-5 h-5" />
                      {iconItem.hasNotification && iconItem.notificationCount && (
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {iconItem.notificationCount}
                        </span>
                      )}
                    </button>
                  )}
                </div>
              );
            })}
            
            {/* User Profile */}
            <div className="relative">
              <button 
                className="h-8 w-8 rounded-full bg-purple-600 text-white font-semibold text-sm"
                aria-label={`User profile for ${user.name}`}
              >
                {user.initials}
              </button>
              {user.hasNotification && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}