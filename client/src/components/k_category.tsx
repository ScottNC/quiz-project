import React, { useState, useEffect } from "react";
import { fetchCategories } from "../helpers/k_api";
interface Category {
  id: number;
  name: string;
  // Add other properties as needed
}
const Category: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default Category;
