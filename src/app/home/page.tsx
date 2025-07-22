// app/home/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import React from "react";
import TopBar from "@/components/ui/TopBar";
import CategoryNav from "@/components/ui/CategoryNav";
import HeroCarousel from "@/components/ui/HeroCarousel";
import CourseCard from "@/components/ui/CourseCard";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading courses from API...');
      
      const response = await fetch('https://udemy-clone-api-rbe6.onrender.com/api/courses');
      const data = await response.json();
      
      console.log('🔍 Raw API Response:', data);
      
      if (data.success && data.courses) {
        console.log('✅ Courses loaded:', data.courses.length);
        setCourses(data.courses);
      } else {
        console.log('❌ No courses found');
        setError('No courses found');
      }
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const featuredCourses = courses.slice(0, 4);
  const popularCourses = courses.slice(4, 8);

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <CategoryNav />
      
      {/* Hero Section */}
      <div className="bg-gray-50 pb-8">
        <HeroCarousel />
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Courses Section */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline">
              View All
            </button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={loadCourses}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* Popular Courses Section */}
        <section className="py-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline">
              View All
            </button>
          </div>
          
          {!loading && !error && (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </section>

        {/* Categories Section */}
        <section className="py-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Categories</h2>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
              { name: 'Development', icon: '💻' },
              { name: 'Business', icon: '💼' },
              { name: 'Design', icon: '🎨' },
              { name: 'Marketing', icon: '📈' },
              { name: 'Photography', icon: '📸' },
              { name: 'Music', icon: '🎵' },
            ].map((category) => (
              <div key={category.name} className="group cursor-pointer">
                <div className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors">
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 border-t border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join millions of learners and advance your career today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Courses
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Try Free Course
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}