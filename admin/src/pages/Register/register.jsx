import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerUser, reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const Register = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { name, password, email } = formData;

  useEffect(() => {

    if(isSuccess) {
      navigate("/login")
      dispatch(reset())
    }

  }, [isSuccess, user, dispatch, navigate])

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      name,
      email,
      password,
    };

    dispatch(registerUser(dataToSubmit))
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-28 px-4">
      {/* Kata pengantar */}
      <h1 className="font-semibold font-sans text-3xl text-center mb-3">
        Time to enter your universe.
      </h1>
      <p className="max-w-md text-center text-gray-600 mb-10">
        That familiar password is your ticket back—your space is exactly as you left it, waiting to welcome you home.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"   
            value={name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block mb-1 font-medium">Password</label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Toggle icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-600 hover:text-black"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-gray-800"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
