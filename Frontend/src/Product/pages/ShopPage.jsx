import React from "react";
import { productContext } from "../../Featrus/Context/ProductContext";
import useProduct from "../../Featrus/hook/useProduct";
import SearchComponet from "../component/SearchComponent";
import { Grid3X3 } from "lucide-react";

import ProductCard from "../component/ProductCard";
import shopFeaturs from "../featurs/shopFeaturs";

const ShopPage = () => {
  const {
    handleCategoryChange,
    product,
    setQuery,
    query,
    sort,
    setSort,
    activeCategory,
    setActiveCategory,
    sortedProducts,
    filteredProduct,
    categories,
    loading,
  } = shopFeaturs();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchComponet
          items={sortedProducts.length}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 pb-12">
        <aside className="hidden md:block">
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-28">
            <div className="flex items-center gap-2 mb-5">
              <Grid3X3 size={18} className="text-blue-500" />
              <h2 className="font-bold text-lg">Categories</h2>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
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

        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((item) => (
                <ProductCard
                  key={item._id || item.id}
                  product={item}
                  source={"shop"}
                />
              ))
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-600 shadow-sm">
                No products found for your search.
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ShopPage;
