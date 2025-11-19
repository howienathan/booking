"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, AlertCircle, CheckCircle2, Clock, XCircle, Eye } from 'lucide-react';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError("Failed to fetch bookings");
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

  const stats = {
    total: bookings.length,
    done: bookings.filter((b) => b.status === "Done").length,
    inProgress: bookings.filter((b) => b.status === "In Progress").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  const getStatusStyles = (status) => {
    const styles = {
      "Done": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900",
      "In Progress": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900",
      "Cancelled": "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900",
    };
    return styles[status] || "bg-muted text-foreground border-border";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done":
        return <CheckCircle2 className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-lg p-4 max-w-md">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
          <p className="text-sm text-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Bookings Dashboard</h1>
          <p className="text-muted-foreground">Manage and track all your bookings in one place</p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <p className="text-sm font-medium text-muted-foreground mb-2">Total Bookings</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Completed</p>
              <p className="text-3xl font-bold text-foreground">{stats.done}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">In Progress</p>
              <p className="text-3xl font-bold text-foreground">{stats.inProgress}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
              <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Cancelled</p>
              <p className="text-3xl font-bold text-foreground">{stats.cancelled}</p>
            </div>
          </div>
        )}

        {/* Table section */}
        <div className="bg-card border border-border rounded-lg shadow-sm overflow-hidden">
          
          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-3" />
              <p className="text-muted-foreground">Loading bookings...</p>
            </div>
          )}

          {/* Empty state */}
          {!loading && bookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Eye className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
              <p className="text-foreground font-medium">No bookings yet</p>
              <p className="text-muted-foreground text-sm">Your bookings will appear here</p>
            </div>
          )}

          {/* Table */}
          {!loading && bookings.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Time</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bookings.map((b, i) => (
                    <tr key={i} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-foreground">{b.productName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{b.userName}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{b.qty}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-primary">Rp {b.totalPrice?.toLocaleString("id-ID")}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{new Date(b.createdAt).toLocaleDateString("id-ID")}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-foreground">{b.bookingTime || "-"}</p>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b._id, e.target.value)}
                          className={`px-3 py-2 rounded-md border text-sm font-medium transition-colors cursor-pointer ${getStatusStyles(b.status)}`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
