"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  Play,
  Heart,
  ShoppingCart,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';
import TopBar from '@/components/ui/TopBar';
import CategoryNav from '@/components/ui/CategoryNav';
import Footer from '@/components/ui/Footer';
import CourseCard from '@/components/ui/CourseCard'; // Use the same CourseCard as home page

export default function DevelopmentPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSort, setSelectedSort] = useState('studentsEnrolled');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    loadCourses();
  }, [selectedSort, sortOrder]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔍 Loading all courses from API...');
      
      // Use the same endpoint as your home page that works
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      
      console.log('🔍 Raw API Response:', data);
      
      if (data.success && data.courses) {
        console.log('✅ All courses loaded:', data.courses.length);
        
        // Filter for development category on frontend
        const developmentCourses = data.courses.filter(course => 
          course.category && course.category.toLowerCase() === 'development'
        );
        
        console.log('✅ Development courses found:', developmentCourses.length);
        
        // Sort courses based on selected option
        const sortedCourses = sortCourses(developmentCourses);
        setCourses(sortedCourses);
      } else {
        console.log('❌ No courses found in API response');
        setError('No courses found');
      }
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const sortCourses = (courses) => {
    return [...courses].sort((a, b) => {
      switch (selectedSort) {
        case 'studentsEnrolled':
          return sortOrder === 'desc' 
            ? (b.studentsEnrolled || 0) - (a.studentsEnrolled || 0)
            : (a.studentsEnrolled || 0) - (b.studentsEnrolled || 0);
        case 'rating':
          return sortOrder === 'desc' 
            ? (b.rating || 0) - (a.rating || 0)
            : (a.rating || 0) - (b.rating || 0);
        case 'price':
          return sortOrder === 'desc' 
            ? (b.price || 0) - (a.price || 0)
            : (a.price || 0) - (b.price || 0);
        case 'title':
          return sortOrder === 'desc' 
            ? b.title.localeCompare(a.title)
            : a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  };

  const sortOptions = [
    { id: 'studentsEnrolled', label: 'Most Popular' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price', label: 'Price: Low to High' },
    { id: 'title', label: 'Alphabetical' }
  ];

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSelectedSort(value);
    
    // Set sort order based on selection
    if (value === 'price') {
      setSortOrder('asc'); // Low to high for price
    } else {
      setSortOrder('desc'); // High to low for others
    }
  };

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
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Development Courses</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Expand your career opportunities with Python, JavaScript, React, and more
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">15M+</div>
                <div className="text-purple-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{courses.length}</div>
                <div className="text-purple-200">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">3,200+</div>
                <div className="text-purple-200">Instructors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Topics */}
      <div className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Popular topics</h2>
          <div className="flex flex-wrap gap-3">
            {['Python', 'JavaScript', 'React JS', 'Angular', 'Vue.js', 'Node.js', 'Machine Learning', 'Data Structures'].map((topic, index) => (
              <button
                key={topic}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:border-purple-600 hover:text-purple-600 transition-colors"
              >
                <span>{topic}</span>
                <span className="text-xs text-gray-500">{Math.floor(Math.random() * 3000 + 500)}</span>
                {index < 4 && <TrendingUp className="w-4 h-4 text-orange-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {courses.length} Development Courses
            </h2>
            <p className="text-gray-600">
              Build your skills with courses from top instructors
            </p>
            {error && (
              <p className="text-orange-600 text-sm mt-2">
                {error}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={selectedSort}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {sortOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Grid - Same pattern as home page */}
        {loading ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error && courses.length === 0 ? (
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
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}

        {/* No courses message */}
        {!loading && courses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">No development courses available at the moment.</p>
            <button 
              onClick={loadCourses}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Call to Action Section - Same as home */}
        <section className="py-16 border-t border-gray-200 mt-16">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to start your development journey?</h2>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of developers and master the latest technologies
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse All Courses
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Try Free Course
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}