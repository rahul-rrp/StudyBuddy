import React, { useState } from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaYoutube,
  FaSun,
  FaMoon,
} from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  const [language, setLanguage] = useState("en");
  const [email, setEmail] = useState("");
  const [darkMode, setDarkMode] = useState(true);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail("");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="bg-gradient-to-br from-richblack-900 via-richblack-800 to-indigo-900 text-richblack-300">
      {/* Top Section */}
      <div className="w-11/12 max-w-maxContent mx-auto py-14">
        <div className="flex flex-col lg:flex-row justify-between gap-10 border-b border-richblack-600 pb-10">
          {/* Left Sections */}
          <div className="lg:w-[50%] flex flex-wrap justify-between gap-8">
            {/* Company Info */}
            <div className="w-[45%] lg:w-[30%]">
              <img src={Logo} alt="logo" className="w-36 mb-4" />
              <h1 className="text-white font-semibold text-[16px]">Company</h1>
              <div className="flex flex-col gap-2 mt-2">
                {["About", "Careers", "Affiliates"].map((ele, i) => (
                  <Link
                    to={ele.toLowerCase()}
                    key={i}
                    className="text-sm hover:text-white transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 text-xl mt-4 text-richblack-300">
                <FaFacebook className="hover:text-[#1877F2]" />
                <FaGoogle className="hover:text-[#EA4335]" />
                <FaTwitter className="hover:text-[#1DA1F2]" />
                <FaYoutube className="hover:text-[#FF0000]" />
              </div>
            </div>

            {/* Resources */}
            <div className="w-[45%] lg:w-[30%]">
              <h1 className="text-white font-semibold text-[16px]">Resources</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Resources.map((ele, index) => (
                  <Link
                    to={ele.split(" ").join("-").toLowerCase()}
                    key={index}
                    className="text-sm hover:text-white transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-white font-semibold text-[16px] mt-6">Support</h1>
              <Link
                to="/help-center"
                className="text-sm mt-2 hover:text-white transition"
              >
                Help Center
              </Link>
            </div>

            {/* Plans */}
            <div className="hidden md:block w-full lg:w-[30%]">
              <h1 className="text-white font-semibold text-[16px]">Plans</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Plans.map((ele, index) => (
                  <Link
                    to={ele.split(" ").join("-").toLowerCase()}
                    key={index}
                    className="text-sm hover:text-white transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>

              <h1 className="text-white font-semibold text-[16px] mt-6">Community</h1>
              <div className="flex flex-col gap-2 mt-2">
                {Community.map((ele, index) => (
                  <Link
                    to={ele.split(" ").join("-").toLowerCase()}
                    key={index}
                    className="text-sm hover:text-white transition"
                  >
                    {ele}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Links */}
          <div className="hidden lg:flex flex-wrap justify-between gap-8 lg:w-[50%]">
            {FooterLink2.map((section, i) => (
              <div key={i} className="w-[45%] lg:w-[30%]">
                <h1 className="text-white font-semibold text-[16px]">{section.title}</h1>
                <div className="flex flex-col gap-2 mt-2">
                  {section.links.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.link}
                      className="text-sm hover:text-white transition"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col md:flex-row items-center gap-3 w-full md:w-[60%]"
          >
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email to subscribe"
              className="bg-richblack-700 border border-richblack-600 rounded-md px-4 py-2 w-full text-white placeholder:text-sm placeholder:text-richblack-400"
            />
            <button
              type="submit"
              className="bg-yellow-50 text-black px-4 py-2 rounded-md hover:scale-95 transition-all font-semibold"
            >
              Subscribe
            </button>
          </form>

          {/* Language & Theme */}
          <div className="flex gap-4 items-center">
            {/* 🌐 Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-richblack-700 text-white px-3 py-2 rounded-md border border-richblack-600"
            >
              <option value="en">🌐 English</option>
              <option value="hi">🇮🇳 Hindi</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
            </select>

            {/* 🌓 Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-white bg-richblack-700 border border-richblack-600 p-2 rounded-md hover:bg-richblack-600 transition"
              title="Toggle theme"
            >
              {darkMode ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-11/12 max-w-maxContent mx-auto pb-6 pt-4 flex flex-col lg:flex-row justify-between items-center border-t border-richblack-700 text-xs text-richblack-400">
        {/* Links */}
        <div className="flex gap-3 mb-2 lg:mb-0">
          {BottomFooter.map((ele, i) => (
            <Link
              key={i}
              to={ele.toLowerCase().replace(/\s+/g, "-")}
              className={`hover:text-white transition ${
                i !== BottomFooter.length - 1
                  ? "border-r border-richblack-700 pr-3"
                  : "pl-3"
              }`}
            >
              {ele}
            </Link>
          ))}
        </div>

        {/* Credit */}
        <div className="text-center">
          Made by <span className="text-yellow-200">Me</span> © 2023{" "}
          <span className="font-bold text-white">StudyBuddy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
