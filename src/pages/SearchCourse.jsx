import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchCourses } from "../services/operations/courseDetailsAPI";
import CatalogCard from "../Components/core/Catalog/CatalogCard";
import { useDispatch } from "react-redux";
import { HiOutlineEmojiSad } from "react-icons/hi";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SearchCourse = () => {
  const { searchQuery } = useParams();
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async () => {
    setLoading(true);
    const res = await searchCourses(searchQuery, dispatch);
    setSearchResults(res || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-richblack-900">
      {/* 🔍 Header */}
      <div className="mx-auto flex flex-col gap-4 bg-richblack-800 p-5 min-h-[200px]">
        <p className="text-sm text-richblack-300">
          Home / Search / <span className="text-yellow-25">{searchQuery}</span>
        </p>
        <p className="text-3xl font-semibold text-richblack-5">
          Search Results for "{searchQuery}"
        </p>
        <p className="text-richblack-200">
          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
        </p>
      </div>

      {/* 🔄 Loading Skeletons */}
      {loading ? (
        <div className="flex flex-wrap justify-center gap-8 p-10">
          {[1, 2, 3].map((item) => (
            <SkeletonTheme key={item} baseColor="#2C333F" highlightColor="#161D29">
              <div className="w-[300px] flex flex-col gap-3">
                <Skeleton height={180} className="rounded-xl" />
                <Skeleton height={20} width={100} />
                <Skeleton height={20} />
                <Skeleton height={20} />
              </div>
            </SkeletonTheme>
          ))}
        </div>
      ) : searchResults.length === 0 ? (
        // ❌ No Results
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 text-center">
          <HiOutlineEmojiSad className="text-[80px] text-richblack-300" />
          <p className="text-3xl font-semibold text-richblack-5">No Results Found</p>
          <p className="text-richblack-200">Try a different keyword.</p>
        </div>
      ) : (
        // ✅ Course Results
        <div className="flex flex-wrap justify-center gap-8 p-10">
          {searchResults.map((item) => (
            <div key={item._id} className="max-w-[360px]">
              <CatalogCard course={item} Height="lg:h-[250px] h-[140px]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCourse;
