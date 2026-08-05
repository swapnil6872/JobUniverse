import React, { useState } from "react";

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      title: "Must-have app for students",
      content:
        "I got my first internship from here. JobUniverse is a must for career oriented students. This app has a lot of opportunities for every kind of students.",
      author: "Yogesh Singh",
      rating: 4,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 2,
      title: "I landed a job at Amazon",
      content:
        "I applied to Amazon and got the job! It was my dream. I wanted to get in tech but I was from electrical background. My friend suggested Data Science Placement Guarantee Course. In the course, I learnt SQL, Python, Tableau & worked on a lot of projects which came in handy in my interviews. I was able to explain the concepts and applications well. The placement team helped me with everything.",
      author: "Yaswanth Mandapati",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: 3,
      title: "Switched career with 100% hike",
      content:
        "The courses offered here are structured so well. I was able to transition from a non-tech support role to a Full Stack Developer position smoothly.",
      author: "Priya Sharma",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#eff6ff] py-12 px-4 sm:px-6 lg:px-12 w-full flex justify-center ">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Call to Action & Play Store Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quote Icon Bubble */}
          <div className="w-12 h-12 rounded-full bg-[#dbeafe] flex items-center justify-center text-[#2563eb]">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Join the pool of 21Mn+ students and get started with your career
          </h2>

          {/* Rating Block */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-1">
              PLAY STORE RATINGS
            </span>
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1d4ed8]">
                4.4
              </span>
              <div className="flex flex-col">
                <div className="flex text-amber-400">
                  {"★".repeat(4)}
                  <span className="text-amber-300">★</span>
                </div>
                <span className="text-xs font-semibold text-gray-500">
                  (42K Reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Download App Button */}
          <div>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#1e293b] hover:bg-[#0f172a] text-white px-5 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg cursor-pointer"
            >
              {/* Play Store SVG */}
              <svg className="w-6 h-6 shrink-0 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186c-.185-.18-.36-.452-.36-.836V2.65c0-.384.175-.656.359-.836zM15.206 13.414l2.422 2.422-12.87 7.354 10.448-9.776zM15.206 10.586L4.758.81 17.628 8.164l-2.422 2.422zM16.62 12l2.986-1.706c.64-.366.64-.962 0-1.328L16.62 12z" />
              </svg>
              <div className="text-left">
                <span className="text-sm font-bold block leading-none">
                  Get it on Google Play
                </span>
              </div>
              <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Cards Carousel */}
        <div className="lg:col-span-7 relative">
          
          {/* Carousel Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Testimonial"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 shadow-md flex items-center justify-center hover:bg-gray-50 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Testimonial"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-blue-500 text-blue-600 shadow-md flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            
            {/* Visible Cards */}
            {testimonials
              .slice(currentIndex, currentIndex + 2)
              .concat(
                testimonials.slice(
                  0,
                  Math.max(0, currentIndex + 2 - testimonials.length)
                )
              )
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-100 flex flex-col justify-between h-[360px] sm:h-[340px] transition-all duration-300 hover:shadow-md"
                >
                  {/* Card Main Body */}
                  <div className="space-y-3 overflow-y-auto pr-1">
                    <h3 className="font-bold text-gray-900 text-lg sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Card Footer Profile */}
                  <div className="pt-4 mt-2 border-t border-gray-50 flex items-center gap-3 shrink-0">
                    <img
                      src={item.avatar}
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs sm:text-sm">
                        {item.author}
                      </h4>
                      <div className="flex text-amber-400 text-xs">
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;