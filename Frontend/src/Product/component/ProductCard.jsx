import React from "react";

const ProductCard = ({ product }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
      <div className="w-full h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-lg font-bold text-gray-900">
            ${product.price}
          </div>
          <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md">
            Add
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
