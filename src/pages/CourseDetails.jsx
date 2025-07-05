import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { addToCart } from '../slices/cartSlice';
import { toast } from 'react-hot-toast';

import RatingStars from '../Components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { ACCOUNT_TYPE } from '../utils/constants';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare, FaChevronDown } from 'react-icons/fa';
import { IoVideocamOutline } from 'react-icons/io5';

const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [courseDetail, setCourseDetail] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);

  useEffect(() => {
    const getCourseDetails = async () => {
      const response = await fetchCourseDetails(courseId, dispatch);
      setCourseDetail(response);
    };
    getCourseDetails();
  }, [courseId]);

  useEffect(() => {
    if (courseDetail?.ratingAndReviews?.length > 0) {
      setAvgReviewCount(GetAvgRating(courseDetail?.ratingAndReviews));
    }
  }, [courseDetail]);

  useEffect(() => {
    if (courseDetail && user?._id) {
      const enrolled = courseDetail?.studentsEnrolled?.includes(user._id);
      setAlreadyEnrolled(enrolled);
    }
  }, [courseDetail, user?._id]);

  const handleBuyNow = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      navigate('/login');
    }
  };

  const handleAddToCart = () => {
    if (token) {
      dispatch(addToCart(courseDetail));
    } else {
      navigate('/login');
    }
  };

  const isInCart = cart?.some((item) => item._id === courseDetail?._id);

  if (!courseDetail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="custom-loader"></div>
      </div>
    );
  }

  return (
    <div className="text-richblack-5">
      {/* Hero Section */}
      <div className="px-4 lg:w-[1260px] mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 pt-10">
          {/* Thumbnail (Mobile) */}
          <div className="block lg:hidden relative max-h-[300px] overflow-hidden rounded-lg shadow-lg">
            <img src={courseDetail?.thumbnail} alt="Course" className="w-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{courseDetail?.courseName}</h1>
            <p className="text-richblack-200">{courseDetail?.courseDescription}</p>

            <div className="flex flex-wrap gap-3 items-center text-sm">
              <span className="text-yellow-50">{avgReviewCount.toFixed(1)}</span>
              <RatingStars Review_Count={avgReviewCount} />
              <span>({courseDetail?.ratingAndReviews?.length} Reviews)</span>
              <span>|</span>
              <span>{courseDetail?.studentsEnrolled?.length} students enrolled</span>
            </div>

            <p>
              Created by {courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName}
            </p>

            <div className="flex flex-wrap gap-4 items-center text-sm text-richblack-300">
              <AiOutlineInfoCircle />
              <p>
                Created at:{' '}
                {new Date(courseDetail?.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <BsGlobe />
              <p>English</p>
            </div>
          </div>

          {/* Sidebar Pricing */}
          <div className="hidden lg:block sticky top-10">
            <div className="bg-richblack-700 rounded-lg p-4">
              <img src={courseDetail?.thumbnail} alt="Thumbnail" className="rounded-md mb-4" />
              <p className="text-2xl font-semibold mb-3">₹{courseDetail?.price}</p>

              {ACCOUNT_TYPE.INSTRUCTOR !== user?.accountType && (
                <>
                  {alreadyEnrolled ? (
                    <button className="yellowButton w-full" onClick={() => navigate('/dashboard/enrolled-courses')}>
                      Go to Course
                    </button>
                  ) : (
                    <>
                      <button className="yellowButton w-full" onClick={handleBuyNow}>
                        Buy Now
                      </button>
                      {isInCart ? (
                        <button className="blackButton w-full" onClick={() => navigate('/dashboard/cart')}>
                          Go to Cart
                        </button>
                      ) : (
                        <button className="blackButton w-full" onClick={handleAddToCart}>
                          Add to Cart
                        </button>
                      )}
                    </>
                  )}
                </>
              )}

              <div className="text-xs text-center mt-4 text-richblack-300">30-Day Money-Back Guarantee</div>
              <div className="mt-4 text-sm">
                <p className="font-semibold mb-2">This course includes:</p>
                <ul className="list-disc pl-5 text-caribbeangreen-100">
                  {JSON.parse(courseDetail?.instructions || '[]').map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast.success('URL copied to clipboard');
                  }}
                  className="text-yellow-100 flex items-center justify-center gap-2"
                >
                  <FaShareSquare />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What You’ll Learn */}
        <div className="my-10 border border-richblack-600 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-3">What you'll learn</h2>
          <p className="text-richblack-200">{courseDetail?.whatYouWillLearn}</p>
        </div>

        {/* Course Content */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Course Content</h2>
          <p className="mb-2 text-sm">
            {courseDetail?.courseContent?.length} Section(s) |{' '}
            {courseDetail?.courseContent?.reduce((acc, curr) => acc + curr?.subSection?.length, 0)} Lectures
          </p>

          <div className="flex flex-col gap-3">
            {courseDetail?.courseContent?.map((section, idx) => (
              <details key={idx} className="border border-richblack-600 rounded-md bg-richblack-700">
                <summary className="cursor-pointer p-4 flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <FaChevronDown />
                    <span>{section?.sectionName}</span>
                  </div>
                  <span className="text-yellow-25">{section?.subSection?.length} Lectures</span>
                </summary>
                <div>
                  {section?.subSection?.map((sub, i) => (
                    <div
                      key={i}
                      className="border-t border-richblack-600 px-6 py-3 flex items-center gap-2 bg-richblack-900"
                    >
                      <IoVideocamOutline />
                      <span>{sub?.title}</span>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>

        {/* Instructor */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Instructor</h2>
          <div className="flex items-center gap-4">
            <img src={courseDetail?.instructor?.image} alt="Instructor" className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold">
                {courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName}
              </p>
              <p className="text-sm text-richblack-300">{courseDetail?.instructor?.additionalDetails?.about}</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold mb-3">Reviews</h2>
          <p className="mb-4 text-sm text-richblack-200">
            {avgReviewCount.toFixed(1)} / 5 ({courseDetail?.ratingAndReviews?.length} ratings) |{' '}
            {courseDetail?.studentsEnrolled?.length} students
          </p>

          <div className="flex flex-col gap-6">
            {courseDetail?.ratingAndReviews?.map((review, i) => (
              <div key={i} className="border border-richblack-600 rounded-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review?.user?.image}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="font-medium">
                    {review?.user?.firstName} {review?.user?.lastName}
                  </p>
                </div>
                <RatingStars Review_Count={review?.rating} />
                <p className="mt-2 text-sm text-richblack-200">{review?.review}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
