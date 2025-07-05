const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  const isActive = currentCard === cardData.heading;

  return (
    <button
      onClick={() => setCurrentCard(cardData.heading)}
      className={`w-full max-w-[360px] text-left rounded-lg border transition-all duration-300 
        ${isActive
          ? "bg-white text-richblack-900 shadow-[12px_12px_0px_0px_#FFD60A] border-yellow-400"
          : "bg-richblack-700 text-richblue-100 border-transparent hover:border-richblack-600 hover:bg-richblack-600"}`}
    >
      {/* Heading & Description */}
      <div className="p-5 border-b border-dashed border-richblack-100">
        <h3
          className={`text-xl font-bold mb-2 ${
            isActive ? "text-black" : "text-richblue-50"
          }`}
        >
          {cardData.heading}
        </h3>
        <p className="text-base text-richblack-300">{cardData.description}</p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 text-sm font-medium">
        <span>{cardData.level}</span>
        <span>{cardData.lessionNumber} Lessons</span>
      </div>
    </button>
  );
};

export default CourseCard;
