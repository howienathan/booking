import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");

  const [files, setFiles] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    stock: "",
    productNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { name, price, desc, stock, productNumber } = formData;

  // handle untuk jika admin belum login akan di arahkan ke login page 
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // fungsi untuk change data
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  // fungsi untuk handle file change
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    setPreviewImages(
      selectedFiles.map((file) => URL.createObjectURL(file))
    );
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // change validasi sebelum submit kalo belom ada image nya
      if (!name.trim() || !price || !desc.trim() || files.length === 0) {
        setError("Please fill in all required fields and add at least one image");
        setIsLoading(false);
        return;
      }

      let productNumbersArray = [];

      if (productNumber.trim() !== "") {
        productNumbersArray = productNumber
          .split(",")
          .map((item) => {
            const num = parseInt(item.trim(), 10);
            if (!isNaN(num)) {
              return {
                number: num,
                unavailableDates: [],
              };
            }
            return null;
          })
          .filter(Boolean);
      }

      const dataToSubmit = new FormData();
      dataToSubmit.append("name", name);
      dataToSubmit.append("price", price);
      dataToSubmit.append("desc", desc);

      if (stock.trim() !== "") {
        dataToSubmit.append("stock", stock);
      }

      files.forEach((file) => {
        dataToSubmit.append("images", file);
      });

      // response tunggu axios post untuk data sumbit dari product
      const res = await axios.post(
        "http://localhost:5000/api/products",
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setSuccess(true);
      setFormData({ name: "", price: "", desc: "", stock: "", productNumber: "" });
      setFiles([]);
      setPreviewImages([]);
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      const msg = error.response?.data?.message || error.message || "Gagal membuat product";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 tracking-tight">
            Create Product
          </h1>
          <p className="text-lg text-slate-600">Add a new product to your store</p>
        </div>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-green-700 text-sm font-medium">Product created successfully! Redirecting...</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">

          <div className="space-y-8">

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-200">Product Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                <div className="sm:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    placeholder="Enter Your Product Name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Price (IDR) *</label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange}
                    placeholder="0"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description *</label>
                  <textarea
                    name="desc"
                    value={desc}
                    onChange={handleChange}
                    placeholder="Describe your product features and benefits..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition resize-none"
                    rows="5"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-200">Inventory & Details</h2>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={stock}
                    onChange={handleChange}
                    placeholder="Give stock at least 10 if u can make those jobs 10 a day"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                  />
                </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-5 pb-3 border-b border-slate-200">Product Images *</h2>
              
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-slate-400 transition cursor-pointer bg-slate-50">
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept="image/*"
                  required
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-semibold text-slate-900 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {previewImages.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-700 mb-4">
                    {previewImages.length} image{previewImages.length !== 1 ? "s" : ""} selected
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previewImages.map((src, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`preview-${idx}`}
                          className="w-full h-32 object-cover rounded-lg border border-slate-200 group-hover:border-slate-400 transition"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 rounded-lg transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 disabled:bg-slate-400 transition flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating product...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Product Created!
                </>
              ) : (
                "Create Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;