import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (tab) => {
    setCurrentTab(tab);
    const filtered = HomePageExplore.find((section) => section.tag === tab);
    if (filtered) {
      setCourses(filtered.courses);
      setCurrentCard(filtered.courses[0].heading);
    }
  };

  return (
    <div className="relative w-full max-w-[1200px] mx-auto px-4 py-10">
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-semibold text-center">
        Unlock the <HighlightText text="Power of Code" />
      </h2>
      <p className="text-center text-richblack-300 text-[16px] mt-3">
        Learn to build anything you can imagine
      </p>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5">
        {tabsName.map((tab, index) => (
          <div
            key={index}
            onClick={() => setMyCards(tab)}
            className={`cursor-pointer rounded-full px-5 py-2 text-sm sm:text-base font-medium transition-all duration-200
              ${
                currentTab === tab
                  ? "bg-richblack-900 text-richblack-5"
                  : "bg-richblack-800 text-richblack-200 hover:bg-richblack-700 hover:text-richblack-5"
              }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Course Cards */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {courses.map((course, index) => (
          <CourseCard
            key={index}
            cardData={course}
            currentCard={currentCard}
            setCurrentCard={setCurrentCard}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMore;
