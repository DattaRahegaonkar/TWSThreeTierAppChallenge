
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const apiBaseUrl = import.meta.env.VITE_API_URL;

const AddProduct = () => {
  // Separate useState variables for each field
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const AddProduct = async (e) => {
    e.preventDefault();

    const auth = JSON.parse(localStorage.getItem("user"));
    let userid = auth._id;

    // let result = await fetch(`${apiBaseUrl}/add`, {
    //   method: "post",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({ name, price, category, company, userid }),
    // });

    let result = await fetch("/add", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, price, category, company, userid }),
    });

    result = await result.json();

    // Clear input fields after submission
    setName("");
    setPrice("");
    setCategory("");
    setCompany("");

    navigate("/");

    // Here, you can send `newProduct` to an API
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Add Product
      </h2>
      <form onSubmit={AddProduct} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded-lg focus:ring focus:ring-green-300"
          required
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
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
