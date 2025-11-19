"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AlertCircle, Package, Loader2 } from 'lucide-react';
import HeaderSection from "../../../components/header-Section";

export default function Page() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErrorMsg("You are not logged in.");
      setLoading(false);
      return;
    }

    axios
      .get("http://localhost:5000/api/bookings/my-orders", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          setErrorMsg("Token invalid or expired. Please login again.");
        } else {
          setErrorMsg("Failed to fetch your orders.");
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 max-w-md w-full flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-semibold text-destructive mb-1">Error</h2>
            <p className="text-sm text-foreground">{errorMsg}</p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      completed: "bg-green-500/10 text-green-700 dark:text-green-400",
      cancelled: "bg-red-500/10 text-red-700 dark:text-red-400",
      processing: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    };
    return statusMap[status?.toLowerCase()] || "bg-muted text-foreground";
  };

  return (
    <div className="min-h-screen bg-background"
    >
    <HeaderSection title="Order" subTitle="Tadaaa your order is here take a note and remember your order time!!" />
      <div className="bg-card border-b border-border">
       
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground">
              You havent placed any orders. Start booking now!
            </p>
          </div>
        )}

        <div className="gap-5 grid grid-cols-2 max-md:grid-cols-1 ">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Product
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {order.productName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Quantity
                    </p>
                    <p className="text-lg font-semibold text-foreground mt-1">
                      {order.qty}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      Total Price
                    </p>
                    <p className="text-lg font-semibold text-primary mt-1">
                      Rp {order.totalPrice?.toLocaleString("id-ID") || "0"}
                    </p>
                  </div>
                  <div className="flex items-end gap-2">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      {order.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Order Date
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    {new Date(order.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Order Time
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    {new Date(order.createdAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Booking Time
                  </p>
                  <p className="text-sm text-foreground mt-1">
                    {order.bookingTime || order.time || "-"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
