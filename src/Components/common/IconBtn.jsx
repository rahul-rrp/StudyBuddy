import React from 'react';
import { FiEdit } from "react-icons/fi";

const IconBtn = ({
  text = "Edit",
  onClick = () => {},
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 text-sm md:text-base font-semibold
        ${outline
          ? "border border-yellow-400 text-yellow-400 bg-transparent hover:bg-yellow-50 hover:text-richblack-900"
          : "bg-yellow-400 text-black hover:bg-yellow-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${customClasses}
      `}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        <>
          <span>{text}</span>
          <FiEdit />
        </>
      )}
    </button>
  );
};

export default IconBtn;
