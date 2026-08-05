import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import skillindia from "../../assets/homepage/logos/skill-india.png"
import iit from "../../assets/homepage/logos/iitmadras.png"
import mesc from "../../assets/homepage/logos/MESC.png"
import nielet from "../../assets/homepage/logos/Nielet-Logo.png"
import nsdc from "../../assets/homepage/logos/nsdc.png"
import AICTE from "../../assets/homepage/logos/AICTE.png"

const stories = [
  {
    title: 'Go-to platform for students and freshers',
    text: "I landed my first internship from Internshala! This app has opportunities for every student and is a must-have for students looking to build their careers.",
    name: 'Yogesh Singh',
    placement: 'Placed in Flipkart',
    initials: 'YS',
    avatarBg: 'bg-orange-100 text-orange-700',
  },
  {
    title: 'Got my dream job at Amazon!',
    text: "I applied to Amazon and got the job! It was my dream. I wanted to get into tech but I was from an electrical background. I learned the skills, which came in handy in my interviews. Thanks to Internshala, I was able to explain the concepts and applications well. They helped me with everything.",
    name: 'Yaswanth Mandapati',
    placement: 'Placed in Amazon',
    initials: 'YM',
    avatarBg: 'bg-amber-100 text-amber-700',
  },
  {
    title: 'Turning doubts into success',
    text: "I had no idea how to enter the corporate world, what kind of job would be a good fit for me, or where to even start. Internshala guided me through the entire process, helping me build the right skills and confidence. Thanks to their support and resources, I was able to secure an internship, which eventually led to a job offer from Flipkart.",
    name: 'Pankaj',
    placement: 'Placed in Star Health and Allied Insurance Co. Ltd',
    initials: 'P',
    avatarBg: 'bg-zinc-200 text-zinc-700',
  },
  {
    title: 'Turning doubts into success',
    text: "I had no idea how to enter the corporate world, what kind of job would be a good fit for me, or where to even start. Internshala guided me through the entire process, helping me build the right skills and confidence. Thanks to their support and resources, I was able to secure an internship, which eventually led to a job offer from Flipkart.",
    name: 'Pankaj',
    placement: 'Placed in Star Health and Allied Insurance Co. Ltd',
    initials: 'P',
    avatarBg: 'bg-zinc-200 text-zinc-700',
  },
  {
    title: 'Turning doubts into success',
    text: "I had no idea how to enter the corporate world, what kind of job would be a good fit for me, or where to even start. Internshala guided me through the entire process, helping me build the right skills and confidence. Thanks to their support and resources, I was able to secure an internship, which eventually led to a job offer from Flipkart.",
    name: 'Pankaj',
    placement: 'Placed in Star Health and Allied Insurance Co. Ltd',
    initials: 'P',
    avatarBg: 'bg-zinc-200 text-zinc-700',
  },
  {
    title: 'Turning doubts into success',
    text: "I had no idea how to enter the corporate world, what kind of job would be a good fit for me, or where to even start. Internshala guided me through the entire process, helping me build the right skills and confidence. Thanks to their support and resources, I was able to secure an internship, which eventually led to a job offer from Flipkart.",
    name: 'Pankaj',
    placement: 'Placed in Star Health and Allied Insurance Co. Ltd',
    initials: 'P',
    avatarBg: 'bg-zinc-200 text-zinc-700',
  },
]

const partners = [
  { name: 'Skill India', logo: skillindia },
  { name: 'NSDC', logo: nsdc },
  { name: 'IIT Madras', logo: iit },
  { name: 'MESC', logo: mesc },
  { name: 'NIELIT', logo: nielet },
  { name: 'AICTE', logo: AICTE },
]

// Breakpoints for how many cards are visible at once
function useVisibleCards() {
  const [visible, setVisible] = useState(3)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      if (w < 640) setVisible(1)        // mobile: 1 card
      else if (w < 1024) setVisible(2)  // tablet: 2 cards
      else setVisible(3)                // desktop: 3 cards
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return visible
}

function Stories() {
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const visibleCards = useVisibleCards()
  const GAP = 20

  const getCardStep = () => {
    const el = scrollRef.current
    if (!el || !el.firstChild) return 0
    const card = el.firstChild
    const style = window.getComputedStyle(el)
    const gap = parseFloat(style.columnGap || style.gap || '0')
    return card.offsetWidth + gap
  }

  const updateProgress = () => {
    const el = scrollRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const progress = maxScroll <= 0 ? 0 : el.scrollLeft / maxScroll
    setScrollProgress(progress)
    setAtStart(el.scrollLeft <= 4)
    setAtEnd(el.scrollLeft >= maxScroll - 4)
  }

  useEffect(() => {
    updateProgress()
  }, [visibleCards])

  const scrollByCards = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const step = getCardStep()
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(180deg,_#e8f3ff_33.96%,_#fdfeff_79.87%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900">
          28,48,723 + placements - read their stories
        </h1>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onScroll={updateProgress}
          className="flex flex-row gap-4 sm:gap-5 mt-6 sm:mt-8 overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
          }}
        >
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 flex flex-col justify-between shrink-0 overflow-y-auto scrollbar-hide"
              style={{
                width: `calc((100% - ${(visibleCards - 1) * GAP}px) / ${visibleCards})`,
                scrollSnapAlign: 'start',
              }}
            >
              <div>
                <h2 className="text-base sm:text-lg font-semibold text-zinc-900 mb-2 sm:mb-3">
                  {story.title}
                </h2>
                <p className="text-sm sm:text-[15px] leading-6 text-zinc-500">
                  {story.text}
                </p>
              </div>

              <div className="flex items-center gap-3 mt-5 sm:mt-6">
                <div
                  className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-semibold text-sm shrink-0 ${story.avatarBg}`}
                >
                  {story.initials}
                </div>
                <div>
                  <h4 className="text-sm sm:text-[15px] font-semibold text-zinc-900">
                    {story.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 leading-tight">
                    {story.placement}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination control */}
        <div className="flex items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
          <button
            onClick={() => scrollByCards(-1)}
            disabled={atStart}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 hover:text-zinc-700 hover:border-zinc-300 disabled:opacity-30 disabled:hover:text-zinc-400 disabled:hover:border-zinc-200 transition-colors"
          >
            <ChevronLeft size={16} className="sm:hidden" />
            <ChevronLeft size={18} className="hidden sm:block" />
          </button>

          <div className="w-24 sm:w-32 h-1.5 bg-zinc-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
            />
          </div>

          <button
            onClick={() => scrollByCards(1)}
            disabled={atEnd}
            className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-700 hover:border-zinc-300 disabled:opacity-30 transition-colors"
          >
            <ChevronRight size={16} className="sm:hidden" />
            <ChevronRight size={18} className="hidden sm:block" />
          </button>
        </div>

        {/* Partner logos */}
        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-8 mt-8 sm:mt-10">
          <h1 className="text-lg sm:text-xl font-bold text-zinc-900 mb-6 sm:mb-8">
            Proud partner of leading government bodies
          </h1>

          {/* Mobile/tablet: wrapping grid, no dividers */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-y-6 gap-x-2 md:hidden">
            {partners.map((partner, index) => (
              <div key={index} className="flex flex-col items-center px-2">
                <div className="h-10 flex items-center justify-center mb-2">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-10 max-w-[70px] object-contain"
                  />
                </div>
                <p className="text-xs sm:text-sm text-zinc-800 text-center whitespace-nowrap">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop: evenly spaced row with dividers */}
          <div className="hidden md:flex justify-between items-start">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center px-6 lg:px-8">
                  <div className="h-14 flex items-center justify-center mb-3">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-14 max-w-[90px] object-contain"
                    />
                  </div>
                  <p className="text-base text-zinc-800 whitespace-nowrap">
                    {partner.name}
                  </p>
                </div>
                {index !== partners.length - 1 && (
                  <div className="w-px h-14 bg-zinc-200" />
                )}
              </div>
            ))}
          </div>
        </div>
              <h1 className="mt-9 sm:mt-10 md:mt-12 text-center lg:text-left text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-zinc-900 leading-tight px-auto lg:px-0">
                  Empower your career with Universeshala today
              </h1>
      </div>
    </div>
  )
}

export default Stories