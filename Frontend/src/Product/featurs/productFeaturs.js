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

const sortOptions = [
    "Popular",
    "Newest",
    "Price low→high",
    "Price high→low",
];

const ProductPage = () => {
    const [query, setQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sort, setSort] = useState("Popular");

    const filtered = sampleProducts.filter((p) => {
        const matchesQuery = p.title.toLowerCase().includes(query.toLowerCase());
        const matchesCategory =
            activeCategory === "All" || p.category === activeCategory;
        return matchesQuery && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
        if (sort === "Newest") return b.id - a.id;
        if (sort === "Price low→high") return Number(a.price) - Number(b.price);
        if (sort === "Price high→low") return Number(b.price) - Number(a.price);
        return a.id - b.id;
    });

    return (
        <main className="min-h-screen bg-slate-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <section className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl ring-1 ring-white/5">
                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] p-8 lg:p-10">
                        <div className="space-y-6">
                            

                            <div className="grid gap-4 sm:grid-cols-2">
                                

                                <div className="rounded-[1.5rem] bg-white/10 p-5 ring-1 ring-white/10 backdrop-blur">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-slate-400">Showing</p>
                                            <p className="text-3xl font-bold text-white">{filtered.length}</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-slate-200 mb-2">
                                                Sort by
                                            </label>
                                            <select
                                                value={sort}
                                                onChange={(e) => setSort(e.target.value)}
                                                className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                                            >
                                                {sortOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-slate-950/30">
                                <img
                                    src="https://source.unsplash.com/900x900/?shopping,boutique"
                                    alt="Shop hero"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
                    <aside className="rounded-[1.5rem] bg-white p-5 shadow-lg ring-1 ring-slate-200/60">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900">Categories</h2>
                            <span className="text-sm text-slate-500">Filter</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${activeCategory === cat
                                            ? "bg-sky-600 text-white shadow-sm"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </aside>

                    <section className="space-y-8">
                        <Banner
                            image={"https://source.unsplash.com/1600x900/?store,shopping"}
                        />

                        <div className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
                            <div className="mb-5 flex items-center justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.25em] text-sky-500">
                                        Featured
                                    </p>
                                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                                        Top picks for you
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-500">
                                    Refined products based on your search.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {sorted.slice(0, 8).map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-[2rem] bg-white p-6 shadow-lg ring-1 ring-slate-200/80">
                            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
                                        All products
                                    </p>
                                    <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                                        Browse the full collection
                                    </h3>
                                </div>
                                <button className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800">
                                    View all products
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                                {sorted.map((p) => (
                                    <ProductCard key={p.id} product={p} />
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