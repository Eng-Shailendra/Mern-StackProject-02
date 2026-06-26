import React, { useState } from "react";
import {
  Package,
  FileText,
  IndianRupee,
  Boxes,
  Tag,
  ImagePlus,
} from "lucide-react";
import { useAdmin } from "../../Featrus/hook/useAdmin";

const CreateProductPage = () => {
  const { createProduct } = useAdmin();

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(productData);
      await createProduct(productData);
      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Product
          </h1>
          <p className="text-gray-500 mt-2">
            Add a new product to your store inventory.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Package size={18} />
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FileText size={18} />
                Description
              </label>

              <textarea
                rows={5}
                name="description"
                value={productData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Price & Stock */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <IndianRupee size={18} />
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <Boxes size={18} />
                  Stock
                </label>

                <input
                  type="number"
                  name="stock"
                  value={productData.stock}
                  onChange={handleChange}
                  placeholder="Available stock"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Tag size={18} />
                Category
              </label>

              <select
                name="category"
                value={productData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select Category</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="groceries">Groceries</option>
                <option value="furniture">Furniture</option>
                <option value="sports">Sports</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <ImagePlus size={18} />
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 cursor-pointer"
                required
              />

              {productData.image && (
                <p className="text-sm text-green-600 mt-2">
                  Selected: {productData.image.name}
                </p>
              )}
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Create Product
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProductPage;
