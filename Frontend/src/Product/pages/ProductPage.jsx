import React, { useState } from "react";
import Banner from "../component/Banner";
import ProductCard from "../component/ProductCard";

const sampleProducts = Array.from({ length: 12 }).map((_, idx) => ({
  id: idx + 1,
  title: `Product ${idx + 1}`,
  category: idx % 2 === 0 ? "Clothing" : "Accessories",
  price: (19 + idx * 3).toFixed(2),
  image: `https://source.unsplash.com/collection/1163637/800x600?sig=${idx}`,
}));

const categories = [
  "All",
  "Clothing",
  "Accessories",
  "Electronics",
  "Home",
  "Sale",
];

const ProductPage = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = sampleProducts.filter((p) => {
    const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block md:col-span-1">
          <div className="bg-white rounded-lg shadow p-4 sticky top-6">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition ${
                      activeCategory === cat ? "bg-blue-50 font-semibold" : ""
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <section className="md:col-span-3 space-y-6">
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-2/3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-gray-100 rounded-md">
                Filter
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">
                Showing {filtered.length} results
              </div>
              <select className="px-3 py-2 border rounded-md">
                <option>Sort: Popular</option>
                <option>Sort: Newest</option>
                <option>Sort: Price low→high</option>
              </select>
            </div>
          </div>

          {/* Banner / Carousel */}
          <div>
            <Banner
              image={"https://source.unsplash.com/1600x900/?store,shopping"}
            />
          </div>

          {/* Featured / product list grid */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Featured Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtered.slice(0, 8).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* All products section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">All Products</h3>
              <button className="text-sm text-blue-600">View More</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductPage;
