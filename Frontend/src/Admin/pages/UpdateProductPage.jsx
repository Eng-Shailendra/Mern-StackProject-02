import React, { useState } from "react";

const productData = {
  name: "Eyeshadow Palette with Mirror",
  category: "Beauty",
  description:
    "A premium eyeshadow palette with highly pigmented shades and built-in mirror.",
  price: 999,
  stock: 25,
  imageUrls: [
    {
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
  ],
};

const UpdateProductPage = () => {
  const [product, setProduct] = useState(productData);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);
    // API Call Here
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">
          Update Product
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            {/* Product Form */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-6 lg:flex-row">
                {/* Product Image */}
                <div className="shrink-0 overflow-hidden rounded-3xl bg-gray-100">
                  <img
                    src={product.imageUrls[0].url}
                    alt={product.name}
                    className="h-72 w-full object-cover sm:h-80"
                  />
                </div>

                {/* Product Fields */}
                <div className="flex-1 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={product.category}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      rows="5"
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Price & Stock */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="mt-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Image URL
                </label>
                <input
                  type="text"
                  value={product.imageUrls[0].url}
                  onChange={(e) =>
                    setProduct({
                      ...product,
                      imageUrls: [{ url: e.target.value }],
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Summary Panel */}
            <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900">
                Product Preview
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Name</span>
                  <span>{product.name}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Category</span>
                  <span>{product.category}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Price</span>
                  <span>₹{product.price}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Stock</span>
                  <span>{product.stock}</span>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm text-gray-500">
                    Review the updated information before saving.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-3xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Update Product
              </button>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductPage;
