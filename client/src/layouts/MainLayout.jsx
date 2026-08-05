import React from 'react'
import Navbar from './Navbar'
import {  Outlet } from "react-router-dom";
import Footer from './Footer';
function MainLayout() {

  return (
    <div className="min-h-screen flex flex-col">

      <header className="sticky top-0 z-50">
        <Navbar/>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className='mt-auto bg-red-500'>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout