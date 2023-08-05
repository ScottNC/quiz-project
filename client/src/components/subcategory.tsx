import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../helpers/base_url";

interface Subcategory {
  id: number;
  name: string;
}

const Subcategory: React.FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const effectCalled = useRef<boolean>(false);

  const cat_id = 1; // hardcoded should be passed from category page

  useEffect(() => {
    if (effectCalled.current) return;
    fetchSubcategories();
    effectCalled.current = true;
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(BASE_URL + "/subcategory", {
        params: { categoryId: cat_id },
      });
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section>
      <h1> Welcome to the Subcategory page</h1>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory.id}>{subcategory.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Subcategory;
