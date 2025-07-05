import React from "react";
import { Link } from "react-router-dom";
import { setProgress } from "../../../slices/loadingBarSlice";
import { useDispatch } from "react-redux";
import { ImSpinner2 } from "react-icons/im";

const Button = ({
  children,
  linkto = "/",
  active = false,
  isLoading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  size = "base", // "sm", "base", "lg"
  rounded = "md", // "md", "full"
  shadow = true,
  className = "",
}) => {
  const dispatch = useDispatch();

  // Tailwind size mappings
  const sizeClasses = {
    sm: "text-sm px-4 py-2",
    base: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const roundedClasses = {
    md: "rounded-md",
    full: "rounded-full",
  };

  const baseStyle = `
    inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-200
    transform hover:scale-95 
    ${shadow ? "shadow-md hover:shadow-lg" : ""}
    ${sizeClasses[size]} ${roundedClasses[rounded]}
    ${disabled || isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${active 
      ? "bg-gradient-to-r from-yellow-400 to-yellow-300 text-black" 
      : "bg-richblack-800 text-richblack-100 hover:bg-richblack-700"}
    ${className}
  `;

  return (
    <Link to={disabled || isLoading ? "#" : linkto} onClick={() => dispatch(setProgress(100))}>
      <button
        type="button"
        className={baseStyle}
        disabled={disabled || isLoading}
      >
        {isLoading ? (
          <>
            <ImSpinner2 className="animate-spin text-lg" />
            <span className="font-medium">Loading...</span>
          </>
        ) : (
          <>
            {iconLeft && <span className="text-[16px]">{iconLeft}</span>}
            <span>{children}</span>
            {iconRight && <span className="text-[16px]">{iconRight}</span>}
          </>
        )}
      </button>
    </Link>
  );
};

export default Button;
