"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/data/categories";

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const formatCategoryUrl = (category, subcategory = null) => {
    const baseUrl = category.toLowerCase().replace(/ & | /g, "-");
    if (subcategory) {
      const subUrl = subcategory.toLowerCase().replace(/ & | /g, "-");
      return `${baseUrl}/${subUrl}`;
    }
    return baseUrl;
  };

  const handleCategoryHover = (category) => {
    setActiveCategory(category);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b relative">
     <div className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 py-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => handleCategoryHover(category.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${formatCategoryUrl(category.name)}`}
                className={`
                  relative whitespace-nowrap text-sm font-medium transition-colors duration-200
                  ${activeCategory === category.name 
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                  }
                `}
              >
                {category.name}
                <svg 
                  className="inline ml-1 w-4 h-4 transition-transform duration-200 group-hover:rotate-180" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* Dropdown Menu */}
              {activeCategory === category.name && (
                <div 
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  onMouseEnter={() => handleCategoryHover(category.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-1 gap-1">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/category/${formatCategoryUrl(category.name, subcat.name)}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        {subcat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between py-3">
            <span className="text-lg font-semibold text-gray-800">Categories</span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg 
                className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown */}
          {isMobileMenuOpen && (
            <div className="pb-4 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="border-t pt-3">
                  <Link
                    href={`/category/${formatCategoryUrl(category.name)}`}
                    className="block text-base font-medium text-gray-800 hover:text-blue-600 pb-2"
                  >
                    {category.name}
                  </Link>
                  <div className="grid grid-cols-1 gap-1 ml-4">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        href={`/category/${formatCategoryUrl(category.name, subcat.name)}`}
                        className="block py-1 text-sm text-gray-600 hover:text-blue-600 transition-colors duration-150"
                      >
                        {subcat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
}