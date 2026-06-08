import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { FaStar } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="bg-slate-950 text-white">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 mb-6">
              <ShoppingBag size={18} />
              <span>Premium Online Shopping</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Discover Amazing
              <span className="block text-emerald-400">Products Online</span>
            </h1>

            <p className="text-zinc-400 mt-6 text-lg max-w-xl">
              Shop the latest products with secure payments, lightning-fast
              delivery, and unbeatable prices.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/products"
                className="flex items-center gap-2 bg-emerald-500 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/about"
                className="border border-zinc-700 px-6 py-3 rounded-xl hover:bg-zinc-900 transition"
              >
                Learn More
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-8">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />

              <span className="text-zinc-400 ml-2">
                Trusted by 10,000+ customers
              </span>
            </div>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
              alt="hero"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 p-8 rounded-2xl">
              <Truck className="text-emerald-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-zinc-400">
                Quick and reliable shipping directly to your doorstep.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl">
              <ShieldCheck className="text-emerald-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
              <p className="text-zinc-400">
                Your transactions are protected with secure payment methods.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl">
              <Headphones className="text-emerald-400 mb-4" size={40} />
              <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
              <p className="text-zinc-400">
                Our support team is always available to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Featured Products</h2>

            <Link
              to="/products"
              className="text-emerald-400 hover:text-emerald-300"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-slate-900 rounded-2xl overflow-hidden"
              >
                <div className="h-60 bg-slate-800"></div>

                <div className="p-5">
                  <h3 className="font-semibold text-lg">Product Name</h3>

                  <p className="text-zinc-400 text-sm mt-2">
                    Product description goes here.
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="text-emerald-400 font-bold">₹999</span>

                    <button className="bg-emerald-500 px-4 py-2 rounded-lg hover:bg-emerald-600">
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready To Start Shopping?
            </h2>

            <p className="text-lg mb-8">
              Browse our collection and discover amazing products today.
            </p>

            <Link
              to="/products"
              className="bg-white text-black px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-2"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
