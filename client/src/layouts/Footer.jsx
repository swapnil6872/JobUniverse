import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import playStore from "../assets/img/playstore.svg";
import appStore from "../assets/img/appstore.svg";

function Footer() {
  return (
    <footer className="bg-[#333333] text-white text-sm">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-8 border-b border-gray-600">
          <div className="flex flex-col gap-3">
            <Link>About us</Link>
            <Link>We're hiring</Link>
            <Link>Hire Interns for your company</Link>
            <Link>Post a job</Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link>Team Diary</Link>
            <Link>Blog</Link>
            <Link>Our Services</Link>
            <Link>Free Job Alert</Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link>Terms & Conditions</Link>
            <Link>Privacy</Link>
            <Link>Contact Us</Link>
            <Link>Resume Maker</Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link>Sitemap</Link>
            <Link>College TPO</Link>
            <Link>List of Companies</Link>
            <Link>Jobs For Women</Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6">

          {/* Left */}
          <div className="flex flex-col sm:flex-row items-center gap-5">

            <div className="flex gap-3">
              <Link>
                <img
                  src={playStore}
                  alt="Play Store"
                  className="w-32 h-auto"
                />
              </Link>

              <Link>
                <img
                  src={appStore}
                  alt="App Store"
                  className="w-32 h-auto"
                />
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link className="hover:text-[#00A5EC] transition-colors">
                <Instagram size={20} />
              </Link>

              <Link className="hover:text-[#00A5EC] transition-colors">
                <Facebook size={20} />
              </Link>

              <Link className="hover:text-[#00A5EC] transition-colors">
                <Twitter size={20} />
              </Link>

              <Link className="hover:text-[#00A5EC] transition-colors">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-center text-xs sm:text-sm text-gray-300">
            © 2025 JobUniverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer