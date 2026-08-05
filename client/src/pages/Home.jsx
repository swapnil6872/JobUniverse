import React from "react";
import Hero from "./HomeSections/Hero";
import Stories from "./HomeSections/Stories";
import Treanding from "./HomeSections/Treanding";
import FresherJobsCategory from '../components/FresherJobsCategory';
import CourseSection from "./HomeSections/CourseSection";
const Home = () => {
  return (
    <>
      <Hero />
      <Treanding />
      <FresherJobsCategory />
      <CourseSection />
      <Stories />
    </>
  );
};

export default Home;