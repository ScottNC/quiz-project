import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";
import { useParams, Link } from "react-router-dom";

interface Subcategory {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const effectCalled = useRef<boolean>(false);

  const { categoryId } = useParams();

  useEffect(() => {
    if (effectCalled.current) return;
    fetchSubcategories();
    effectCalled.current = true;
  }, []);

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

  return (
    <section>
      <h1> Please select a Category</h1>

      {subcategories.map((subcategory) => (
        <Link to={`/subcategory/${categoryId}`}>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l;"
            key={subcategory.id}
          >
            {subcategory.name}
          </button>
        </Link>
      ))}
    </section>
  );
};

export default Category;
