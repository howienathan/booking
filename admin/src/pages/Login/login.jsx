import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch,useSelector } from "react-redux";  
import { loginUser, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const dispatch = useDispatch(); 
  const  navigate = useNavigate();
  const { user, isSuccess } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const { password, email } = formData;

   useEffect(() => {

    if(isSuccess) {
      navigate("/dashboard")
      dispatch(reset())
    }

  }, [isSuccess, user, dispatch, navigate])

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      email,
      password,
    };

    dispatch(loginUser(dataToSubmit));
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-28 px-4">
      
      <h1 className="font-semibold font-sans text-3xl text-center mb-3">
        Time to enter your universe.
      </h1>
      <p className="max-w-md text-center text-gray-600 mb-10">
        That familiar password is your ticket back—your space is exactly as you left it.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5"
      >
        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="text"
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
          className="w-full mt-4 py-2 bg-primary text-white rounded-md hover:bg-pink-500 duration-300"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
