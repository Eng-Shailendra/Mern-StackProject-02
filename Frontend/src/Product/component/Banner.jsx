import React from "react";
import { Link } from "react-router-dom";
import banner from "../../../Public/assets/Banner.png";

const Banner = ({
  title = "Discover Amazing Products",
  subtitle = "Quality items at unbeatable prices — curated just for you.",
  image = "/banner-default.jpg",
  ctaText = "Shop Now",
  ctaLink = "/shop",
}) => {
  return (
    <section className="w-full">
      <div
        className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] w-full bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-label="Promotional banner rotate-1.75rem "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

        <div className="relative mx-auto px-6 sm:px-8 md:px-12 lg:px-20 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              {title}
            </h1>
            <p className="mt-4 text-white/90 text-sm sm:text-base md:text-lg max-w-xl">
              {subtitle}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items_center gap-3 justify-center md:justify-start">
              <Link
                to={ctaLink}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md text-sm font-medium transition"
              >
                {ctaText}
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/90 hover:bg-white text-gray-800 rounded-lg text-sm font-medium transition"
              >
                Explore
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="hidden md:block w-72 sm:w-96 lg:w-[420px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={banner}
                alt="Banner preview"
                className="w-full h-full object-cover transform hover:scale-105 transition"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
