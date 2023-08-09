import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const effectCalled = useRef<boolean>(false);

  useEffect(() => {
    if (effectCalled.current) return;
    fetchCategories();
    effectCalled.current = true;
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(BASE_URL + "/category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section className="p-6 w-full bg-light">
      <div className="text-2xl text-dark font-bold text-center">
        Choose from this month's quiz categories
      </div>
      <div className="flex flex-col gap-y-12;">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <div className="w-full p-8 flex justify-center font-sans">
              <button
                className="w-40 h-16 bg-dark text-lightest font-bold rounded-lg cursor-pointer select-none
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#40798C,0_0px_0_0_#1b70f841]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#40798C,0_15px_0_0_#1b70f841]
    border-b-[1px] border-blue-400"
              >
                {category.name}
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Home;
