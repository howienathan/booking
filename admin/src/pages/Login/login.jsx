import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users/login",
      { email, password },
      { withCredentials: true }
    );

    dispatch(loginUser({ email, password }));

    // simpan token yang benar
    localStorage.setItem("token", res.data.token);

    alert("Login berhasil!");
    navigate("/dashboard");
  } catch (err) {
    alert("Email atau password salah!");
  }
};

useEffect(() => {
  if (token) navigate("/dashboard");
}, [token]);

  useEffect(() => {
    console.log("token :", token)
    if (token) {
      navigate("/dashboard")
    }
  });



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className=" space-y-4"
      >
        <h2 className="text-2xl font-bold text-pink-400 text-center mb-4">Time to enter ur universe</h2>
        <p className="text-center font-sans ">ready to enter universe as admin in this dashboard?</p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-400 font-bold text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
