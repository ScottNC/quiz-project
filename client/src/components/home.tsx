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
    <div className="flex flex-col gap-y-12;">
      {categories.map((category) => (
        <Link to={`/category/${category.id}`}>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;"
            key={category.id}
          >
            {category.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Home;
