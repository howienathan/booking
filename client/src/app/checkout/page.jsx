"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const [bookingTime, setBookingTime] = useState("")

  const updateQty = (id, newQty) => {
  const item = cart.find((p) => p._id === id);
  if (!item) return;

  // Kalau qty < 1 → hapus item
  if (newQty < 1) {
    const filtered = cart.filter((p) => p._id !== id);
    setCart(filtered);
    localStorage.setItem("cart", JSON.stringify(filtered));
    return;
  }

  // Cek stok
  if (item.stock !== "" && item.stock != null && newQty > item.stock) {
    alert("Tidak boleh melebihi stok!");
    return;
  }

  // Update qty normal
  const updated = cart.map((p) =>
    p._id === id ? { ...p, qty: newQty } : p
  );

  setCart(updated);
  localStorage.setItem("cart", JSON.stringify(updated));
};


  const cancelOrder = () => {
    localStorage.removeItem("cart");
    setCart([]);
    router.push("/booking");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      for (const item of cart) {
        if (item.qty > item.stock) {
          alert(`Stock for ${item.name} tidak cukup!`);
          return;
        }

        await axios.post(
          "http://localhost:5000/api/bookings",
          {
            userName: name || "Guest",
            bookingTime,
            productId: item._id,
            qty: item.qty,
            totalPrice: item.qty * item.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      console.log("bookingtime state:", bookingTime);

      localStorage.removeItem("cart");
      router.push("/");

    } catch (err) {
      console.log("BOOKING ERROR:", err.response?.data || err);
      alert(err.response?.data?.message || "Error booking");
    }
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-xl text-gray-500">Cart is empty.</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-5">
      <div className="bg-white shadow-lg rounded-xl mt-[5rem] p-8 max-w-2xl w-screen">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>

        <div className="space-y-5 mb-8">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-5 p-4 border rounded-lg">
              <img
                src={`http://localhost:5000/uploads/${item.img?.[0]}`}
                className="w-32 h-32 rounded-lg object-cover"
                alt=""
              />

              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.desc}</p>

                <p className="text-lg font-bold text-blue-600 mt-2">
                  Rp {item.price.toLocaleString()}
                </p>

                {/* tambah dan kurang produk */}
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQty(item._id, item.qty - 1)}
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">{item.qty}</span>

                  <button
                    onClick={() => updateQty(item._id, item.qty + 1)}
                    className="px-3 py-1 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    +
                  </button>

                  <p className="text-sm text-gray-400 ml-2">
                    Stock: {item.stock}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      <div>
          <label className="block mb-3 text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-3 text-sm font-medium">time</label>
        <input
          type="time"
          onChange={(e) => setBookingTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        </div>

        <div className="text-right text-xl font-bold mb-5">
          Total: Rp {totalPrice.toLocaleString()}
        </div>

        <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
          <button
            onClick={confirmBooking}
            className="w-full py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 text-lg"
          >
            Confirm Booking
          </button>

          <button
            onClick={cancelOrder}
            className="w-full py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
