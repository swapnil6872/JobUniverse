import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Treanding() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      link: "https://tally.so/r/b5Ey2L?utm_source",
      image:
        "https://internshala-uploads.internshala.com/banner-images/home_new/fj_webinar_260726-student.png.webp",
      alt: "Future Jobs Webinar",
    },
    {
      link: "https://internshala.com/get_the_ppo_advantage_july26/?utm_source=banner&utm_medium=homepage",
      image:
        "https://internshala-uploads.internshala.com/banner-images/home_new/get_the_ppo_july26-student.png.webp",
      alt: "PPO Advantage",
    },
    {
      link: "https://connect.northeastern.edu/portal/global_study_expo_india?utm_medium=affiliate&utm_source=channel-partnership_intershala&utm_campaign=em-cvn-evg-int-comp-net-all-def-ffe-2026_08_08-india_study_expo&utm_content=intershala_banner",
      image:
        "https://internshala-uploads.internshala.com/banner-images/home_new/northeastern_university_expo_2026-student.png.webp",
      alt: "Northeastern University Expo",
    },
  ];

  const scroll = (direction) => {
    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = Math.max(currentIndex - 1, 0);
    } else {
      newIndex = Math.min(currentIndex + 1, banners.length - 1);
    }

    setCurrentIndex(newIndex);

    scrollRef.current?.scrollTo({
      left: newIndex * 316, // 300px width + 16px gap
      behavior: "smooth",
    });
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    scrollRef.current?.scrollTo({
      left: index * 316,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-[linear-gradient(180deg,_#e8f3ff_33.96%,_#fdfeff_79.87%)] ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 ">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 mb-6">
        Trending Now
      </h1>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto lg:grid lg:grid-cols-3 lg:gap-6 scrollbar-hide pb-2 scroll-smooth"
      >
        {banners.map((banner, index) => (
          <a
            key={index}
            href={banner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-[300px] sm:w-[350px] lg:w-auto overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={banner.image}
              alt={banner.alt}
              className="w-full h-auto object-cover"
            />
          </a>
        ))}
      </div>

      {/* Mobile Navigation */}
      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6 lg:hidden">
        <button
          onClick={() => scroll("left")}
          disabled={currentIndex === 0}
          className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? "w-6 h-2 bg-blue-600"
                  : "w-2 h-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          disabled={currentIndex === banners.length - 1}
          className="w-9 h-9 rounded-full border border-gray-300 bg-white flex items-center justify-center disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
    </div>
  );
}

export default Treanding;