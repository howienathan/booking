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
    productNumber: "",
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
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const imagePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(imagePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🔄 Mulai submit...");

    try {
      // 1. Siapkan productNumbers dengan format YANG BENAR
      let productNumbersArray = [];
      
      if (productNumber && productNumber.trim() !== "") {
        productNumbersArray = productNumber
          .split(",")
          .map((item) => {
            const num = parseInt(item.trim());
            if (!isNaN(num)) {
              return {
                number: num,
                unavaibleDates: []
              };
            }
            return null;
          })
          .filter(item => item !== null);
      }

      console.log("📦 Product Numbers:", productNumbersArray);

      // 2. Siapkan FormData
      const dataToSubmit = new FormData();
      dataToSubmit.append("name", name);
      dataToSubmit.append("price", parseFloat(price));
      dataToSubmit.append("desc", desc);
      // dataToSubmit.append("productNumbers", JSON.stringify(productNumbersArray));

      // buat nambahin files
      files.forEach((file) => {
        dataToSubmit.append("images", file);
      });

      // Debuging
      console.log("📤 Data yang dikirim:");
      for (let [key, value] of dataToSubmit.entries()) {
        console.log(`${key}:`, value);
      }

      // kirim req dengan header sama cookie
      const res = await axios.post(
        "http://localhost:5000/api/products",
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      console.log("✅ Success:", res.data);
      alert("🎉 Product berhasil ditambahkan!");
      navigate("/dashboard");

    } catch (error) {
      console.error("kocak Error detail:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      const errorMessage = error.response?.data?.message || "Gagal membuat product";
      alert(`ERROR LOL ${errorMessage}`);
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

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="desc"
              value={desc}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-400 rounded-md h-28"
              required
            />
          </div>

          {/* <div className="col-span-2">
            <label className="block mb-1 font-medium">Product Numbers</label>
            <textarea
              name="productNumber"
              value={productNumber}
              onChange={handleChange}
              placeholder="Contoh: 101, 102, 103 (opsional)"
              className="w-full p-4 py-2 border border-gray-400 rounded-md h-20"
            />
            <p className="text-sm text-gray-500 mt-1">* Kosongkan jika tidak ada</p>
          </div> */}

          <div className="col-span-2">
            <label className="block mb-1 font-medium">Images</label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="block mb-3"
              required
            />

            {previewImages.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-2">
                {previewImages.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`Preview ${index}`}
                      className="w-full h-24 object-cover rounded-md border"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="col-span-2 w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;