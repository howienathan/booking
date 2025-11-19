import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

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

  const { name, price, desc, stock, productNumber } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    setPreviewImages(
      selectedFiles.map((file) => URL.createObjectURL(file))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔄 Mulai submit...");

    try {
      // HANDLE PRODUCT NUMBERS
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

      console.log("📦 Product Numbers:", productNumbersArray);

      // BUILD FORM DATA
      const dataToSubmit = new FormData();
      dataToSubmit.append("name", name);
      dataToSubmit.append("price", price);
      dataToSubmit.append("desc", desc);

      // Stock dikirim apa adanya (string), backend yang convert
      if (stock.trim() !== "") {
        dataToSubmit.append("stock", stock);
      }

      // Images
      files.forEach((file) => {
        dataToSubmit.append("images", file);
      });

      console.log("Data yang dikirim:");
      for (let [key, value] of dataToSubmit.entries()) {
        console.log(`${key}:`, value);
      }

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

      console.log("Success:", res.data);
      alert("Product berhasil ditambahkan");
      navigate("/dashboard");

    } catch (error) {
      console.error(" ERROR:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });

      const msg = error.response?.data?.message || "Gagal membuat product";
      alert(`ERROR: ${msg}`);
    }
  };

  return (
    <div className="flex justify-center pt-28 px-4">
      <div className="w-full max-w-xl rounded-2xl p-8 border shadow">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Create Product
        </h1>

        <form onSubmit={handleSubmit} className="gap-5 grid grid-cols-2">

          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="desc"
              value={desc}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md h-28"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              placeholder="(optional)"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="mb-3"
              required
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="preview"
                    className="w-full h-24 object-cover rounded border"
                  />
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="col-span-2 w-full py-3 bg-black text-white rounded-lg"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
