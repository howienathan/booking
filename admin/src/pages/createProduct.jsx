import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    productNumber: ""
  });

  const { name, price, desc, productNumber } = formData;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productArray = productNumber
        .split(",")
        .map((item) => ({
          number: parseInt(item.trim()),
          unavaibleDate: [],
        }));

      // Kirim pakai FormData biar bisa upload file
      const dataToSubmit = new FormData();
      dataToSubmit.append("name", name);
      dataToSubmit.append("price", price);
      dataToSubmit.append("desc", desc);
      dataToSubmit.append("productNumber", JSON.stringify(productArray));

      for (let i = 0; i < files.length; i++) {
        dataToSubmit.append("images", files[i]);
      }

      // Ganti URL sesuai backend kamu
      const res = await axios.post("http://localhost:3000/api/products", dataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product created:", res.data);
      alert("Product berhasil ditambahkan!");
      navigate("/dashboard");

    } catch (error) {
      console.error("Error creating product:", error);
      alert("Gagal membuat product.");
    }
  };

  return (
    <div className="flex justify-center pt-28 px-4">
      <div className="w-full max-w-xl rounded-2xl p-8 border shadow">
        <h1 className="text-4xl font-semibold text-center mb-8">Create Product</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md"
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
              className="w-full px-4 py-2 border border-gray-400 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="desc"
              value={desc}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md h-28"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Product Numbers</label>
            <textarea
              name="productNumber"
              value={productNumber}
              onChange={handleChange}
              placeholder="Contoh: 101, 102, 103"
              className="w-full p-4 py-2 border border-gray-400 rounded-md h-20"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="block"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
