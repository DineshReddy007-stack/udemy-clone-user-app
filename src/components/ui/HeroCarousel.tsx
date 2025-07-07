"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, Play, Code, TrendingUp, Palette, Database } from "lucide-react";
import { 
  heroCarouselData, 
  getActiveSlides, 
  getCarouselSettings,
  HeroSlide,
  HeroButton 
} from "@/data/heroCarousel";

export default function HeroCarousel() {
  const slides = getActiveSlides();
  const settings = getCarouselSettings();
  
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(settings.autoPlay.enabled);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, settings.autoPlay.interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length, settings.autoPlay.interval]);

  const goToPrevious = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrent((current + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
  };

  const getIconComponent = (slide: HeroSlide) => {
    switch (slide.category) {
      case 'career-development':
        return TrendingUp;
      case 'programming':
        return Code;
      case 'web-development':
        return Palette;
      case 'data-science':
        return Database;
      default:
        return TrendingUp;
    }
  };

  const handleButtonClick = (button: HeroButton) => {
    switch (button.action) {
      case 'navigate':
        if (button.href) {
          window.location.href = button.href;
        }
        break;
      case 'modal':
        // Handle modal opening logic here
        console.log(`Opening modal for ${button.text}`);
        break;
      default:
        console.log(`Button ${button.id} clicked`);
    }
  };

  const renderButton = (button: HeroButton) => {
    const isSecondary = button.type === 'secondary';
    
    return (
      <button
        key={button.id}
        onClick={() => handleButtonClick(button)}
        className={button.className}
        aria-label={button.ariaLabel || button.text}
      >
        {isSecondary && <Play size={20} />}
        {button.text}
      </button>
    );
  };

  const renderFloatingElements = (slide: HeroSlide) => {
    return slide.visualContent.floatingElements.map((element) => (
      <div key={element.id} className={element.className}>
        <span className="text-white font-bold text-xs">
          {element.content}
        </span>
      </div>
    ));
  };

  const renderBackgroundPattern = (slide: HeroSlide) => {
    if (!slide.visualContent.backgroundPattern?.enabled) return null;

    return (
      <div className="absolute inset-0 opacity-10">
        {slide.visualContent.backgroundPattern.elements.map((element) => (
          <div
            key={element.id}
            className={`absolute ${element.position} ${element.size} rounded-full bg-white/20`}
          />
        ))}
      </div>
    );
  };

  if (slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No slides available</p>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[400px] overflow-hidden"
      role="region"
      aria-label={heroCarouselData.title}
    >
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => {
          const IconComponent = getIconComponent(slide);
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-${settings.transitions.duration} ${settings.transitions.easing} ${
                index === current ? 'translate-x-0' : 
                index < current ? '-translate-x-full' : 'translate-x-full'
              }`}
              aria-hidden={index !== current}
            >
              <div className={`${slide.backgroundColor} ${slide.textColor} w-full h-full flex items-center relative overflow-hidden`}>
                {/* Background Pattern */}
                {renderBackgroundPattern(slide)}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                  <div className="flex items-center justify-between">
                    {/* Content Section */}
                    <div className="flex-1 max-w-xl">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-3 rounded-full" aria-hidden="true">
                          <IconComponent size={32} className="text-white" />
                        </div>
                        {slide.stats.isVisible && (
                          <span className="text-sm font-medium opacity-90">
                            {slide.stats.value} {slide.stats.label}
                          </span>
                        )}
                      </div>
                      
                      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg sm:text-xl mb-8 opacity-90 leading-relaxed">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4">
                        {slide.buttons.map(renderButton)}
                      </div>
                      
                      {/* Metadata for screen readers */}
                      <div className="sr-only">
                        Category: {slide.category}, 
                        Skill level: {slide.metadata.skillLevel},
                        Duration: {slide.metadata.estimatedDuration},
                        Available courses: {slide.metadata.courseCount}
                      </div>
                    </div>

                    {/* Visual Section */}
                    <div className="hidden lg:block flex-shrink-0 ml-8">
                      <div className="relative w-[400px] h-[300px] bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                        <div className="text-center">
                          <IconComponent size={80} className="text-white/60 mx-auto mb-4" aria-hidden="true" />
                          <h3 className="text-xl font-bold text-white mb-2">
                            {slide.visualContent.title}
                          </h3>
                          <p className="text-white/80 text-sm">
                            {slide.visualContent.description}
                          </p>
                        </div>
                        
                        {/* Floating elements */}
                        {renderFloatingElements(slide)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      {settings.navigation.arrows && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-all duration-200 z-10 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 text-white transition-all duration-200 z-10 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {settings.navigation.dots && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === current 
                  ? 'bg-white' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            />
          ))}
        </div>
      )}

      {/* Auto-play pause on hover */}
      {settings.autoPlay.pauseOnHover && (
        <div 
          className="absolute inset-0 z-0"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(settings.autoPlay.enabled)}
        />
      )}

      {/* Live region for screen readers */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {settings.accessibility.announceSlides && (
          `Slide ${current + 1} of ${slides.length}: ${slides[current]?.title}`
        )}
      </div>
    </div>
  );
}