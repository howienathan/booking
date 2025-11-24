"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
        // generate token user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      router.push("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm"
      >
      <div className="pb-8">
        <h2 className="text-2xl font-bold text-center mb-6">Time to enter your universe.</h2>
        <p className="text-center text-lg">That familiar password is your ticket back your space is exactly as you left it, waiting to welcome you home.</p>
      </div>
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>
        )}

        <label className="block mb-3 text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <label className="block mt-4 mb-3 text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-pink-400 text-white p-2 rounded mt-6 hover:bg-pink-600 duration-200"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
