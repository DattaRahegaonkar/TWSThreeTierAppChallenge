import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Import icons for mobile menu
import "./Navbar.css";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("ok");
    setSearch("");
  };

  return (
    <nav className="shadow-md bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Section */}
          <NavLink to={auth ? "/" : "/signup"} className="text-xl font-bold">
            Logo
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {auth ? (
              <>
                <NavLink to="/" className="nav-link">
                  Products
                </NavLink>
                <NavLink to="/add" className="nav-link">
                  Add Product
                </NavLink>
                <NavLink to="/update" className="nav-link">
                  Update Product
                </NavLink>
                <NavLink to="/profile" className="nav-link">
                  Profile
                </NavLink>
                <NavLink
                  to="/signup"
                  className="nav-link text-red-500"
                  onClick={logout}
                >
                  Logout ({JSON.parse(auth).name})
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className="nav-link">
                  Products
                </NavLink>
                <NavLink to="/signup" className="nav-link">
                  SignUp
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* Search Input (Hidden on small screens) */}
          {auth && (
            <div className="hidden md:flex">
              <form className="flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="outline-1 h-10 w-64 rounded-3xl pl-5 border border-gray-300"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className=" ml-2 outline-none rounded-4xl pl-4 pr-4 bg-blue-400"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 p-4 space-y-4 text-center">
          {auth ? (
            <>
              <NavLink to="/" className="nav-link">
                Products
              </NavLink>
              <NavLink to="/add" className="block nav-link">
                Add Product
              </NavLink>
              <NavLink to="/update" className="block nav-link">
                Update Product
              </NavLink>
              <NavLink to="/profile" className="block nav-link">
                Profile
              </NavLink>
              <NavLink
                to="/signup"
                className="block nav-link text-red-500"
                onClick={logout}
              >
                Logout ({JSON.parse(auth).name})
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/" className="block nav-link">
                Products
              </NavLink>
              <NavLink to="/signup" className="block nav-link">
                SignUp
              </NavLink>
              <NavLink to="/login" className="block nav-link">
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
