import React from 'react';
import { motion } from 'framer-motion';
import HighlightText from '../Components/core/HomePage/HighlightText';
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../Components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from '../Components/core/AboutPage/Stats';
import LearningGrid from '../Components/core/AboutPage/LearningGrid';
import ContactFormSection from '../Components/core/AboutPage/ContactFormSection';
import RatingSlider from '../Components/core/Ratings/RatingSlider';

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.8, ease: 'easeOut' },
  }),
};

const About = () => {
  return (
<div className="mx-auto text-white overflow-x-hidden bg-gradient-to-b from-[#1F1C2C] via-[#928DAB] to-[#1F1C2C]">


      {/* Hero Section */}
      <section className="py-24 relative z-10">
        <motion.div
          className="text-center mx-auto w-11/12 max-w-maxContent"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Driving Innovation in Online Education for a <br />
            <HighlightText text="Brighter Future" />
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-richblack-300 font-medium">
            StudyBuddy is redefining online learning by combining world-class content, cutting-edge technology, and a thriving learner community.
          </p>
        </motion.div>

        <motion.div
          className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-full max-w-5xl px-4 grid grid-cols-3 gap-4"
          variants={fadeInVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {[BannerImage1, BannerImage2, BannerImage3].map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`about-img-${idx}`}
              className="rounded-lg shadow-xl object-cover h-[110px] sm:h-[140px] lg:h-[180px] transition-transform duration-300 hover:scale-105"
            />
          ))}
        </motion.div>
        <div className="h-[150px]" />
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-richblack-900 border-b border-richblack-700">
        <motion.div
          className="w-11/12 max-w-maxContent mx-auto"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <Quote />
        </motion.div>
      </section>

      {/* Founding Story / Vision / Mission */}
      <section className="py-24">
        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-20">

          {/* Founding Story */}
          <motion.div
            className="flex flex-col-reverse lg:flex-row gap-10 items-center"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <div className="lg:w-1/2 flex flex-col gap-6">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]">
                Our Founding Story
              </h2>
              <p className="text-richblack-300 leading-relaxed">
                StudyBuddy was born from a dream to make high-quality education accessible for all. Created by educators and technologists, it challenges traditional, rigid learning models.
              </p>
              <p className="text-richblack-300 leading-relaxed">
                We believe education should be flexible and borderless, enabling learners from anywhere to thrive.
              </p>
            </div>
            <div className="lg:w-1/2">
              <img
                src={FoundingStory}
                alt="Founding Story"
                className="rounded-lg shadow-[0_0_30px_0] shadow-[#FC6767]"
              />
            </div>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            className="flex flex-col lg:flex-row gap-12"
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]">
                Our Vision
              </h2>
              <p className="text-richblack-300 leading-relaxed mt-3">
                To become a global leader in digital education—empowering learners to grow on their own terms, wherever they are.
              </p>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
                Our Mission
              </h2>
              <p className="text-richblack-300 leading-relaxed mt-3">
                To build an engaging, collaborative learning ecosystem where curiosity thrives through real-time mentorship and community support.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-richblack-800 py-16">
        <StatsComponent />
      </section>

      {/* Learning Grid + Contact */}
      <section className="bg-gradient-to-b from-richblack-800 to-richblack-900 py-24 px-2">
        <motion.div
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <LearningGrid />
        </motion.div>
        <motion.div
          className="mt-16"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <ContactFormSection />
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="bg-richblack-900 py-20">
        <motion.div
          className="w-11/12 max-w-maxContent mx-auto text-center"
          variants={fadeInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <h2 className="text-4xl font-semibold text-richblack-5 mb-8">
            What Learners Are Saying
          </h2>
          <RatingSlider />
        </motion.div>
      </section>
    </div>
  );
};

export default About;
