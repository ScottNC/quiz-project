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
    <section className="w-full bg-light">
      <div className=" text-dark font-bold justify-center">
        {" "}
        Please select a subcategory
      </div>

      {subcategories.map((subcategory) => (
        <Link key={subcategory.id} to={`/subcategory/${categoryId}`}>
          <button className="bg-darkest hover:bg-gray-400 text-lightest font-bold py-2 px-4 rounded-l;">
            {subcategory.name}
          </button>
        </Link>
      ))}
    </section>
  );
};

export default Category;
