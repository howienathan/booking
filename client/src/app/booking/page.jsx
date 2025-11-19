"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import HeaderSection from "../../../components/header-Section";

const Booking = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null); 

  const router = useRouter();

  // Proteksi login
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/signin");
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  // Search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // add to cart
  // kalo product abis
const handleCheckout = (product) => {
  if (product.stock !== "" && product.stock != null && Number(product.stock) === 0) {
    setToast(`${product.name} sudah habis!`);
    setTimeout(() => setToast(null), 2500);
    return;
  }

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const idx = cart.findIndex((item) => item._id === product._id);

  if (idx !== -1) {
    cart[idx].qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  setToast(`${product.name} added to cart!`);
  setTimeout(() => setToast(null), 2500);
};


  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    
    <div>
    <HeaderSection title="Product" subTitle="Lorem ipsum dolor sit amet." />
      <div>
      <div className="max-w-5xl pt-32 mx-auto">
        {toast && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg duration-75 animate-bounce">
            {toast}
          </div>
        )}

         <div className="item-center mb-8">
          <h1 className='text-4xl text-center font-semibold max-md:text-xl'>All Memoriest About Salon Mimi</h1>
          <p className="text-center max-md:text-sm mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eveniet esse reiciendis accusantium voluptatum consequatur laboriosam qui voluptates itaque facere.</p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
            <div className="grid grid-cols-1 mx-8 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const imageUrl = product.img?.[0]
              ? `http://localhost:5000/uploads/${product.img[0]}`
              : null;

            return (
              <div
                key={product._id}
                className="bg-white my-8 rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition-all flex flex-col"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-400">No Image</p>
                  )}
                </div>

                <div className="p-6 flex flex-col grow">
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{product.desc}</p>
                    {product.stock !== "" && product.stock != null && (
                      <p className="text-gray-700 mt-1">Stock: {product.stock}</p>
                    )}
                    <p className="text-2xl font-bold text-blue-600 mt-4">
                      Rp {product.price?.toLocaleString()}
                    </p>
                  </div>

                  
                  <button
                    onClick={() => handleCheckout(product)}
                    className="w-full mt-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-pink-500 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>


        {filteredProducts.length === 0 && (
          <div className="text-center py-10">
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Booking;
