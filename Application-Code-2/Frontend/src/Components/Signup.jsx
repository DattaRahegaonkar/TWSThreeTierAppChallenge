
const apiBaseUrl = import.meta.env.VITE_API_URL;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fill, setFill] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/"); // Redirect if already logged in
    }
  }, []); // Runs once on mount

  const handleChange = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setFill(true);
      return false;
    }

    // try {
    //   let result = await fetch(`${apiBaseUrl}/signup`, {
    //     method: "post",
    //     body: JSON.stringify({ name, email, password }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    try {
      let result = await fetch("/signup", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      let NewResult = await result.json();

      if (!result.ok) {
        setError(NewResult.msg);
        return;
      }

      localStorage.setItem("user", JSON.stringify(NewResult));
      navigate("/");
    } catch (error) {
      setError("something went wrong !");
    }

    console.log(error);
  };

  return (
    <div className="font-semibold mt-20 flex flex-col justify-center items-center">
      <div className="mb-6">
        <h3 className="text-3xl">Register</h3>
      </div>
      <div className=" p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="mb-4 flex flex-col items-start w-full">
          <label htmlFor="name" className="mb-1">
            Name:
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            placeholder="Enter Name"
            id="name"
            className="outline-none w-80 h-10 pl-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          {fill && !name && <p className="text-red-600">Enter the name</p> }
        </div>
        <div className="mb-4 flex flex-col items-start w-full">
          <label htmlFor="email" className="mb-1">
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Email"
            id="email"
            className="outline-none w-80 h-10 pl-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          {fill && !email && <p className="text-red-600">Enter the email</p> }
        </div>
        <div className="mb-4 flex flex-col items-start w-full">
          <label htmlFor="password" className="mb-1">
            Password:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            id="password"
            className="outline-none w-80 h-10 pl-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
          />
          {fill && !password && <p className="text-red-600">Enter the password</p> }
        </div>
        <button
          onClick={handleChange}
          className="bg-blue-500 text-white font-semibold p-2 w-80 rounded-lg hover:bg-blue-600 transition-all"
        >
          Sign Up
        </button>
        <br />
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
