// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Root from "../components/Root/Root";

// Home
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Profile
import UserProfile from "../pages/Profile/UserProfile";




export default function AppRouter() {
  return (
    <Routes>

      {/* For Home Routing */}
      <Route element={<Root />}>
        {/* Root path now serves the Home page */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
      </Route>

    </Routes>
  );
}