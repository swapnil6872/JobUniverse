import React from 'react'
import { Link } from 'react-router-dom'
import{Instagram ,Facebook,Twitter,Linkedin } from 'lucide-react'

function Footer() {
  return (
    
    <footer className='bg-[#333333] text-white font-[400] line-height[1.14] text-[14px]'>
      <div className='flex flex-col justify-between items-center max-w-7xl mx-auto px-4 py-6'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6 w-full mb-6'>
          <div className='flex flex-col gap-2'>
              <Link>About us</Link>
              <Link>We're hiring</Link>
              <Link>Hire Interns for your company</Link>
              <Link>Post a job</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Link>Team Diary</Link>
            <Link>Blog</Link>
            <Link>Our Services</Link>
            <Link>Free job Alert</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Link>Terms & Conditions</Link>
            <Link>Privicy</Link>
            <Link>Contact Us</Link>
            <Link>Resume Maker</Link>
          </div>
          <div className='flex flex-col gap-2'>
            <Link>Sitemap</Link>
            <Link>Collage TPO</Link>
            <Link>List of Companies</Link>
            <Link>Jobs For Woman</Link>
          </div>
        </div>

         {/* second section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 w-full border-t pt-4'>
          <div className='flex items-center gap-4'>
            <Link> <img src="../src/assets/img/playstore.svg" alt="Play Store"  className='w-32 h-10 object-contain'/> </Link>
            <Link> <img src="../src/assets/img/appstore.svg" alt="App Store" className='w-32 h-10 object-contain'/> </Link>
            <Link><Instagram/></Link>
            <Link><Facebook/></Link>
            <Link><Twitter/></Link>
            <Link><Linkedin/></Link>
          </div>
          <div className='flex items-center'>
            <p> &copy; Copyright © 2025 JobUniverse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer