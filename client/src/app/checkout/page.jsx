"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [timeCounts, setTimeCounts] = useState({});
  const router = useRouter();

  // Ambil cart
useEffect(() => {
  const loadCounts = async () => {
    const res = await axios.get("http://localhost:5000/api/bookings/time-count");
    setTimeCounts(res.data);
  };

  loadCounts();
  const interval = setInterval(loadCounts, 5000);

  return () => clearInterval(interval);
}, []);


useEffect(() => {
  const stored = localStorage.getItem("cart");
  if (stored) {
    setCart(JSON.parse(stored));
  }
}, []);



  // Generate waktu booking
  const generateTimes = () => {
    const times = [];
    for (let h = 9; h <= 18; h++) {
      const hh = h.toString().padStart(2, "0");
      times.push(`${hh}:00`);
      times.push(`${hh}:40`);
    }
    return times;
  };

  const timeSlots = generateTimes();

  // Update qty
  const updateQty = (id, newQty) => {
    const item = cart.find((p) => p._id === id);
    if (!item) return;

    if (newQty < 1) {
      const filtered = cart.filter((p) => p._id !== id);
      setCart(filtered);
      localStorage.setItem("cart", JSON.stringify(filtered));
      return;
    }

    if (item.stock !== "" && item.stock != null && newQty > item.stock) {
      alert("Tidak boleh melebihi stok!");
      return;
    }

    const updated = cart.map((p) =>
      p._id === id ? { ...p, qty: newQty } : p
    );

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // Cancel cart
  const cancelOrder = () => {
    localStorage.removeItem("cart");
    setCart([]);
    router.push("/booking");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  // Confirm booking
  const confirmBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!bookingTime) {
        alert("Pilih waktu dulu!");
        return;
      }

      // Cek slot penuh
      if (timeCounts[bookingTime] >= 3) {
        alert("Slot sudah penuh, pilih waktu lain.");
        return;
      }

      for (const item of cart) {
        if (item.qty > item.stock) {
          alert(`Stock untuk ${item.name} tidak cukup!`);
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
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }

      localStorage.removeItem("cart");
      router.push("/");

    } catch (err) {
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

                  <p className="text-sm text-gray-400 ml-2">Stock: {item.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-3 text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Time */}
        <div className="mt-4">
          <label className="block mb-3 text-sm font-medium">Time</label>

          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setBookingTime(e.target.value)}
            required
          >
            <option value="">-- Pilih Waktu --</option>

            {timeSlots.map((time) => {
              const count = timeCounts[time] || 0;
              const disabled = count >= 3;

              return (
                <option key={time} value={time} disabled={disabled}>
                  {time} {disabled ? "(Penuh)" : ""}
                </option>
              );
            })}
          </select>
        </div>

        <div className="text-right text-xl font-bold my-5">
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
