import React, { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from '../slices/viewCourseSlice';
import ReviewModal from '../Components/core/ViewCourse/ReviewModal';
import VideoDetailsSidebar from '../Components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCourseData = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);

      if (!courseData) return;

      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setEntireCourseData(courseData.courseDetails));
      dispatch(setCompletedLectures(courseData.completedVideos));

      const totalLectures = courseData.courseDetails.courseContent.reduce(
        (acc, section) => acc + (section?.subSection?.length || 0),
        0
      );
      dispatch(setTotalNoOfLectures(totalLectures));
    };

    if (courseId && token) {
      fetchCourseData();
    }
  }, [courseId, token, dispatch]);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-screen bg-richblack-900 text-white">
      {/* Sidebar */}
      <div className="w-[320px] border-r border-richblack-700 bg-richblack-800 hidden md:block">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
      </div>

      {/* Main Outlet */}
      <div className="flex-1 p-4 overflow-y-auto">
        <Outlet />
      </div>

      {/* Review Modal */}
      {reviewModal && <ReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
