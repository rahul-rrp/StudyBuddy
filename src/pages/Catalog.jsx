import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../Components/core/Catalog/CourseSlider';
import CatalogCard from '../Components/core/Catalog/CatalogCard';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const Catalog = () => {
  const { catalog } = useParams();
  const dispatch = useDispatch();

  const [desc, setDesc] = useState(null);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryID, setCategoryID] = useState(null);
  const [activeOption, setActiveOption] = useState(1);
  const [loading, setLoading] = useState(true);

  // Fetch category description and ID
  const fetchCategoryDetails = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      const selectedCategory = result.data.data.find(item => item.name === catalog);
      if (selectedCategory) {
        setDesc(selectedCategory);
        setCategoryID(selectedCategory._id);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch course data based on category ID
  useEffect(() => {
    fetchCategoryDetails();
  }, [catalog]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getCatalogaPageData(categoryID, dispatch);
      setCatalogPageData(result);
      setLoading(false);
    };

    if (categoryID) {
      fetchData();
    }
  }, [categoryID]);

  return (
    <div className="text-white">
      {/* Header Section */}
      <div className="bg-richblack-800 px-4 py-12">
        <motion.div
          className="mx-auto flex flex-col gap-4 max-w-maxContent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-richblack-300">
            Home / Catalog / <span className="text-yellow-25">{catalog}</span>
          </p>
          <h1 className="text-3xl font-semibold text-richblack-5">{catalog}</h1>
          <p className="max-w-[870px] text-richblack-200">{desc?.description}</p>
        </motion.div>
      </div>

      {/* Courses to Get Started */}
      <motion.div
        className="mx-auto max-w-maxContent px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-3xl font-semibold mb-4">Courses to Get You Started</h2>

        <div className="flex border-b border-richblack-600 text-sm mb-6">
          <button
            onClick={() => setActiveOption(1)}
            className={`px-4 py-2 cursor-pointer ${activeOption === 1 ? "border-b border-yellow-25 text-yellow-25" : "text-richblack-50"}`}
          >
            Most Popular
          </button>
          <button
            onClick={() => setActiveOption(2)}
            className={`px-4 py-2 cursor-pointer ${activeOption === 2 ? "border-b border-yellow-25 text-yellow-25" : "text-richblack-50"}`}
          >
            New
          </button>
        </div>

        {loading ? (
          <Skeleton height={200} count={1} />
        ) : (
          <CourseSlider Courses={catalogPageData?.selectedCourses} />
        )}
      </motion.div>

      {/* Similar Courses */}
      <motion.div
        className="mx-auto max-w-maxContent px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-3xl font-semibold mb-6">Similar to {catalog}</h2>
        {loading ? (
          <Skeleton height={200} count={1} />
        ) : (
          <CourseSlider Courses={catalogPageData?.differentCourses} />
        )}
      </motion.div>

      {/* Frequently Bought Together */}
      <motion.div
        className="mx-auto max-w-maxContent px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-3xl font-semibold mb-6">Frequently Bought Together</h2>
        {loading ? (
          <Skeleton height={250} count={2} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {catalogPageData?.mostSellingCourses?.map((item, index) => (
              <CatalogCard
                key={index}
                course={item}
                Height="h-[100px] lg:h-[400px]"
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Catalog;
