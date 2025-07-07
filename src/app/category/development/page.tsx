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
  ShoppingCart
} from 'lucide-react';
import TopBar from '@/components/ui/TopBar';
import CategoryNav from '@/components/ui/CategoryNav';
import Footer from '@/components/ui/Footer';
import { developmentPageData, Course, FilterSection } from '@/data/developmentPage';

export default function DevelopmentPage() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [selectedSort, setSelectedSort] = useState('most-popular');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterSection[]>(developmentPageData.filters);
  const [courses, setCourses] = useState<Course[]>(developmentPageData.courses);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/signin');
    }
  }, [isAuthenticated, router]);

  const toggleFilter = (filterId: string, optionId: string) => {
    setFilters(prev => prev.map(filter => 
      filter.id === filterId 
        ? {
            ...filter,
            options: filter.options.map(option =>
              option.id === optionId 
                ? { ...option, isSelected: !option.isSelected }
                : option
            )
          }
        : filter
    ));
  };

  const toggleFilterSection = (filterId: string) => {
    setFilters(prev => prev.map(filter =>
      filter.id === filterId 
        ? { ...filter, isCollapsed: !filter.isCollapsed }
        : filter
    ));
  };

  const clearAllFilters = () => {
    setFilters(prev => prev.map(filter => ({
      ...filter,
      options: filter.options.map(option => ({ ...option, isSelected: false }))
    })));
  };

  const getSelectedFiltersCount = () => {
    return filters.reduce((count, filter) => 
      count + filter.options.filter(option => option.isSelected).length, 0
    );
  };

  const renderCourseCard = (course: Course) => (
    <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">{course.title}</span>
        </div>
        {course.bestseller && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
            Bestseller
          </span>
        )}
        {course.highestRated && (
          <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
            Highest Rated
          </span>
        )}
        {course.new && (
          <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
            New
          </span>
        )}
        <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-purple-600 cursor-pointer">
          {course.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
        
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-orange-500">{course.rating}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-orange-500 fill-current' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">({course.reviewCount.toLocaleString()})</span>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <span>•</span>
          <span>{course.level}</span>
          <span>•</span>
          <span>Updated {course.lastUpdated}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl">${course.price}</span>
            {course.originalPrice && (
              <span className="text-gray-500 line-through text-sm">${course.originalPrice}</span>
            )}
          </div>
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );

  const renderFilterSection = (filter: FilterSection) => (
    <div key={filter.id} className="border-b border-gray-200 py-4">
      <button
        onClick={() => toggleFilterSection(filter.id)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-900 hover:text-purple-600"
      >
        <span>{filter.title}</span>
        {filter.isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
      </button>
      
      {!filter.isCollapsed && (
        <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
          {filter.options.map(option => (
            <label key={option.id} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                checked={option.isSelected}
                onChange={() => toggleFilter(filter.id, option.id)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="flex-1 text-sm text-gray-700">{option.name}</span>
              <span className="text-xs text-gray-500">({option.count.toLocaleString()})</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <CategoryNav />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{developmentPageData.hero.title}</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              {developmentPageData.hero.subtitle}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold">{developmentPageData.hero.stats.students}</div>
                <div className="text-purple-200">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{developmentPageData.hero.stats.courses}</div>
                <div className="text-purple-200">Courses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">{developmentPageData.hero.stats.instructors}</div>
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
            {developmentPageData.featuredTopics.map(topic => (
              <button
                key={topic.id}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:border-purple-600 hover:text-purple-600 transition-colors"
              >
                <span>{topic.name}</span>
                <span className="text-xs text-gray-500">{topic.courseCount.toLocaleString()}</span>
                {topic.trending && <TrendingUp className="w-4 h-4 text-orange-500" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter
                  {getSelectedFiltersCount() > 0 && (
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
                      {getSelectedFiltersCount()}
                    </span>
                  )}
                </h3>
                {getSelectedFiltersCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="space-y-2">
                {filters.map(renderFilterSection)}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {developmentPageData.pageInfo.totalCourses.toLocaleString()} results for "Development"
                </h2>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {developmentPageData.sortOptions.map(option => (
                    <option key={option.id} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map(renderCourseCard)}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Show more courses
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}