import React from 'react';
import CTAButton from "../HomePage/Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
  position = "lg:flex-row",
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient = "bg-gradient-to-br from-yellow-400/10 to-transparent",
  codeColor = "text-yellow-50",
}) => {
  return (
    <div className={`flex ${position} flex-col lg:flex-row items-start justify-between gap-10 my-20`}>
      
      {/* ✨ Left Section - Text + Buttons */}
      <div className="flex flex-col gap-6 lg:w-1/2 px-4">
        {/* Heading */}
        <div className="text-2xl md:text-3xl font-extrabold text-white leading-snug">
          {heading}
        </div>

        {/* Subheading */}
        <p className="text-richblack-300 text-sm md:text-lg font-medium">
          {subheading}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* 💻 Right Section - Code Block */}
      <div className="relative w-full lg:w-[520px] bg-richblack-800 rounded-md shadow-lg overflow-hidden glass border border-richblack-700">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 z-0 ${backgroudGradient}`} />

        <div className="relative flex flex-row text-sm font-mono z-10 overflow-x-auto p-4">
          {/* Line Numbers */}
          <div className="text-richblack-400 pr-4 select-none text-right min-w-[30px] leading-6 font-semibold">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Animated Code */}
          <div className={`pl-2 ${codeColor} whitespace-pre-wrap`}>
            <TypeAnimation
              sequence={[codeblock, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                display: "block",
                overflowX: "hidden",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
