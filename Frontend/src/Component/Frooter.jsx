import React from "react";
import { FiMail, FiPhone } from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import logo from "../../Public/assets/logo.png";

const Frooter = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img
              src={logo}
              className="bg-gray-50 w-50"
              onClick={handleLogoClick}
              alt=""
            />
            <p className="mt-3 text-sm text-gray-600">
              Small store description. Quality products, fast shipping and
              friendly support.
            </p>
          </div>

          <div className="p-5">
            <h4 className="text-sm font-semibold text-gray-700">Quick Links</h4>
            <ul className="mt-4 space-y-2 p-5 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-600 hover:text-blue-600">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600">
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-blue-600"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700">Support</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FiMail size={16} />
                <a href="mailto:support@example.com">support@example.com</a>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone size={16} />
                <a href="tel:+919999999999">+91 99999 99999</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-700">Follow us</h4>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="Twitter"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-blue-600"
              >
                <FaInstagram size={18} />
              </a>
            </div>
            <p className="mt-6 text-xs text-gray-400">
              © {new Date().getFullYear()} Your Shop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Frooter;
