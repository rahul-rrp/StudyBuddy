import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsLightningChargeFill } from "react-icons/bs";
import { TbCornerDownRightDouble } from "react-icons/tb";

import loginImg from "../assets/Images/login.webp";
import Template from "../Components/core/Auth/Template";
import { login } from "../services/operations/authAPI";

function Login() {
  const [showDemo, setShowDemo] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-richblack-800 to-richblack-900 flex items-center justify-center relative overflow-hidden">
      
      {/* 🔰 Demo Login Box */}
      {showDemo && (
        <div className="absolute z-20 top-32 right-[5%] md:right-[10%] bg-richblack-700 border border-richblack-500 px-6 py-4 rounded-xl shadow-xl rotate-[-4deg]">
          <div className="relative flex flex-col gap-4">
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowDemo(false)}
              className="absolute -top-3 -right-3 bg-richblack-600 text-white rounded-full w-7 h-7 flex items-center justify-center hover:scale-105"
              title="Close"
            >
              ✕
            </button>

            <p className="text-xl font-bold text-yellow-50 flex items-center gap-2">
              Take a Demo <BsLightningChargeFill size={20} />
            </p>

            <div className="flex flex-col gap-3 mt-1">
              <button
                onClick={() =>
                  dispatch(login("rp2628336@gmail.com", "12345", navigate))
                }
                className="bg-yellow-100 hover:bg-yellow-200 text-richblack-900 font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-sm"
              >
                <TbCornerDownRightDouble className="text-xl hidden md:block" />
                Instructor Demo
              </button>

              <button
                onClick={() =>
                  dispatch(login("1234@gmail.com", "12345", navigate))
                }
                className="bg-yellow-100 hover:bg-yellow-200 text-richblack-900 font-semibold px-4 py-2 rounded-md flex items-center justify-center gap-2 shadow-sm"
              >
                <TbCornerDownRightDouble className="text-xl hidden md:block" />
                Student Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🧾 Login Form Template */}
      <Template
        title="Welcome Back"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={loginImg}
        formType="login"
      />
    </div>
  );
}

export default Login;
