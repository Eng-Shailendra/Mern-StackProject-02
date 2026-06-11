import React from "react";
import useProductFeature from "../featurs/productFeaturs";
import useCartFeaturs from "../featurs/cartFeaturs";
import { Minus, Plus } from "lucide-react";

const ProductCard = ({ product, source }) => {
  const title = product.name || product.title || "Product";
  const image =
    product.image ||
    product.imageUrl ||
    product.imageUrls?.[0]?.url ||
    "https://via.placeholder.com/400";
  const description =
    product.description ||
    "Modern styling with clean details for everyday use.";
  const rating = 4 + ((product._id?.length || product.id || 1) % 2);
  const { handleMoreBtn } = useProductFeature();
  const { handleAddToCart, handleRemoveToCart } = useCartFeaturs();

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 shadow-sm">
          {product.category}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 leading-snug">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-2xl font-bold text-slate-900">
              ${product.price}
            </div>
            <div className="mt-2 flex items-center gap-1 text-sm text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>{index < rating ? "★" : "☆"}</span>
              ))}
              <span className="ml-2 text-slate-400">({rating}.0)</span>
            </div>
          </div>
          <div className="flex justify-between gap-1 ">
            {source === "home" && (
              <button
                onClick={handleMoreBtn}
                className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
              >
                More
              </button>
            )}
            {source === "shop" && (
              <button className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500">
                <Minus
                  onClick={() => {
                    handleRemoveToCart(product);
                  }}
                />
              </button>
            )}

            <button className="rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500">
              {source === "shop" ? (
                <Plus
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                />
              ) : (
                "add"
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
