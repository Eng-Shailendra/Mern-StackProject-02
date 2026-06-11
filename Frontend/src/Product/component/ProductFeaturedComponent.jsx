import React from "react";
import { useNavigate } from "react-router-dom";

const ProductFeaturedComponent = ({ product }) => {
  const title = product.name || product.title || "Product";
  const image =
    product.image ||
    product.imageUrl ||
    product.imageUrls?.[0]?.url ||
    "https://via.placeholder.com/400";

  const navigate = useNavigate();

  const handleDBClick = () => {
    navigate(`/shop?category=${product.category}`);
  };
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          onDoubleClick={handleDBClick}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
          {product.category}
        </span>
      </div>
    </article>
  );
};

export default ProductFeaturedComponent;
