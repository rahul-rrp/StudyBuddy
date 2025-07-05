import React from 'react';
import ContactUsForm from '../Components/contactUs/ContactUsForm';
import { motion } from 'framer-motion';

const ContactUs = () => {
  return (
    <div className="text-white">

      {/* Contact Section */}
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col gap-10 lg:flex-row">
        
        {/* Left - Contact Info */}
        <motion.div
          className="lg:w-[40%]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            {/* Chat on us */}
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
              <div className="flex items-center gap-3">
                <svg height="25" width="25" viewBox="0 0 24 24"><path fill="currentColor" d="..."/></svg>
                <h2 className="text-lg font-semibold text-richblack-5">Chat with us</h2>
              </div>
              <p className="font-medium">Our friendly team is here to help.</p>
              <p className="font-semibold">info@studybuddy.com</p>
            </div>

            {/* Visit us */}
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
              <div className="flex items-center gap-3">
                <svg height="25" width="25" viewBox="0 0 24 24"><path fill="currentColor" d="..."/></svg>
                <h2 className="text-lg font-semibold text-richblack-5">Visit us</h2>
              </div>
              <p className="font-medium">Say hello at our HQ.</p>
              <p className="font-semibold">Akshya Nagar, Rammurthy Nagar, Bangalore - 560016</p>
            </div>

            {/* Call us */}
            <div className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200">
              <div className="flex items-center gap-3">
                <svg height="25" width="25" viewBox="0 0 512 512"><path fill="currentColor" d="..."/></svg>
                <h2 className="text-lg font-semibold text-richblack-5">Call us</h2>
              </div>
              <p className="font-medium">Mon - Fri from 8am to 5pm</p>
              <p className="font-semibold">+91 6366 000 666</p>
            </div>
          </div>
        </motion.div>

        {/* Right - Contact Form */}
        <motion.div
          className="lg:w-[60%]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="border border-richblack-600 rounded-xl p-7 lg:p-14 flex flex-col gap-5 bg-richblack-900">
            <h1 className="text-4xl font-semibold leading-10 text-richblack-5">
              Got an idea? We've got the skills.
              <br />
              <span className="text-yellow-50">Let’s team up.</span>
            </h1>
            <p className="text-lg font-medium text-richblack-300">
              Tell us more about yourself and what you’ve got in mind.
            </p>
            <div className="mt-6">
              <ContactUsForm />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Section Transition or SVG Wave (optional) */}
      <div className="my-16 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full" preserveAspectRatio="none">
          <path
            fill="#161D29"
            d="M0,256L60,240C120,224,240,192,360,165.3C480,139,600,117,720,133.3C840,149,960,203,1080,197.3C1200,192,1320,128,1380,96L1440,64V320H0Z"
          />
        </svg>
      </div>

      {/* Reviews Section */}
      <motion.div
        className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center text-4xl font-semibold">Reviews from other learners</h2>
        {/* ⬇️ You can embed <RatingSlider /> or other components here */}
      </motion.div>
    </div>
  );
};

export default ContactUs;
