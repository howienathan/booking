import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, Loader2, Upload, Trash2, ArrowLeft } from 'lucide-react';

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

  // fetch product from product page
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
  // untuk mengganti image(opsional)
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
// remove image dari edit
  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };
// submit kalo dah selesai edit product
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
// output dari edit
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

      await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-slate-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Product not found</h2>
          <button
            onClick={() => navigate("/product")}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back to Product
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/product")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </button>

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-green-900">Success!</h3>
              <p className="text-sm text-green-800">Product updated successfully. Redirecting...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Product</h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
            {/* Product Info Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">Product Information</h2>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Stock <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  rows="4"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Enter product description"
                  required
                />
              </div>
            </div>

           
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">Current Images</h2>
              {product?.img && product.img.length > 0 ? (
                <div className="grid grid-cols-4 gap-3">
                  {product.img.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={`http://localhost:5000/uploads/${img}`}
                        className="w-full h-24 object-cover rounded-lg border border-slate-200 hover:border-slate-300 transition"
                        alt={`product ${index}`}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No images yet</p>
              )}
            </div>

            {/* New Images Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-900 pb-4 border-b border-slate-200">Upload New Images</h2>

              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition">
                <input
                  type="file"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="file-input"
                  accept="image/*"
                />
                <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">Click to upload or drag and drop</span>
                  <span className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</span>
                </label>
              </div>

              {previewUrls.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-slate-700 mb-3">Preview ({previewUrls.length})</p>
                  <div className="grid grid-cols-4 gap-3">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url || "/placeholder.svg"}
                          className="w-full h-24 object-cover rounded-lg border border-slate-200 hover:border-slate-300 transition"
                          alt={`preview ${index}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate("/products")}
                className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-medium rounded-lg hover:bg-slate-300 transition flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting || success}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-slate-400 transition flex items-center justify-center gap-2"
              >
              {/* load submit */}
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
