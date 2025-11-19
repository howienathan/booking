import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "" 
  });

  const { name, email, password, password2 } = formData; 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validasi password
    if (password !== password2) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const userData = {
        name,
        email, 
        password,
      };

      console.log(" Register data:", userData);

      const res = await axios.post(
        "http://localhost:5000/api/users",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(" Register success:", res.data);
      alert("Registration success");
      navigate("/login");

    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert("Registration failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold text-center text-pink-400 font-sans mb-4">Time to make your universe to be real</h2>
        <p className="text-center font-sans mb-4">its your time for make anything you need for ur need? hehe</p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded"
          value={password2}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-pink-400 text-white py-2 rounded hover:bg-pink-600 duration-200"
        >
          Register
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;