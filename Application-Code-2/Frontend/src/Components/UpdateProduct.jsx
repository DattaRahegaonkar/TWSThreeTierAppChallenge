
const apiBaseUrl = import.meta.env.VITE_API_URL;
import { useState } from "react";

const UpdateProduct = () => {
  // Separate useState variables for each field
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  // Handle form submission
  const UpdateProduct = async (e) => {
    e.preventDefault();

    // let result = await fetch(`${apiBaseUrl}/update`, {
    //   method: "get",
    //   headers: { "Content-Type": "application/json" },
    // });

    let result = await fetch("/update", {
      method: "get",
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    console.log(result);
    
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Update Product
      </h2>
      <form onSubmit={UpdateProduct} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Grocery">Grocery</option>
        </select>
        <input
          type="text"
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
