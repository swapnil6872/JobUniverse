import React from 'react'
import Navbar from './Navbar'
import {  Outlet } from "react-router-dom";
import Footer from './Footer';
function MainLayout() {

  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer className='mt-auto'>
        <Footer />
      </footer>
    </div>
  )
}

export default MainLayout