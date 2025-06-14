import React from 'react';

// This component displays product details in a modal when the 'Edit' icon is clicked.
const EditProductModal = ({ product, onClose }) => {
  if (!product) return null; // Don't render if no product is passed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product Details</h2>
        <div className="space-y-3 text-gray-700">
          <p><strong>Product Name:</strong> {product.productName}</p>
          <p><strong>Product Code:</strong> {product.productCode}</p>
          <p><strong>Barcode:</strong> {product.barcode}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Tax:</strong> {product.tax}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Store Stock:</strong> {product.storeStock}</p>
          <p><strong>Warehouse Stock:</strong> {product.warehouseStock}</p>
          <p><strong>Status:</strong> <span className={`font-semibold ${
            product.status === 'In Stock' ? 'text-green-600' : 'text-red-600'
          }`}>{product.status}</span></p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
