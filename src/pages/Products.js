
import React, { useState, useEffect } from 'react';
import {
  Search,
  RefreshCcw,
  Edit2,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';

//import mockProducts from '../data/MockProducts';
import EditProductModal from '../components/EditProductModal.js'; // Corrected import path
import NewItemCard from '../components/NewItemCard.js'; // Corrected import path
import mockProducts from '../data/MockProducts.js';

// This is the main content area of your POS UI, containing the filter section, product table,
// and the new item addition form and display.
const ProductsPage = () => {
  // State for existing products (filtered list)
  const [products, setProducts] = useState(mockProducts);
  // States for filter inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');

  // State for the product being edited in the modal
  const [editModalProduct, setEditModalProduct] = useState(null);

  // States for the new custom added items form
  const [newItems, setNewItems] = useState([]); // Stores the items added via the form
  const [newItemName, setNewItemName] = useState('');
  const [newItemDescription, setNewItemDescription] = '';
  const [newItemPrice, setNewItemPrice] = '';

  // Derive unique options for dropdowns from mock data
  const categories = [...new Set(mockProducts.map((p) => p.category))];
  // Example for product types, assuming product name first word is type. Adjust as per actual data.
  const productTypes = [...new Set(mockProducts.map((p) => p.productName.split(' ')[1] || 'Default'))];
  // Example for colors, assuming product name first word is color. Adjust as per actual data.
  const colors = [...new Set(mockProducts.map((p) => p.productName.split(' ')[0]))];
  const thicknesses = ['20m', '25m']; // Static example values
  const diameters = ['10mm', '15mm']; // Static example values
  const sortByOptions = ['Name (A-Z)', 'Price (Low to High)', 'Stock (High to Low)'];

  // Effect hook to re-filter and re-sort products whenever filter states change
  useEffect(() => {
    let filtered = [...mockProducts]; // Start with all mock data

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Apply product type filter
    if (selectedProductType && selectedProductType !== 'Default') {
        filtered = filtered.filter((product) => product.productName.includes(selectedProductType));
    }

    // Apply color filter
    if (selectedColor) {
        filtered = filtered.filter((product) => product.productName.startsWith(selectedColor));
    }

    // Apply thickness filter (example logic based on mock data structure)
    if (selectedThickness === '20m') {
        filtered = filtered.filter((product) => product.productCode === '1102');
    } else if (selectedThickness === '25m') {
        filtered = filtered.filter((product) => product.productCode === 'bt0055478');
    }

    // Diameter filter - currently no specific mock data for this, so it won't change results
    if (selectedDiameter) {
        // Add filtering logic here if diameter data becomes available in mockProducts
    }

    // Apply sorting
    if (selectedSortBy === 'Name (A-Z)') {
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (selectedSortBy === 'Price (Low to High)') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSortBy === 'Stock (High to Low)') {
      filtered.sort((a, b) => {
        // Handle 'Not Available' by treating it as 0 or a very low number for sorting
        const stockA = typeof a.storeStock === 'number' ? a.storeStock : 0;
        const stockB = typeof b.storeStock === 'number' ? b.storeStock : 0;
        return stockB - stockA; // Descending order
      });
    }

    setProducts(filtered); // Update the displayed products
  }, [searchTerm, selectedCategory, selectedProductType, selectedColor, selectedThickness, selectedDiameter, selectedSortBy]); // Dependencies for useEffect

  // Function to reset all filter states
  const handleRefreshFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedProductType('');
    setSelectedColor('');
    setSelectedThickness('');
    setSelectedDiameter('');
    setSelectedSortBy('');
  };

  // Function to handle adding a new custom item from the form
  const handleAddNewItem = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    // Basic validation to ensure name and price are provided
    if (!newItemName || !newItemPrice) {
      // In a real application, you would show a user-friendly error message
      // e.g., using a toast notification or an in-modal alert.
      console.error('Please enter item name and price.');
      return;
    }

    // Create a new item object
    const newItem = {
      id: `custom_${Date.now()}`, // Generate a unique ID for the new item
      name: newItemName,
      description: newItemDescription,
      price: parseFloat(newItemPrice), // Convert price to a number
    };

    // Add the new item to the newItems state array
    setNewItems((prevItems) => [...prevItems, newItem]);
    // Clear the form fields after submission
    setNewItemName('');
    setNewItemDescription('');
    setNewItemPrice('');
  };

  // Function to open the product details modal
  const openEditModal = (product) => {
    setEditModalProduct(product);
  };

  // Function to close the product details modal
  const closeEditModal = () => {
    setEditModalProduct(null);
  };

  // Helper function to render a common dropdown select element
  const renderSelect = (label, value, onChange, options) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-4 py-2 border border-gray-300 rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500 appearance-none"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-lg">
      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
          {renderSelect('Category', selectedCategory, setSelectedCategory, categories)}
          {renderSelect('Select Product', selectedProductType, setSelectedProductType, productTypes)}
          {renderSelect('Color', selectedColor, setSelectedColor, colors)}
          {renderSelect('Thickness', selectedThickness, setSelectedThickness, thicknesses)}
          {renderSelect('Diameter', selectedDiameter, setSelectedDiameter, diameters)}
          {renderSelect('Short By', selectedSortBy, setSelectedSortBy, sortByOptions)}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={handleRefreshFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 shadow-sm whitespace-nowrap w-full sm:w-auto"
            >
              <RefreshCcw size={18} className="mr-2" /> Refresh
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md whitespace-nowrap w-full sm:w-auto">
              <PlusCircle size={18} className="mr-2" /> Add New Product
            </button>
          </div>
        </div>
      </div>

      {/* Existing Product Table */}
      <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Existing Products</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Barcode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tax
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Warehouse
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.tax}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {/* Color-coded stock status */}
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.storeStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Color-coded stock status */}
                  <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.status === 'In Stock'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.warehouseStock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-orange-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 p-2 rounded-full hover:bg-orange-50"
                      aria-label={`Edit ${product.productName}`}
                    >
                      <Edit2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-4 text-center text-sm text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Item Section (Form for adding items as cards) */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Item (Card)</h2>
        <form onSubmit={handleAddNewItem} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
            <input
              type="text"
              id="itemName"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              placeholder="e.g., Special Mug"
              required // Make this field mandatory
            />
          </div>
          {/* Description input takes 2 columns on medium screens and up */}
          <div className="md:col-span-2">
            <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              id="itemDescription"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              placeholder="e.g., Hand-painted ceramic mug"
            />
          </div>
          <div>
            <label htmlFor="itemPrice" className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              id="itemPrice"
              value={newItemPrice}
              onChange={(e) => setNewItemPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
              placeholder="e.g., 15.99"
              step="0.01" // Allow decimal values for price
              required // Make this field mandatory
            />
          </div>
          {/* Submit button aligned to the right, spans 3 columns on medium screens and up */}
          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md"
            >
              <PlusCircle size={18} className="mr-2" /> Add Item Card
            </button>
          </div>
        </form>
      </div>

      {/* Display Newly Added Item Cards */}
      {/* This section only appears if there are new items to display */}
      {newItems.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Newly Added Items (Cards)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newItems.map((item) => (
              <NewItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Edit Product Modal (Always rendered, but hidden until a product is selected) */}
      <EditProductModal product={editModalProduct} onClose={closeEditModal} />
    </div>
  );
};

export default ProductsPage;
