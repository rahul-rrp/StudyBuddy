import React, { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiSearch } from "react-icons/hi";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";

const NavBar = ({ setProgress }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [searchValue, setSearchValue] = useState("");
  const [sublinks, setSublinks] = useState([]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const menuRef = useRef();
  const overlayRef = useRef();

  useEffect(() => {
    const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        if (result?.data?.data?.length > 0) {
          setSublinks(result.data.data);
          localStorage.setItem("sublinks", JSON.stringify(result.data.data));
        }
      } catch (err) {
        console.log(err);
        // setSublinks(JSON.parse(localStorage.getItem("sublinks")));
      }
    };
    fetchSublinks();
  }, []);

  const matchRoutes = (route) => matchPath({ path: route }, location.pathname);

  const toggleMobileMenu = () => {
    menuRef.current.classList.toggle("translate-x-0");
    overlayRef.current.classList.toggle("hidden");
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setVisible(currentScrollPos < prevScrollPos);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.length > 0) {
      navigate(`/search/${searchValue}`);
      setSearchValue("");
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#1E40AF] backdrop-blur-md shadow-md`}
    >
      <div className="w-11/12 max-w-maxContent mx-auto flex justify-between items-center h-14">
        {/* Logo */}
        <Link to="/" onClick={() => dispatch(setProgress(100))}>
          <img src={logo} alt="StudyBuddy" className="w-36" />
        </Link>

        {/* Mobile - Hamburger & Cart */}
        <div className="flex items-center gap-3 md:hidden">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" onClick={() => dispatch(setProgress(100))}>
              <div className="relative">
                <TiShoppingCart className="text-yellow-100 w-7 h-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold rounded-full px-2 shadow">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          )}
          <GiHamburgerMenu
            className="text-white text-2xl"
            onClick={toggleMobileMenu}
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-yellow-100 text-sm font-medium">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div className="relative group cursor-pointer">
                  <p className="hover:text-yellow-300">{link.title}</p>
                  <div className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white text-black rounded shadow-lg w-48 z-50">
                    {sublinks.map((cat, idx) => (
                      <Link
                        to={`/catalog/${cat.name}`}
                        key={idx}
                        className="block px-4 py-2 hover:bg-slate-100"
                        onClick={() => dispatch(setProgress(30))}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link to={link.path} onClick={() => dispatch(setProgress(100))}>
                  <p className={`${matchRoutes(link.path) ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                    {link.title}
                  </p>
                </Link>
              )}
            </li>
          ))}

          {/* Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search"
              className="bg-white/10 text-white px-3 py-1.5 rounded-full placeholder:text-slate-300 focus:outline-none focus:ring-2 ring-yellow-300 w-32"
            />
            <HiSearch className="absolute right-2 top-2.5 text-yellow-200 cursor-pointer" />
          </form>
        </ul>

        {/* Desktop Auth / Profile */}
        <div className="hidden md:flex items-center gap-4">
          {user && user.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" onClick={() => dispatch(setProgress(100))}>
              <div className="relative">
                <TiShoppingCart className="text-yellow-100 w-7 h-7" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs font-bold rounded-full px-2 shadow">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          )}

          {!token ? (
            <>
              <Link to="/login" onClick={() => dispatch(setProgress(100))}>
                <button className="px-4 py-2 rounded bg-white/10 text-yellow-100 hover:bg-yellow-400 hover:text-black transition">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={() => dispatch(setProgress(100))}>
                <button className="px-4 py-2 rounded bg-white/10 text-yellow-100 hover:bg-yellow-400 hover:text-black transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Overlay & Menu */}
        <div ref={overlayRef} className="fixed inset-0 bg-black/50 hidden z-40" onClick={toggleMobileMenu}></div>
        <div
          ref={menuRef}
          className="fixed top-0 right-0 h-full w-[260px] bg-slate-900 text-white shadow-lg transform translate-x-full transition-transform z-50 p-6"
        >
          {!token ? (
            <div className="space-y-4">
              <Link to="/login" onClick={() => { dispatch(setProgress(100)); toggleMobileMenu(); }}>
                <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold">
                  Login
                </button>
              </Link>
              <Link to="/signup" onClick={() => { dispatch(setProgress(100)); toggleMobileMenu(); }}>
                <button className="w-full bg-yellow-400 text-black py-2 rounded font-semibold">
                  Signup
                </button>
              </Link>
            </div>
          ) : (
            <ProfileDropDown />
          )}

          <hr className="my-4 border-slate-700" />

          <p className="font-semibold text-yellow-200">Courses</p>
          <div className="space-y-2 mt-2">
            {sublinks.map((cat, i) => (
              <Link key={i} to={`/catalog/${cat.name}`} onClick={() => { dispatch(setProgress(30)); toggleMobileMenu(); }} className="block text-sm hover:text-yellow-400">
                {cat.name}
              </Link>
            ))}
          </div>

          <hr className="my-4 border-slate-700" />
          <Link to="/about" onClick={() => { dispatch(setProgress(100)); toggleMobileMenu(); }} className="block py-1 hover:text-yellow-400">
            About
          </Link>
          <Link to="/contact" onClick={() => { dispatch(setProgress(100)); toggleMobileMenu(); }} className="block py-1 hover:text-yellow-400">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
