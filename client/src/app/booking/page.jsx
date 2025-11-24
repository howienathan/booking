"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { Search, Loader2, AlertCircle, ShoppingBag } from 'lucide-react';
import HeaderSection from "../../../components/header-Section";


const Booking = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/signin");
    }
  }, [router]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // fetching product dari product page be
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

  // filter product untuk search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // handle untuk checkout product kalo stock nya abis muncul alert sudah abis
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Memuat produk...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <HeaderSection title="Produk" subTitle="Our service is the best for yall and comment us if u want too!!" />
      
      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6">
        <div className="mb-12">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-card text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const imageUrl = product.img?.[0]
                ? `http://localhost:5000/uploads/${product.img[0]}`
                : null;

              const isOutOfStock =
                product.stock !== "" &&
                product.stock != null &&
                Number(product.stock) === 0;

              return (
                <div
                  key={product._id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  <div className="h-56 bg-muted flex items-center justify-center overflow-hidden relative">
                    {imageUrl ? (
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Tidak ada gambar</p>
                      </div>
                    )}
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">Habis</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex flex-col grow">
                    <div className="grow mb-4">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {product.desc}
                      </p>

                      {product.stock !== "" && product.stock != null && (
                        <div className="flex items-center gap-2 mb-4">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isOutOfStock ? "bg-red-500" : "bg-green-500"
                            }`}
                          />
                          <p className={`text-xs font-medium ${
                            isOutOfStock
                              ? "text-red-600"
                              : "text-green-600"
                          }`}>
                            {isOutOfStock ? "Habis" : `${product.stock} layanan/product`}
                          </p>
                        </div>
                      )}

                      <p className="text-2xl font-bold text-primary">
                        Rp {product.price?.toLocaleString("id-ID")}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCheckout(product)}
                      disabled={isOutOfStock}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-200 text-white bg-pink-400 ${
                        isOutOfStock
                          ? "bg-muted text-muted-foreground bg-pink-900 cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
                      }`}
                    >
                      {isOutOfStock ? "Habis" : "Tambah ke Keranjang"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Produk tidak ditemukan
            </h3>
            <p className="text-muted-foreground text-center">
              Coba ubah pencarian Anda atau lihat semua produk kami
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
