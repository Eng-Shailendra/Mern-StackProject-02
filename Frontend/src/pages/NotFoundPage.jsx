import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <section className="min-h-screen bg-gradient from-slate-900 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        {/* Floating Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="p-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
            <ShoppingBag size={70} className="text-yellow-800" />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-white">
          <span className="text-red-400">🐱</span>
        </h1>
        <p className="mt-4 text-3xl md:text-4xl">😁 sorry!!!! 🌹</p>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
          Oops! Product Not Found
        </h2>

        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
          Looks like the page you're searching for has been sold out, moved to
          another shelf, or never existed in our store.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-500 text-white font-medium hover:bg-red-600 transition-all duration-300 shadow-lg hover:scale-105"
          >
            <Home size={20} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-700 text-black hover:bg-gray-400 transition-all duration-300"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        {/* Decorative */}
        <div className="mt-16 opacity-20">
          <div className="h-2 rounded-full bg-blue-600"></div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
