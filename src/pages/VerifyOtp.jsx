import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, signupData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      accountType,
      confirmPassword,
      password,
      lastName,
      firstName,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-richblack-900">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full flex items-center justify-center bg-gradient-to-b from-richblack-800 to-richblack-900 px-4">
      <div className="max-w-[500px] w-full p-6 md:p-10 bg-richblack-800 rounded-xl shadow-lg border border-richblack-700">
        <h1 className="text-richblack-5 font-semibold text-3xl mb-2">
          Verify Email
        </h1>
        <p className="text-richblack-100 text-base mb-6">
          A verification code has been sent to your email. Enter the code below.
        </p>

        <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
          <label htmlFor="otp" className="text-sm text-richblack-100">
            Enter 6-digit OTP
          </label>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            isInputNum
            shouldAutoFocus
            inputStyle="w-[44px] md:w-[48px] h-[48px] rounded-lg bg-richblack-700 border border-richblack-600 text-2xl text-center text-richblack-5"
            containerStyle="flex justify-between gap-2"
            focusStyle="border-yellow-50 outline-none"
            renderSeparator={<span className="text-richblack-300">-</span>}
            renderInput={(props) => <input {...props} />}
          />

          <button
            type="submit"
            className="bg-yellow-50 text-richblack-900 font-semibold py-3 rounded-md transition duration-300 hover:opacity-90"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
