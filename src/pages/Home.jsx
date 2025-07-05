import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProgress } from "../slices/loadingBarSlice";
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';

// Core Components
import CTAButton from '../Components/core/HomePage/Button';
import HighlightText from '../Components/core/HomePage/HighlightText';
import CodeBlocks from "../Components/core/HomePage/CodeBlocks";
import TimelineSection from '../Components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../Components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../Components/core/HomePage/InstructorSection';
import ExploreMore from '../Components/core/HomePage/ExploreMore';
import CourseSlider from '../Components/core/Catalog/CourseSlider';
import RatingSlider from '../Components/core/Ratings/RatingSlider';

// Assets
import Banner from "../assets/Images/banner.mp4";

const Home = () => {
  const dispatch = useDispatch();
  const [CatalogPageData, setCatalogPageData] = useState(null);
  const categoryID = "6475dbeb49dcc886b5698441";

  useEffect(() => {
    const fetchCatalogPageData = async () => {
      const result = await getCatalogaPageData(categoryID, dispatch);
      setCatalogPageData(result);
    };
    fetchCatalogPageData();
  }, [categoryID, dispatch]);

  return (
    <div className="text-white bg-gradient-to-b from-[#0F0C29] via-[#302b63] to-[#24243e] overflow-x-hidden">
      
      {/* 🚀 Hero Section */}
      <section className="w-11/12 max-w-maxContent mx-auto py-16 text-center flex flex-col items-center">
        <Link onClick={() => dispatch(setProgress(100))} to="/signup">
          <div className="group bg-richblack-800 hover:scale-95 transition-all rounded-full px-6 py-2 text-sm font-bold">
            <div className="flex items-center gap-2 group-hover:bg-richblack-900 rounded-full px-4 py-1">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <h1 className="text-3xl md:text-5xl font-semibold mt-8">
          Empower Your Future With <HighlightText text="Coding Skills" />
        </h1>

        <p className="mt-4 max-w-[700px] text-richblack-300 text-sm md:text-lg font-medium">
          With our online coding courses, learn at your own pace from anywhere in the world with hands-on projects and personalized feedback.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          <CTAButton active linkto="/signup">Learn More</CTAButton>
          <CTAButton linkto="/login">Book a Demo</CTAButton>
        </div>

        <div className="relative mt-12 w-[80%] max-w-4xl rounded-md shadow-lg">
          <video className="rounded-md" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </section>

      {/* 💻 Code Blocks */}
      <CodeBlocks
        position="lg:flex-row"
        heading={<span className="text-2xl lg:text-4xl font-semibold">Unlock Your <HighlightText text="coding potential" /> with our online courses</span>}
        subheading="Courses designed and taught by industry experts to help you succeed."
        ctabtn1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
        ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a></nav>`}
        codeColor="white"
        backgroudGradient="grad"
      />

      {/* 🔥 Popular Courses */}
      <section className="w-full max-w-maxContent mx-auto px-4 py-12">
        <h2 className="section_heading mb-6 text-xl md:text-3xl">Most Popular Courses</h2>
        <CourseSlider Courses={CatalogPageData?.selectedCourses} />
      </section>

      {/* 🎓 Students Are Learning */}
      <section className="w-full max-w-maxContent mx-auto px-4 py-12">
        <h2 className="section_heading mb-6 text-xl md:text-3xl">Students Are Learning</h2>
        <CourseSlider Courses={CatalogPageData?.differentCourses} />
      </section>

      {/* ⚡ Code Block 2 */}
      <CodeBlocks
        position="lg:flex-row-reverse"
        heading={<span className="text-4xl font-semibold">Start <HighlightText text="coding in seconds" /></span>}
        subheading="Hands-on learning starts immediately with real code lessons."
        ctabtn1={{ btnText: "Continue Lesson", linkto: "/signup", active: true }}
        ctabtn2={{ btnText: "Learn More", linkto: "/login", active: false }}
        codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a> <a href="two/">Two</a> <a href="three/">Three</a></nav>`}
        codeColor="text-yellow-25"
        backgroudGradient="grad2"
      />

      <ExploreMore />

      {/* 📢 Career CTA */}
      <section className="homepage_bg text-white py-24">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center gap-6">
          <h2 className="text-center text-4xl font-semibold max-w-[600px]">
            Get the Skills you need for a <HighlightText text="Job that is in demand" />
          </h2>
          <p className="text-richblack-300 text-lg max-w-[600px] text-center">
            StudyBuddy helps you gain skills beyond coding—communication, critical thinking, and real-world projects.
          </p>
          <div className="flex flex-wrap gap-6 mt-6">
            <CTAButton active linkto="/catalog/Web Development">Explore Full Catalog</CTAButton>
            <CTAButton linkto="/signup">Learn More</CTAButton>
          </div>
        </div>
      </section>

      {/* 📚 Timeline / Languages / Instructors */}
      <section className="bg-pure-greys-5 text-richblack-700 py-16">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-12">
          <TimelineSection />
          <LearningLanguageSection />
          <InstructorSection />
        </div>
      </section>

      {/* 🌟 Reviews */}
      <section className="bg-richblack-900 text-white py-20">
        <div className="w-11/12 max-w-maxContent mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Reviews from other learners</h2>
          <RatingSlider />
        </div>
      </section>
    </div>
  );
};

export default Home;
