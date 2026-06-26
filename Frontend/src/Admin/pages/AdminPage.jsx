import React, { use, useContext, useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  Boxes,
  AlertTriangle,
  Edit,
  Trash2,
} from "lucide-react";
import { productContext } from "../../Featrus/Context/ProductContext";
import useProduct from "../../Featrus/hook/useProduct";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../Featrus/hook/useAdmin";

const dummyProducts = [
  {
    _id: "1",
    name: "Eyeshadow Palette with Mirror",
    category: "Beauty",
    price: 799,
    stock: 20,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    createdAt: "2026-06-20",
  },
  {
    _id: "2",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    stock: 0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    createdAt: "2026-06-21",
  },
  {
    _id: "3",
    name: "Smart Watch",
    category: "Electronics",
    price: 3999,
    stock: 15,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    createdAt: "2026-06-22",
  },
  {
    _id: "4",
    name: "Leather Backpack",
    category: "Fashion",
    price: 1899,
    stock: 5,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    createdAt: "2026-06-23",
  },
];

const AdminPage = () => {
  const [search, setSearch] = useState("");
  const { getProduct } = useProduct();
  const { product, setProduct } = useContext(productContext);
  const navigate = useNavigate();
  const { deleteProduct } = useAdmin();

  useEffect(() => {
    const getAllProduct = async () => {
      const allproduct = await getProduct();
    };
    getAllProduct();
  }, []);
  let products;
  product ? (products = product) : (products = dummyProducts);

  const filteredProducts = useMemo(() => {
    return products.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalStock = products.reduce((acc, item) => acc + item.stock, 0);

  const outOfStock = products.filter((item) => item.stock === 0).length;

  const handleEdit = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  return (
    <section className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Product Management
            </h1>
            <p className="mt-1 text-gray-500">Manage all your products</p>
          </div>

          <button
            onClick={() => {
              navigate("/admin/add-product");
            }}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            + Add Product
          </button>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {products.length}
                </h2>
              </div>

              <div className="rounded-2xl bg-gray-100 p-3">
                <Package size={28} />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Stock</p>
                <h2 className="mt-2 text-3xl font-bold text-green-600">
                  {totalStock}
                </h2>
              </div>

              <div className="rounded-2xl bg-green-100 p-3">
                <Boxes size={28} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Out Of Stock</p>
                <h2 className="mt-2 text-3xl font-bold text-red-600">
                  {outOfStock}
                </h2>
              </div>

              <div className="rounded-2xl bg-red-100 p-3">
                <AlertTriangle size={28} className="text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-black"
            />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-3xl border bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Stock</th>
                  <th className="px-6 py-4 text-left">Date</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="border-t">
                    {console.log(product.imageUrls[0]?.url)}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.imageUrls[0]?.url}
                          alt={product.name}
                          className="h-16 w-16 rounded-xl object-cover"
                        />

                        <p className="font-medium">{product.name}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">{product.category}</td>

                    <td className="px-6 py-4 font-semibold">
                      ₹{product.price}
                    </td>

                    <td className="px-6 py-4">
                      {product.stock > 0 ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                          {product.stock} Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                          Out Of Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => handleEdit(product._id)}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 hover:bg-blue-200"
                        >
                          <Edit size={18} />
                        </button>

                        <button
                          onClick={() => {
                            deleteProduct(product._id);
                          }}
                          className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="grid gap-4 lg:hidden">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="rounded-3xl border bg-white p-4 shadow-sm"
            >
              <div className="flex gap-4">
                <img
                  src={product.imageUrls[0]?.url}
                  alt={product.name}
                  className="h-24 w-24 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{product.name}</h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {product.category}
                  </p>

                  <p className="mt-2 font-bold">₹{product.price}</p>

                  <div className="mt-2">
                    {product.stock > 0 ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                        {product.stock} Available
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                        Out Of Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="flex-1 rounded-xl bg-blue-100 py-2 text-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                    deleteProduct(product._id);
                  }}
                  className="flex-1 rounded-xl bg-red-100 py-2 text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
