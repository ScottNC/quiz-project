import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Category {
  id: number;
  name: string;
}

const Category: React.FC = () => {
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
    <div>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
