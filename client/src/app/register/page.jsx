"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
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
      await axios.post("http://localhost:5000/api/users/register", form, {withCredentials: true});
      router.push("/signin");
    } catch (err) {
      setError(err?.response?.data?.message || "Registrasi gagal");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className=" w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>
        )}

        <label className="block mb-3 text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <label className="block mt-4 mb-3 text-sm font-medium">Email</label>
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
          className="w-full bg-pink-400 text-white p-2 rounded mt-6 hover:bg-pink-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}
