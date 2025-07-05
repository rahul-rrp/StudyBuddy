import React from "react";
import { useSelector } from "react-redux";
import signupImg from "../assets/Images/signup.webp";
import Template from "../Components/core/Auth/Template";

function Signup() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-richblack-800 to-richblack-900 flex items-center justify-center">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <Template
          title="Join the millions learning to code with StudyBuddy for free"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={signupImg}
          formType="signup"
        />
      )}
    </div>
  );
}

export default Signup;
