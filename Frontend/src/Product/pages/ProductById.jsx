import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../Featrus/hook/useProduct";
import useCartFeaturs from "../featurs/cartFeaturs";

let demoProduct = {
  name: "cat",
  description: "this demo cate discription",
  price: 400,
  category: "toy",
  stock: 12,
  imageUrls: [
    {
      url: "https://res.cloudinary.com/dorcc0tax/image/upload/v1780745397/wvcniqsy",
      _id: "6a2404b4d6984424980f1eb9",
    },
  ],
  admin: "6a23d95350bc75e5a5368de9",
  rating: 0,
  numReviews: 0,
  createdAt: "2026-06-06T11:29:57.011+00:00",
};

const ProductById = () => {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = demoProduct.price * quantity;
  const { getProductById } = useProduct();
  const { id } = useParams();
  useEffect(() => {
    const getprodcut = async () => {
      const product = await getProductById(id);
      console.log(product);
      if (product) demoProduct = product;
    };
    getprodcut();
  }, [id]);

  const { handleAddToCart } = useCartFeaturs();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-semibold text-gray-900">Your Cart</h1>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row">
              <div className="shrink-0 overflow-hidden rounded-3xl bg-gray-100">
                <img
                  src={demoProduct.imageUrls[0].url}
                  alt={demoProduct.name}
                  className="h-72 w-full object-cover sm:h-80"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600">
                    {demoProduct.category}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-gray-900">
                    {demoProduct.name}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-gray-600">
                    {demoProduct.description}
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Price
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      ₹{demoProduct.price}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                      Stock
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-gray-900">
                      {demoProduct.stock}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-5">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-semibold text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="h-10 w-10 rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-lg font-semibold text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prev) =>
                        Math.min(demoProduct.stock, prev + 1),
                      )
                    }
                    className="h-10 w-10 rounded-full bg-blue-50 text-blue-700 transition hover:bg-blue-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Order created at{" "}
                {new Date(demoProduct.createdAt).toLocaleDateString()}.
              </p>
            </div>
          </div>

          <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h3>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Product</span>
                <span>{demoProduct.name}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Price</span>
                <span>₹{demoProduct.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>
            <button
              onClick={() =>
                handleAddToCart({
                  _id: id,
                  name: demoProduct.name,
                  price: demoProduct.price,
                  quantity: quantity,
                  imageUrl: demoProduct.imageUrls[0].url,
                })
              }
              className="mt-8 w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add to Cart now
            </button>
            <button className="mt-8 w-full rounded-3xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Checkout now
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ProductById;
