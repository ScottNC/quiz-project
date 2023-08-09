import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";
import { Subcategory } from "./types/quiz_types";

const Category: React.FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { categoryId } = useParams();

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(BASE_URL + "/subcategory", {
          params: { categoryId: categoryId },
        });
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (effectCalled.current) return;
    fetchSubcategories();
    effectCalled.current = true;
  }, [categoryId]);

  return (
    <section className="p-6 w-full bg-light">
      <div className="text-2xl text-dark font-bold text-center">
        Choose a subcategory
      </div>
      <div className="flex flex-col gap-y-12;">
        {subcategories.map((subcategory) => (
          <Link key={subcategory.id} to={`/subcategory/${categoryId}`}>
            <div className="w-full p-4 flex justify-center font-sans">
              <button
                className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400
  "
              >
                {subcategory.name}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category;
