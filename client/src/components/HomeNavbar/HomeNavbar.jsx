// src/components/navbar/HomeNavbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../Provider/UserProvider";
import { FaUserCircle } from "react-icons/fa";

const HomeNavbar = () => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainNav = [
    { title: "Products", link: "/" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Cart", link: "/cart" },
  ];

  return (
    <nav className="w-full shadow-md">
      {/* Top bar */}
      <div className="bg-green-700 text-white text-sm px-4 py-1 flex justify-end gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-yellow-300 transition"
            >
              <FaUserCircle className="text-lg" />
              {user.username || "User"}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white text-green-800 rounded shadow-lg z-20">
                <button
                  onClick={() => {
                    signOut();
                    navigate("/");
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-green-100 rounded"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold underline text-yellow-300" : ""}`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Brand */}
      <div className="bg-white py-3 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-800">Online Store</h1>
          {/* Desktop nav */}
          <div className="hidden lg:flex gap-4">
            {mainNav.map(({ title, link }) => (
              <NavLink
                key={title}
                to={link}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-semibold transition-colors ${
                    isActive
                      ? "bg-green-800 text-yellow-300"
                      : "hover:bg-green-100 hover:text-green-800"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-green-700 font-semibold"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-2 px-4 py-2">
            {mainNav.map(({ title, link }) => (
              <li key={title}>
                <NavLink
                  to={link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-2 rounded hover:bg-green-100 hover:text-green-800 transition"
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default HomeNavbar;
