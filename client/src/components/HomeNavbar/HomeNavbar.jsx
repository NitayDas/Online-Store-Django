// src/components/navbar/HomeNavbar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../Provider/UserProvider";

const HomeNavbar = () => {
  const { user, signOut } = useUser();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Top-right links
  const navLinks = [
    { to: "/", label: "Home" },
    ...(user
      ? [
          { to: "/dashboard", label: "Dashboard" },
          {
            to: "/",
            label: "Sign Out",
            onClick: () => {
              signOut();
              navigate("/login");
            },
          },
        ]
      : [{ to: "/login", label: "Login" }]),
  ];

  // Main navigation
  const mainNav = [
    { title: "Products", link: "/products" },
    { title: "About", link: "/about" },
    { title: "Contact", link: "/contact" },
    { title: "Cart", link: "/cart" },
  ];

  return (
    <div className="w-full shadow">
      {/* Top links */}
      <div className="bg-green-700 text-white text-sm px-4 py-1 flex justify-end gap-4">
        {navLinks.map((link) =>
          link.onClick ? (
            <button
              key={link.label}
              onClick={link.onClick}
              className="hover:underline"
            >
              {link.label}
            </button>
          ) : (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `hover:underline ${isActive ? "font-bold underline text-yellow-300" : ""}`
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </div>

      {/* Logo / Brand */}
      <div className="bg-white py-2 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-green-800">Online Store</h1>
        </div>
      </div>

      {/* Main nav tiles */}
      <div className="bg-green-600 text-white grid grid-cols-2 md:grid-cols-4 text-center">
        {mainNav.map(({ title, link }) => (
          <NavLink
            key={title}
            to={link}
            className={({ isActive }) =>
              `px-3 py-4 border border-white transition-all ${
                isActive ? "bg-green-800" : "hover:bg-green-700"
              }`
            }
          >
            <p className="font-semibold">{title}</p>
          </NavLink>
        ))}
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden px-4 py-2">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="text-green-700 font-semibold"
        >
          {isDropdownOpen ? "Close Menu" : "Menu"}
        </button>
        {isDropdownOpen && (
          <ul className="mt-2 bg-white shadow px-4 py-2 rounded space-y-2">
            {mainNav.map((item) => (
              <li key={item.title}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsDropdownOpen(false)}
                  className="block py-1 hover:text-green-700"
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
