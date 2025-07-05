export default function Tab({ tabData, field, setField }) {
  return (
    <div
      className="flex bg-richblack-800 p-1 gap-x-2 my-6 rounded-full max-w-max mx-auto shadow-inner shadow-white/10"
    >
      {tabData.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setField(tab.type)}
          className={`py-2 px-5 rounded-full text-sm md:text-base font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300
            ${
              field === tab.type
                ? "bg-richblack-900 text-yellow-50 shadow shadow-yellow-300/20"
                : "bg-transparent text-richblack-200 hover:bg-richblack-700 hover:text-yellow-100"
            }
          `}
        >
          {tab?.tabName}
        </button>
      ))}
    </div>
  );
}
