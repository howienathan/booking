import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Search, Edit2, Trash2, Package, AlertCircle } from 'lucide-react';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // effect to fetch product
  useEffect(() => {
    fetchProducts();
  }, []);

  // fetching product dari product page

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // fungsi untuk delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login first.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      // alert untuk berhasil atau gagalnya 
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  // fungsi untuk edit product yang akan di arahkan ke edit product
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  // filter product search

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-spin"></div>
            <div className="absolute inset-1 bg-slate-800 rounded-full"></div>
            <Package className="absolute inset-3 text-blue-400 animate-pulse" />
          </div>
          <p className="text-slate-300 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
              <Package className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-black">Product Control</h1>
          </div>
          <p className="text-slate-600 ml-11">Manage all your products efficiently</p>
        </div>

        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-800" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-600 rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Product Table */}
        {filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="bg-white backdrop-blur-sm rounded-xl border border-slate-600/50 shadow-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-300 to-slate-500 border-b border-slate-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">No</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Image</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Product Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Stock</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product, idx) => {
                    const imageUrl = product.img?.[0]
                      ? `http://localhost:5000/uploads/${product.img[0]}`
                      : null;
                    
                    const stockStatus = product.stock > 20 ? "bg-emerald-500/20 text-emerald-700" : 
                                       product.stock > 5 ? "bg-yellow-500/20 text-yellow-700" : 
                                       "bg-red-500/20 text-red-700";

                    return (
                      <tr 
                        key={product._id} 
                        className="border-b border-slate-600/30 hover:bg-slate-600/30 transition duration-200"
                      >
                        <td className="px-6 py-4 text-sm text-black font-medium">{idx + 1}</td>
                        <td className="px-6 py-4">
                          {imageUrl ? (
                            <img
                              src={imageUrl || "/placeholder.svg"}
                              alt={product.name}
                              className="w-14 h-14 object-cover rounded-lg shadow-lg border border-slate-500/50"
                            />
                          ) : (
                            <div className="w-14 h-14 bg-slate-600/50 rounded-lg flex items-center justify-center border border-slate-500/50">
                              <Package className="w-6 h-6 text-slate-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-black">{product.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus}`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-cyan-400">
                          Rp {product.price?.toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(product._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-105"
                            >
                              <Edit2 className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white font-medium rounded-lg transition duration-200 transform hover:scale-105"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Results count */}
            <p className="text-slate-400 text-sm mt-4">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-700/20 rounded-xl border border-slate-600/30">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No products found
            </h3>
            <p className="text-slate-400 mb-6">
              {searchQuery 
                ? "Try searching with different keywords." 
                : "Start adding products to your inventory."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
