import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, ShoppingCart, User, LogOut } from "lucide-react";
import { api } from "../axiosInstance";
import toast from "react-hot-toast";
import useAuth from "../Featrus/hook/useAuth";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cartItems);

  const links = [
    { label: "Shop", to: "/shop", icon: ShoppingBag },
    { label: "Cart", to: "/cart", icon: ShoppingCart },
    { label: "Aboutus", to: "/aboutus", icon: User },
  ];

  if (!user) {
    links.push({ label: "Login", to: "/login" });
  }

  if (user?.role === "admin") {
    links.push({ label: "Admin", to: "/admin" });
  }

  const handlelogoClick = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    logoutUser();
    navigate("/login");
  };

  const initial = user?.name?.split(" ")[0]?.charAt(0).toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
        {/* Nav Logo */}
        <div id="logo" className="flex items-center gap-3">
          <span
            onClick={handlelogoClick}
            className="text-2xl font-bold text-blue-600 cursor-pointer"
          >
            <img src={"/assets/logo.png"} className=" w-22" alt="Logo " />
          </span>
          <span className="text-sm text-gray-400 hidden sm:inline">
            Your store, your way
          </span>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-5 rounded-full px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.label === "Cart" && (
                      <div className="relative flex items-center">
                        <Icon
                          size={22}
                          className="shrink-0 transition-transform hover:scale-110"
                        />

                        {cart.length > 0 && (
                          <span className="absolute -top-3 -right-4 flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-green-600 text-white text-xs font-bold shadow-md">
                            {cart.length}
                          </span>
                        )}
                      </div>
                    )}
                    {/* <Icon size={18} className="shrink-0" /> */}
                    <span className="text-ml font-mono cursor-pointer">
                      {item.label}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>

          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex h-10 min-w-10 items-center justify-center gap-1 rounded-full border border-gray-300 bg-gray-100 px-2 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Open profile menu"
            >
              <User size={20} />
              <span className="hidden sm:inline">{initial}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={16} /> Profile
                </NavLink>
                <button
                  type="button"
                  className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />{" "}
                  <button onClick={handleLogout}>Logout</button>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-4 z-10 md:hidden">
          <ul className="space-y-2">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex w-full items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <Icon size={18} />
                    {item.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                {initial}
              </div>
              <div>
                <p className="font-semibold">{user?.username || "User"}</p>
                <p className="text-xs text-gray-500">
                  {user?.email || "No email"}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={handleLogout}
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
