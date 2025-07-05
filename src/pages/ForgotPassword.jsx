import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/operations/authAPI";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setEmailSent));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 px-4">
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="max-w-[500px] w-full rounded-lg p-6 md:p-8 bg-richblack-800 shadow-md">
          <h1 className="text-3xl font-semibold text-richblack-5 mb-3">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="text-richblack-200 text-base mb-6">
            {!emailSent
              ? "Have no fear. We'll email you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
              : `We have sent the reset link to: ${email}`}
          </p>

          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <div className="mb-4">
                <label className="block mb-2 text-sm text-richblack-5">
                  Email Address <sup className="text-pink-200">*</sup>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-md bg-richblack-700 text-richblack-5 placeholder:text-richblack-400 outline-none shadow-[0_1px_0_0] shadow-white/50"
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full py-3 rounded-md bg-yellow-50 text-richblack-900 font-semibold hover:bg-yellow-100 transition-all"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-6 text-sm">
            <Link
              to="/login"
              className="flex items-center text-richblack-100 hover:text-yellow-50 transition-all gap-2"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1.2em"
                width="1.2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z"></path>
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
