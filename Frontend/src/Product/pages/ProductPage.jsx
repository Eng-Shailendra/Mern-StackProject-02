import React, { useContext, useEffect, useMemo, useState } from "react";
import { Grid3X3 } from "lucide-react";

import Banner from "../component/Banner";
import ProductCard from "../component/ProductCard";
import useProduct from "../../Featrus/hook/useProduct.js";
import { productContext } from "../../Featrus/Context/ProductContext";
import LoadingOverlay from "../../Component/LodingOverlay.jsx";
import SearchComponet from "../component/SearchComponent.jsx";
import ProductFeaturedComponent from "../component/ProductFeaturedComponent.jsx";
import { useNavigate } from "react-router-dom";
import image from "../../../Public/assets/Banner.png";

const categories = ["All", "POPULAR"];

const ProductPage = () => {
  const { loading, getProduct } = useProduct();
  const { product } = useContext(productContext);

  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    getProduct();
  }, []);

  const handleStore = () => {
    navigate("/shop");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {loading && <LoadingOverlay />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Category */}
        <div className="md:hidden mb-6">
          <select className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {/* Content */}
          <section className="md:col-span-4 md:row-span-4 space-y-8">
            {/* Banner */}
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Banner image={image} />
            </div>

            {/* Featured Products */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Featured Products
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {product.slice(0, 4).map((item) => (
                  <ProductFeaturedComponent
                    key={item._id || item.id}
                    product={item}
                  />
                ))}
              </div>
            </div>

            {/* All Products */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  All Products
                </h2>
                <button
                  onClick={handleStore}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  View More
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {product.slice(0, 8).map((item) => (
                  <ProductCard
                    key={item._id || item.id}
                    product={item}
                    source={"home"}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
