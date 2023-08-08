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
    <section className="w-full bg-light">
      <div className=" text-dark font-bold justify-center">
        What category would you like to test your knowledge on?
      </div>
      <div className="flex flex-col gap-y-12;">
        {categories.map((category) => (
          <Link key={category.id} to={`/category/${category.id}`}>
            <div className="w-full p-8 flex justify-center font-sans">
              <button className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-2 rounded-full;">
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
