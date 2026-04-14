import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Upload,
  Trash2,
  ArrowLeft,
} from "lucide-react";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState("");
  const [newImages, setNewImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const data = res.data.find((p) => p._id === id);

      if (!data) {
        setError("Product not found");
        return;
      }

      setProduct(data);
      setName(data.name);
      setPrice(data.price);
      setDesc(data.desc);
      setStock(data.stock ?? "");
    } catch (error) {
      console.error("gagal fetching product:", error);
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  // upload image
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImages([...newImages, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrls((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // remove image
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      if (!name.trim() || !price || !desc.trim()) {
        setError("Please fill in all required fields");
        setSubmitting(false);
        return;
      }

      // 🔥 VALIDASI STOCK MAX 10
      if (stock !== "" && Number(stock) > 10) {
        setError("Stock maksimal hanya 10");
        setSubmitting(false);
        return;
      }

      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);

      if (stock !== "" && stock !== null) {
        formData.append("stock", Number(stock));
      }

      if (newImages.length > 0) {
        newImages.forEach((file) => formData.append("images", file));
      }

      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      setSuccess(true);
      setTimeout(() => navigate("/product"), 1500);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update product");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate("/product")} className="mb-4 flex gap-2">
        <ArrowLeft /> Back
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Success!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 border"
          required
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-full p-3 border"
          required
        />

        {/* 🔥 STOCK FIX */}
        <input
          type="number"
          value={stock}
          min={0}
          max={10}
          onChange={(e) => {
            const value = e.target.value;

            if (value > 10) {
              setError("Stock maksimal hanya 10");
            } else {
              setError(null);
            }

            setStock(value);
          }}
          placeholder="Stock (max 10)"
          className="w-full p-3 border"
        />

        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          className="w-full p-3 border"
          required
        />

        {/* old images */}
        <div className="grid grid-cols-3 gap-2">
          {product?.img?.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5000/uploads/${img}`}
              className="h-20 object-cover"
            />
          ))}
        </div>

        {/* upload */}
        <input type="file" multiple onChange={handleImageUpload} />

        {/* preview */}
        <div className="grid grid-cols-3 gap-2">
          {previewUrls.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} className="h-20 object-cover" />
              <button
                type="button"
                onClick={() => removeNewImage(i)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1"
              >
                X
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={submitting || success}
          className="w-full bg-black text-white py-3"
        >
          {submitting ? "Loading..." : "Save"}
        </button>

      </form>
    </div>
  );
};

export default EditProduct;