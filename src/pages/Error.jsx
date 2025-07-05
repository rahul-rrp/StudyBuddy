import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Error = () => {
  return (
    <div className="w-screen h-screen bg-richblack-800 flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        className="text-6xl md:text-8xl font-extrabold text-yellow-50 mb-4"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-2xl md:text-3xl font-semibold text-richblue-5 mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Oops! Page not found
      </motion.p>

      <motion.p
        className="text-richblack-300 max-w-md text-base mb-8"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        The page you're looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          to="/"
          className="px-6 py-3 rounded-md bg-yellow-50 text-black font-semibold hover:bg-yellow-100 transition-all duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Error;
