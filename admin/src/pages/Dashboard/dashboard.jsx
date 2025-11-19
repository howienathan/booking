"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data);
      } catch (err) {
        console.log("ERROR FETCH:", err.response?.data || err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/bookings/${id}/status`, {
        status,
      });

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err);
    }
  };

  return (
    <div className="px-10 py-10">

      <div className="flex justify-center mb-10">
        <h1 className="pt-5 font-semibold text-2xl text-gray-800">
          Where u can absolutely controll everything in your project 😈😈
        </h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Last bookings</h2>
            <p className="text-sm text-gray-500">
              {bookings.length} total bookings
            </p>
          </div>

          <div className="flex gap-10 text-right">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status === "Done").length}
              </p>
              <p className="text-sm text-gray-500">Done</p>
            </div>

            <div>
              <p className="text-2xl font-bold text-gray-900">
                {bookings.filter((b) => b.status !== "Done").length}
              </p>
              <p className="text-sm text-gray-500">In progress</p>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-600 py-10">Loading bookings...</p>
        )}

        {/* No Data */}
        {!loading && bookings.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            No bookings found 😢
          </p>
        )}

        {/* Table */}
        {!loading && bookings.length > 0 && (
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="py-3 px-2"></th>
                <th className="py-3 px-2">Pesanan</th>
                <th className="py-3 px-2">Nama Pemesan</th>
                <th className="py-3 px-2">Jumlah</th>
                <th className="py-3 px-2">Total Price</th>
                <th className="py-3 px-2">Tanggal</th>
                <th className="py-3 px-2">Time</th>
                <th className="py-3 px-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  
                  <td className="py-4 px-2">
                    <input type="checkbox" />
                  </td>

                  <td className="py-4 px-2 font-medium">
                    {b.productName}
                  </td>

                  <td className="py-4 px-2">
                    {b.userName}
                  </td>

                  <td className="py-4 px-2">{b.qty}</td>

                  <td className="py-4 px-2">
                    Rp {b.totalPrice?.toLocaleString()}
                  </td>

                  <td className="py-4 px-2">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-4 px-2">{b.bookingTime || "-"}</td>

                  <td className="py-4 px-2">
                    <select
                      value={b.status}
                      onChange={(e) => updateStatus(b._id, e.target.value)}
                      className="px-3 py-1 rounded-full border text-sm"
                    >
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

    </div>
  );
};

export default Dashboard;
