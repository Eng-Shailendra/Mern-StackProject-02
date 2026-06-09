import React from "react";
import { Search, SlidersHorizontal, Package, ChevronDown } from "lucide-react";

const SearchComponet = ({ items }) => {
  return (
    <>
      {/* Search Section */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 rounded-2xl shadow-sm px-4 py-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-2/3">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              />

              <input
                placeholder="Search products..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition">
              <SlidersHorizontal size={18} />
              Filters
            </button>
          </div>

          {/*  Right Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Package size={18} className="text-blue-500" />
              <span>{items} Products</span>
            </div>

            <div className="relative">
              <select className="appearance-none px-4 py-3 border border-gray-200 rounded-xl pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Popular</option>
                <option>Newest</option>
                <option>Price Low → High</option>
                <option>Price High → Low</option>
              </select>

              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponet;
