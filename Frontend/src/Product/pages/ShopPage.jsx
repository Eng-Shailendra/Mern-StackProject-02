import React, { useContext, useState } from "react";
import { productContext } from "../../Featrus/Context/ProductContext";
import useProduct from "../../Featrus/hook/useProduct";
import SearchComponet from "../component/Searchcomponent";
import { Grid3X3 } from "lucide-react";

const categories = ["All", "POPULAR"];

const ShopPage = () => {
  const { product } = useContext(productContext);
  const { loading, getProduct } = useProduct();

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Popular");
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchComponet items={product.length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-28">
            <div className="flex items-center gap-2 mb-5">
              <Grid3X3 size={18} className="text-blue-500" />
              <h2 className="font-bold text-lg">Categories</h2>
            </div>

            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-blue-500 text-white shadow-md"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default ShopPage;
