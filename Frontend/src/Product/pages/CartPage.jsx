import React from "react";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const items = useSelector((state) => state.cart.cartItems);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  if (!items.length) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <ShoppingCart size={80} className="text-gray-300" />
        <h2 className="text-2xl font-bold mt-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mt-2">
          Add some products to continue shopping.
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart ({items.length})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-sm border p-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full sm:w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>

                  <p className="text-green-600 font-bold mt-2">₹{item.price}</p>

                  <div className="mt-3 flex items-center gap-4">
                    <span className="text-gray-600">Qty: {item.quantity}</span>

                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6 h-fit">
          <h2 className="text-xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{items.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>

            <hr />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
