import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Upload, AlertCircle, CheckCircle2 } from "lucide-react";

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

  // redirect kalau belum login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // handle input
  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔥 validasi langsung untuk stock
    if (name === "stock") {
      if (value > 10) {
        setError("Stock maksimal hanya 10");
      } else {
        setError("");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle file
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    setPreviewImages(
      selectedFiles.map((file) => URL.createObjectURL(file))
    );
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (!name.trim() || !price || !desc.trim() || files.length === 0) {
        setError("Please fill in all required fields and add at least one image");
        setIsLoading(false);
        return;
      }

      // 🔥 VALIDASI STOCK MAX 10
      if (stock && Number(stock) > 10) {
        setError("Stock maksimal hanya 10");
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

      await axios.post(
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
      setFormData({
        name: "",
        price: "",
        desc: "",
        stock: "",
        productNumber: "",
      });
      setFiles([]);
      setPreviewImages([]);

      setTimeout(() => {
        navigate("/product");
      }, 1500);

    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Gagal membuat product";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pt-10 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="mb-8 grid gap-4 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                New product
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-900">
                Create Product
              </h1>
              <p className="mt-2 text-slate-600">
                Add a new item to your catalog with stunning visuals and clear details.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-slate-50 p-5 text-sm text-slate-600">
              <p className="font-medium text-slate-800">Pro tip</p>
              <p className="mt-2 leading-6">
                Keep stock below 10, add rich descriptions, and upload sharp images for better results.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-[1.5rem] border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-sm shadow-red-50/80">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mb-6 rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 shadow-sm shadow-emerald-50/80">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                <p>Product created successfully!</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Product name</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Price</span>
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                  required
                />
              </label>
            </div>

            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Description</span>
              <textarea
                name="desc"
                value={desc}
                onChange={handleChange}
                placeholder="Write a short product description"
                className="min-h-[140px] w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                required
              />
            </label>

            <div className="grid gap-6 ">
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Stock (max 10)</span>
                <input
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={handleChange}
                  min={0}
                  max={10}
                  placeholder="0"
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white"
                />
              </label>
              
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-700">Product images</p>
                  <p className="text-xs text-slate-500">Upload one or more image files</p>
                </div>
              </div>
              <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-[1.5rem] border-2 border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-600 transition hover:border-slate-900 hover:text-slate-900">
                <Upload className="h-5 w-5" />
                <span>Click to upload or drag files here</span>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {previewImages.length > 0 && (
              <div className="grid gap-3 sm:grid-cols-3">
                {previewImages.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-sm">
                    <img src={src} alt={`Preview ${i + 1}`} className="h-28 w-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || success}
              className="inline-flex w-full items-center justify-center rounded-[1.5rem] bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Loading..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;