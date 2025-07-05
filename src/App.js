import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Components/common/NavBar";
import Footer from "./Components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./slices/loadingBarSlice";
import { useSelector, useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./Components/core/Auth/OpenRoute";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Setting from "./Components/core/Dashboard/Settings";
import EnrollledCourses from "./Components/core/Dashboard/EnrolledCourses";
import Cart from "./Components/core/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./Components/core/Dashboard/AddCourse/index";
import MyCourses from "./Components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./Components/core/Dashboard/EditCourse.jsx/EditCourse";
import Catalog from "./pages/Catalog";
import ScrollToTop from "./Components/ScrollToTop";
import CourseDetails from "./pages/CourseDetails";
import SearchCourse from "./pages/SearchCourse";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./Components/core/ViewCourse/VideoDetails";
import PurchaseHistory from "./Components/core/Dashboard/PurchaseHistory";
import InstructorDashboard from "./Components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import AdminPannel from "./Components/core/Dashboard/AdminPannel";
import { RiWifiOffLine } from "react-icons/ri";

function App() {
  console.log = function () {};
  const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();

  return (
    <div className="relative w-screen min-h-screen flex flex-col font-inter">
      {/* 🎨 Background Gradient with SVG */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 opacity-95" />
        <svg
          className="absolute top-0 left-0 w-full h-auto opacity-10"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#FFD60A"
            fillOpacity="0.08"
            d="M0,192L60,170.7C120,149,240,107,360,90.7C480,75,600,85,720,101.3C840,117,960,139,1080,133.3C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* 🔝 Top Progress Bar */}
      <LoadingBar
        color="#FFD60A"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />

      {/* 📍 Navbar */}
      <NavBar setProgress={setProgress} />

      {/* 🚫 Offline Banner */}
      {!navigator.onLine && (
        <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}

      {/* 📜 Scroll Restoration */}
      <ScrollToTop />

      {/* 📦 Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:catalog" element={<Catalog />} />
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyOtp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
        <Route path="/search/:searchQuery" element={<SearchCourse />} />

        {/* 🛡️ Authenticated Routes */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrollledCourses />}
              />
              <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
              <Route
                path="dashboard/instructor"
                element={<InstructorDashboard />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <Route path="dashboard/admin-panel" element={<AdminPannel />} />
          )}
        </Route>

        {/* 🎥 Video Learning Route */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="/dashboard/enrolled-courses/view-course/:courseId/section/:sectionId/sub-section/:subsectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>

        {/* 🏠 Fallback Route */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* 🔻 Footer */}
      <Footer />
    </div>
  );
}

export default App;
