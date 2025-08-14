
const apiBaseUrl = import.meta.env.VITE_API_URL;

import React, { useEffect, useState } from "react";

const Product = () => {
  const [all, setAll] = useState([]);

  async function ShowProducts() {
    // try {
    //   const response = await fetch(`${apiBaseUrl}/show`, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    //   });

    try {
      const response = await fetch("/show", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      setAll(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    ShowProducts();
  }, []);

  return (
    <div className="p-4 mt-4">
      {all.map((product, index) => (
        <div key={index} className="mb-2 p-2 border-b flex bg-amber-300">
          <div>
            <p className="font-semibold">{product.name}</p>
            <p className="text-gray-600">&#8377; {product.price}</p>
            <p className="font-semibold text-gray-600">{product.category}</p>
          </div>
          {/* <div className="absolute right-20">
            <button>Edit</button> <br /><br />
            <button className="text-red-600">Delete</button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Product;
