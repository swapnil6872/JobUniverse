import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

import aiImg from '../../assets/homepage/course/Ai.webp';
import webImg from '../../assets/homepage/course/web.webp';
import pythonImg from '../../assets/homepage/course/python.webp';
import marketingImg from '../../assets/homepage/course/marketing.webp';

const courses = [
  {
    id: 1,
    duration: '6 weeks',
    title: 'Artificial Intelligence & Machine Learning',
    rating: 4.7,
    enrolled: '2050 Enrolled',
    imageBg: 'bg-gradient-to-br from-blue-50 to-indigo-100',
    imageSrc: aiImg,
  },
  {
    id: 2,
    duration: '8 weeks',
    title: 'Full Stack Web Development with AI',
    rating: 4.5,
    enrolled: '129953 Enrolled',
    imageBg: 'bg-gradient-to-br from-sky-50 to-blue-100',
    imageSrc: webImg,
  },
  {
    id: 3,
    duration: '6 weeks',
    title: 'Programming in Python with AI',
    rating: 4.5,
    enrolled: '93619 Enrolled',
    imageBg: 'bg-gradient-to-br from-slate-50 to-sky-100',
    imageSrc: pythonImg,
  },
  {
    id: 4,
    duration: '8 weeks',
    title: 'Digital Marketing with AI',
    rating: 4.8,
    enrolled: '81070 Enrolled',
    imageBg: 'bg-gradient-to-br from-purple-50 to-indigo-100',
    imageSrc: marketingImg,
  },
];

export default function CourseSection() {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth scroll handler
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Scroll track updates
  const onScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <section className="bg-sky-50 py-8 sm:py-12 px-4 sm:px-8 lg:px-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-left">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
            Upcoming certification courses
          </h2>
          <p className="text-gray-600 mt-1 text-xs sm:text-sm lg:text-base">
            Fastest way to build your CV
          </p>
        </div>

        {/* Responsive Cards Carousel */}
        <div
          ref={scrollRef}
          onScroll={onScroll}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="snap-start flex-shrink-0 w-[80%] sm:w-[280px] lg:w-[calc(25%-18px)] bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Image Container */}
              <div className={`h-36 sm:h-40 ${course.imageBg} p-4 flex items-center justify-center overflow-hidden`}>
                <img
                  src={course.imageSrc}
                  alt={course.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-gray-500 block mb-1.5 sm:mb-2">
                    {course.duration}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 leading-snug">
                    {course.title}
                  </h3>
                </div>

                <div className="mt-4 sm:mt-6">
                  {/* Rating & Stats */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-3 sm:mb-4">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-800">{course.rating}</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-500">{course.enrolled}</span>
                  </div>

                  {/* CTA */}
                  <a
                    href="#" 
                    className="pointer-events-none inline-flex items-center gap-1 text-xs font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Coming soon <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls Container */}
        <div className="mt-4 sm:mt-6 flex items-center justify-start">
          <div className="inline-flex items-center gap-3 bg-white px-3 py-1.5 sm:py-2 rounded-full shadow-sm border border-gray-100">
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Previous courses"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Custom Progress Track Bar */}
            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-sky-500 transition-all duration-150 rounded-full"
                style={{
                  width: '40%',
                  transform: `translateX(${scrollProgress * 1.5}%)`,
                }}
              />
            </div>

            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              aria-label="Next courses"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}