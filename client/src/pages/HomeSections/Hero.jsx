import React from 'react'
import heroImage from "../../assets/homepage/banner/hero2.png";
import companiesImage from "../../assets/homepage/companies_strip.webp";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function Hero() {

  return (
        <div className="w-full overflow-hidden bg-zinc-950 ">
          
               {/* Hero Section */}
          <section className=" relative bg-gradient-to-br from-[#0B2A6B] via-[#1E4BB8] to-[#2A5FD6] ">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-20">
              <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                {/* Left */}
                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                    India's{" "}
                    <span className="text-yellow-400">#1 platform</span>
                  </h1>
    
                  <p className="mt-4 text-lg md:text-xl text-blue-100">
                    For fresher jobs, internships and courses
                  </p>
    
                  {/* Signup Card */}
                  <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl max-w-xl mx-auto lg:mx-0">
                    <p className="text-white font-semibold mb-5 hover: cursor-pointer"
                    onClick={() => window.dispatchEvent(new Event("open-login-modal"))}
                    >
                      Candidate Sign Up
                    </p>
    
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Google */}
                      <button
                        className="
                          flex-1
                          bg-white
                          text-gray-800
                          rounded-xl
                          py-3
                          font-semibold
                          flex
                          items-center
                          justify-center
                          gap-2
                          shadow-md
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:shadow-xl
                          group relative
                        "
                      >
                        <svg width="18" height="18" viewBox="0 0 48 48">
                          <path
                            fill="#FFC107"
                            d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-4z"
                          />
                          <path
                            fill="#FF3D00"
                            d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.5 5.1 29.6 3 24 3 16.1 3 9.3 7.5 6.3 14.7z"
                          />
                          <path
                            fill="#4CAF50"
                            d="M24 45c5.5 0 10.4-1.9 14.2-5.1l-6.6-5.4C29.6 36.4 27 37 24 37c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.2 40.4 16 45 24 45z"
                          />
                          <path
                            fill="#1976D2"
                            d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.6 5.4C41.5 36 44 30.5 44 24c0-1.4-.1-2.7-.4-3.5z"
                          />
                        </svg>
                                            <span className="absolute left-1/2 -translate-x-1/2 -top-6 mask-b-from-orange-400 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ComingSoon
                  </span>
                        Continue with Google
                      </button>
    
                      {/* Email */}
                      <button
                        className="
                          flex-1
                          bg-blue-600
                          text-white
                          rounded-xl
                          py-3
                          font-semibold
                          flex
                          items-center
                          justify-center
                          gap-2
                          shadow-md
                          transition-all
                          duration-300
                          hover:bg-blue-700
                          hover:-translate-y-1
                          hover:shadow-xl
                          group relative
                        "
                      >
                        <svg
                          width="18"
                          height="18"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="M2 7l10 6 10-6" />
                        </svg>
    
                        Continue with Email
                          <span className="absolute left-1/2 -translate-x-1/2 -top-6 mask-b-from-orange-400 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    ComingSoon
                  </span>
                      </button>
                    </div>
    
                    <p className="mt-5 text-xs text-blue-100">
                      By continuing as a candidate, you agree to our{" "}
                      <span className="cursor-pointer hover:text-yellow-400">
                        <Link to="/terms-and-conditions">Terms & Conditions</Link>
                      </span>
                    </p>
                  </div>
    
                  <button className="mt-8 text-white font-semibold hover:underline transition">
                    <Link to="/employee/register">    Employer Sign Up →</Link>
                
                  </button>
                </div>
    
                {/* Right */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <img
                    src={heroImage}
                    alt="JobUniverse Hero"
                    draggable="false"
                    className="
                      w-full
                      max-w-xl
                      lg:max-w-2xl
                      object-contain
                      drop-shadow-2xl
                      animate-bounce
                      [animation-duration:4s]
                      select-none
                      pointer-events-none
                    "
                  />
                </div>
              </div>
            </div>
          </section>
    
          {/* Company Strip */}
          <section className="bg-[#2A5FD6]  overflow-hidden py-5">
            <div
              className="
                flex
                w-max
                animate-[marquee_22s_linear_infinite]
                hover:[animation-play-state:paused]
              "
            >
              <img
                src={companiesImage}
                alt="Companies"
                className="w-[1200px] shrink-0"
              />
    
              <img
                src={companiesImage}
                alt="Companies"
                className="w-[1200px] shrink-0"
              />
            </div>
          </section>
         
        </div>
  )
}

export default Hero