import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState("");

  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      const data = res.data.find((p) => p._id === id);

      if (!data) {
        alert("Product not found");
        return navigate("/products");
      }

      setProduct(data);

      setName(data.name);
      setPrice(data.price);
      setDesc(data.desc);
      setStock(data.stock ?? ""); // kalau undefined, jadikan kosong
    } catch (error) {
      console.error("gagal fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("desc", desc);

      // === STOCK OPTIONAL ===
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

      alert("Product updated!");
      navigate("/product");
    } catch (error) {
      console.log("gagal edit product:", error.response?.data || error.message);
      alert(error.response?.data?.message || "gagal");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6 text-red-500">Product not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label className="block font-semibold mb-1">Name</label>
          <input
            className="w-full p-2 border rounded mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block font-semibold mb-1">Price</label>
          <input
            className="w-full p-2 border rounded mb-4"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label className="block font-semibold mb-1">Description</label>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Stock (optional)</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="(optional)"
            />
          </div>

          <label className="block font-semibold mb-1 mt-4">Current Images</label>
          <div className="flex gap-3 mb-4 overflow-x-auto">
            {product.img?.map((img, index) => (
              <img
                key={index}
                src={`http://localhost:5000/uploads/${img}`}
                className="w-24 h-24 object-cover rounded border"
                alt="product"
              />
            ))}
          </div>

          <label className="block font-semibold mb-1">New Images (optional)</label>
          <input
            type="file"
            multiple
            className="mb-6"
            onChange={handleImageUpload}
          />

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => navigate("/products")}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
