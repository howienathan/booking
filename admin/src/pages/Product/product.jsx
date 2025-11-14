// pages/Product.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("are you sure?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        withCredentials: true,
      });
      alert("Product deleted!");
      fetchProducts(); 
    } catch (error) {
      console.error("error delete product:", error);
      alert("gagal delete product");
    }
  };

// untuk edit product
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Controll</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = product.img?.[0] 
              ? `http://localhost:5000/uploads/${product.img[0]}`
              : null;

            return (
              <div 
                key={product._id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-400 text-center p-4">
                      <p className="text-sm">No Image</p>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <h3 className=''>
                    {product.desc}
                  </h3>

                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    Rp {product.price?.toLocaleString()}
                  </p>

                  <div className="flex justify-between mt-4 pt-4 border-t">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="px-4 py-2 text-sm bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😴</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
            <p className="text-gray-500">Products will appear here once they're added.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Product;
