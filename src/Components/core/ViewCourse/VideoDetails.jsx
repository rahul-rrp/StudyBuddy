import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Player, ControlBar, BigPlayButton, LoadingSpinner, PlaybackRateMenuButton, ForwardControl, ReplayControl, CurrentTimeDisplay, TimeDivider } from 'video-react';
import { BiSkipPreviousCircle, BiSkipNextCircle } from 'react-icons/bi';
import { MdOutlineReplayCircleFilled } from 'react-icons/md';
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { setCompletedLectures } from '../../../slices/viewCourseSlice';

const VideoDetails = () => {
  const { courseId, sectionId, subsectionId } = useParams();
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const { courseSectionData, completedLectures } = useSelector(state => state.viewCourse);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const playerRef = useRef(null);

  const [videoData, setVideoData] = useState(null);
  const [videoEnd, setVideoEnd] = useState(false);

  useEffect(() => {
    const currentSection = courseSectionData.find(section => section._id === sectionId);
    const currentSubsection = currentSection?.subSection?.find(sub => sub._id === subsectionId);
    setVideoData(currentSubsection);
    setVideoEnd(false);
  }, [courseSectionData, sectionId, subsectionId]);

  const getCurrentIndices = () => {
    const sectionIndex = courseSectionData.findIndex(section => section._id === sectionId);
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(sub => sub._id === subsectionId);
    return { sectionIndex, subIndex };
  };

  const isFirstLecture = () => {
    const { sectionIndex, subIndex } = getCurrentIndices();
    return sectionIndex === 0 && subIndex === 0;
  };

  const isLastLecture = () => {
    const { sectionIndex, subIndex } = getCurrentIndices();
    const lastSubInSection = courseSectionData[sectionIndex]?.subSection.length - 1;
    const lastSection = courseSectionData.length - 1;
    return sectionIndex === lastSection && subIndex === lastSubInSection;
  };

  const nextLecture = () => {
    if (isLastLecture()) return;
    const { sectionIndex, subIndex } = getCurrentIndices();
    const currentSection = courseSectionData[sectionIndex];

    if (subIndex === currentSection.subSection.length - 1) {
      const nextSection = courseSectionData[sectionIndex + 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSection._id}/sub-section/${nextSection.subSection[0]._id}`);
    } else {
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${currentSection._id}/sub-section/${currentSection.subSection[subIndex + 1]._id}`);
    }
  };

  const previousLecture = () => {
    if (isFirstLecture()) return;
    const { sectionIndex, subIndex } = getCurrentIndices();

    if (subIndex === 0) {
      const prevSection = courseSectionData[sectionIndex - 1];
      const lastSub = prevSection.subSection[prevSection.subSection.length - 1];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${prevSection._id}/sub-section/${lastSub._id}`);
    } else {
      const currentSection = courseSectionData[sectionIndex];
      navigate(`/dashboard/enrolled-courses/view-course/${courseId}/section/${currentSection._id}/sub-section/${currentSection.subSection[subIndex - 1]._id}`);
    }
  };

  const handleLectureCompletion = async () => {
    await markLectureAsComplete({
      userId: user._id,
      courseId,
      subSectionId: subsectionId,
    }, token);

    dispatch(setCompletedLectures([...completedLectures, videoData._id]));
  };

  if (!videoData) return <div className="text-center text-white mt-10">Loading video...</div>;

  return (
    <div className="md:w-[calc(100vw-320px)] w-full p-3">
      {/* Video Player */}
      <div className="relative">
        <Player
          ref={playerRef}
          src={videoData.videoUrl}
          aspectRatio="16:9"
          fluid
          autoPlay={false}
          onEnded={() => setVideoEnd(true)}
        >
          <BigPlayButton position="center" />
          <LoadingSpinner />
          <ControlBar>
            <PlaybackRateMenuButton rates={[2, 1.5, 1, 0.5]} order={7.1} />
            <ReplayControl seconds={5} order={7.2} />
            <ForwardControl seconds={5} order={7.3} />
            <TimeDivider order={4.2} />
            <CurrentTimeDisplay order={4.1} />
          </ControlBar>
        </Player>

        {/* Overlay Controls on End */}
        {videoEnd && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black bg-opacity-40 backdrop-blur-sm gap-4 px-4">
            {/* Mark as complete */}
            {!completedLectures.includes(videoData._id) && (
              <button
                onClick={handleLectureCompletion}
                className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded shadow-md transition-all"
              >
                Mark as Completed
              </button>
            )}

            {/* Replay */}
            <MdOutlineReplayCircleFilled
              title="Replay"
              onClick={() => {
                playerRef.current.seek(0);
                playerRef.current.play();
                setVideoEnd(false);
              }}
              className="text-4xl md:text-5xl text-white bg-richblack-700 rounded-full p-1 cursor-pointer hover:scale-95"
            />

            {/* Previous */}
            {!isFirstLecture() && (
              <BiSkipPreviousCircle
                title="Previous Lecture"
                onClick={previousLecture}
                className="text-4xl md:text-5xl text-white bg-richblack-700 rounded-full cursor-pointer hover:scale-95"
              />
            )}

            {/* Next */}
            {!isLastLecture() && (
              <BiSkipNextCircle
                title="Next Lecture"
                onClick={nextLecture}
                className="text-4xl md:text-5xl text-white bg-richblack-700 rounded-full cursor-pointer hover:scale-95"
              />
            )}
          </div>
        )}
      </div>

      {/* Video Title & Description */}
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-richblack-25">{videoData.title}</h1>
        <p className="mt-2 text-richblack-100">{videoData.description}</p>
      </div>
    </div>
  );
};

export default VideoDetails;
