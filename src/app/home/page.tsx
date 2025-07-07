"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import React from "react";
import TopBar from "@/components/ui/TopBar";
import CategoryNav from "@/components/ui/CategoryNav";
import HeroCarousel from "@/components/ui/HeroCarousel";
import CourseCard, { Course } from "@/components/ui/CourseCard";
import Footer from "@/components/ui/Footer";

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "React for Beginners",
    instructor: "Jane Doe",
    rating: 4.5,
    price: "$49.99",
    thumbnail: "/images/courses/pythonfordatascience.jpg",
  },
  {
    id: "2",
    title: "Mastering TypeScript",
    instructor: "John Smith",
    rating: 4.7,
    price: "$59.99",
    thumbnail: "/images/courses/typescript.png",
  },
  {
    id: "3",
    title: "JavaScript Fundamentals",
    instructor: "Alice Johnson",
    rating: 4.6,
    price: "$39.99",
    thumbnail: "/images/courses/java.png",
  },
  {
    id: "4",
    title: "Node.js Complete Guide",
    instructor: "Bob Wilson",
    rating: 4.8,
    price: "$69.99",
    thumbnail: "/images/courses/node.png",
  },
  {
    id: "5",
    title: "CSS Grid & Flexbox",
    instructor: "Emma Davis",
    rating: 4.4,
    price: "$29.99",
    thumbnail: "/images/courses/cssandgrid.png",
  },
  {
    id: "6",
    title: "Python for Data Science",
    instructor: "Michael Brown",
    rating: 4.9,
    price: "$79.99",
    thumbnail: "/images/courses/pythonfordatascience.jpg",
  },
  {
    id: "7",
    title: "AWS Cloud Practitioner",
    instructor: "Sarah Miller",
    rating: 4.7,
    price: "$89.99",
    thumbnail: "/images/courses/aws.png",
  },
  {
    id: "8",
    title: "Docker & Kubernetes",
    instructor: "David Lee",
    rating: 4.5,
    price: "$99.99",
    thumbnail: "/images/courses/kuber.jpg",
  },
];

const popularCourses = sampleCourses.slice(0, 4);
const featuredCourses = sampleCourses.slice(4, 8);

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin'); // Use replace instead of push
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* Popular Courses Section */}
        <section className="py-12 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Popular Courses</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm hover:underline">
              View All
            </button>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
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