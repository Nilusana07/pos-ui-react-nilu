import React, { useState, useEffect } from 'react';
// Removed useDispatch, useSelector as per your provided code
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart, selectCartItems } from '../features/cart/cartSlice'; // Removed Redux actions/selectors

import {
  Search,
  RefreshCcw,
  Edit2,
  ChevronDown,
  PlusCircle,
} from 'lucide-react';

import mockProducts from '../data/MockProducts.js';
import EditProductModal from '../components/EditProductModal.js';
// Removed NewItemCard import as it's no longer directly used in ProductsPage render.
// import NewItemCard from '../components/NewItemCard.js';

// NEW IMPORT: Add the new modal component
import AddNewProductsModal from '../components/AddNewProductModal.js';


const ProductsPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedThickness, setSelectedThickness] = useState('');
  const [selectedDiameter, setSelectedDiameter] = useState('');
  const [selectedSortBy, setSelectedSortBy] = useState('');

  const [editModalProduct, setEditModalProduct] = useState(null);

  // Removed states related to the old "Add New Item Card" form
  // const [newItems, setNewItems] = useState([]);
  // const [newItemName, setNewItemName] = useState('');
  // const [newItemDescription, setNewItemDescription] = useState('');
  // const [newItemPrice, setNewItemPrice] = useState('');

  // State to manage the ID of the currently highlighted product row
  const [highlightedProductId, setHighlightedProductId] = useState(null);

  // NEW STATE: Control visibility of the new AddNewProductModal
  const [isAddNewProductModalOpen, setIsAddNewProductModalOpen] = useState(false);

  const categories = [...new Set(mockProducts.map((p) => p.category))];
  const productTypes = [...new Set(mockProducts.map((p) => p.productName.split(' ')[1] || 'Default'))];
  const colors = [...new Set(mockProducts.map((p) => p.productName.split(' ')[0]))];
  const thicknesses = [...new Set(mockProducts.map(p => p.thickness))].filter(Boolean);
  const diameters = [...new Set(mockProducts.map(p => p.diameter))].filter(Boolean);
  const sortByOptions = ['Name (A-Z)', 'Price (Low to High)', 'Stock (High to Low)'];

  useEffect(() => {
    let filtered = [...mockProducts];

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedProductType && selectedProductType !== 'Default') {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(selectedProductType.toLowerCase())
      );
    }

    if (selectedColor) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(selectedColor.toLowerCase())
      );
    }

    if (selectedThickness) {
      filtered = filtered.filter((product) =>
        String(product.thickness).toLowerCase().includes(selectedThickness.toLowerCase())
      );
    }

    if (selectedDiameter) {
      filtered = filtered.filter((product) =>
        String(product.diameter).toLowerCase().includes(selectedDiameter.toLowerCase())
      );
    }

    if (selectedSortBy === 'Name (A-Z)') {
      filtered.sort((a, b) => a.productName.localeCompare(b.productName));
    } else if (selectedSortBy === 'Price (Low to High)') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selectedSortBy === 'Stock (High to Low)') {
      filtered.sort((a, b) => {
        const stockA = typeof a.storeStock === 'number' ? a.storeStock : 0;
        const stockB = typeof b.storeStock === 'number' ? b.storeStock : 0;
        return stockB - stockA;
      });
    }

    setProducts(filtered);
  }, [searchTerm, selectedCategory, selectedProductType, selectedColor, selectedThickness, selectedDiameter, selectedSortBy]);

  // EFFECT TO HANDLE INITIAL HIGHLIGHT AND RE-HIGHLIGHT ON FILTER CHANGE
  useEffect(() => {
    // Only highlight the first product if no specific product is already highlighted
    // and if there are products to display.
    if (products.length > 0 && highlightedProductId === null) {
      setHighlightedProductId(products[0].id);
    } else if (products.length > 0 && !products.some(p => p.id === highlightedProductId)) {
        // If the currently highlighted product is no longer in the filtered list,
        // highlight the first product of the new list.
        setHighlightedProductId(products[0].id);
    } else if (products.length === 0) {
        // If there are no products, clear any highlight
        setHighlightedProductId(null);
    }
  }, [products, highlightedProductId]);


  const handleRefreshFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedProductType('');
    setSelectedColor('');
    setSelectedThickness('');
    setSelectedDiameter('');
    setSelectedSortBy('');
    setHighlightedProductId(null); // Clear highlight on refresh to re-trigger first item highlight
  };

  // NEW FUNCTION: Handle product submission from the modal
  const handleAddProductFromModal = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]); // Add to the main products list
    setHighlightedProductId(newProduct.id); // Highlight the newly added product
    setIsAddNewProductModalOpen(false); // Close the modal
  };

  // Removed handleAddNewItem function as it's replaced by the modal
  // const handleAddNewItem = (e) => { ... };

  const openEditModal = (product) => {
    setEditModalProduct(product);
  };

  const closeEditModal = () => {
    setEditModalProduct(null);
  };

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

  const renderSearchableSelect = (label, value, onChange, options) => (
    <div className="relative">
        <input
            type="text"
            placeholder={label}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full pl-4 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            list={`${label.toLowerCase().replace(/\s/g, '')}-options`} // Unique ID for datalist
        />
        <datalist id={`${label.toLowerCase().replace(/\s/g, '')}-options`}>
            {options
                .filter(option => String(option).toLowerCase().includes(String(value).toLowerCase()))
                .map(option => (
                    <option key={option} value={option} />
                ))}
        </datalist>
        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div className="flex-1 p-6 bg-gray-50 rounded-lg">
      {/* Filter and Search Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        {/* Top row of filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
          {renderSelect('Category', selectedCategory, setSelectedCategory, categories)}
          {renderSearchableSelect('Select Product', selectedProductType, setSelectedProductType, productTypes)}
          {renderSelect('Short By', selectedSortBy, setSelectedSortBy, sortByOptions)}
        </div>

        {/* Second row: Color, Thickness, Diameter, and Refresh button, all within one rounded div */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center bg-gray-100 rounded-lg py-3 px-6 mb-4">
            {renderSearchableSelect('Color', selectedColor, setSelectedColor, colors)}
            {renderSearchableSelect('Thickness', selectedThickness, setSelectedThickness, thicknesses)}
            {renderSearchableSelect('Diameter', selectedDiameter, setSelectedDiameter, diameters)}
            <button
                onClick={handleRefreshFilters}
                className="flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-sm whitespace-nowrap w-full"
            >
                <RefreshCcw size={18} className="mr-2" /> Refresh
            </button>
        </div>

        {/* Main Search Bar and Add New Product Button */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-auto flex-grow">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Products by name or id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={() => setIsAddNewProductModalOpen(true)} // Opens the new modal
              className="flex items-center justify-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200 shadow-md whitespace-nowrap w-full sm:w-auto"
            >
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
                <tr
                  key={product.id}
                  // Apply highlight class conditionally based on highlightedProductId
                  className={`${product.id === highlightedProductId ? 'bg-green-100 border-l-4 border-green-500' : ''}`}
                  // Set highlighted product on row click
                  onClick={() => setHighlightedProductId(product.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.productCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.barcode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.tax}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price ? product.price.toFixed(2) : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
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

      {/* Removed "Add New Item Section (Form for adding items as cards)" and "Display Newly Added Item Cards" */}
      {/* because they are replaced by the AddNewProductModal */}

      {/* Add New Product Modal */}
      <AddNewProductModal
        isOpen={isAddNewProductModalOpen}
        onClose={() => setIsAddNewProductModalOpen(false)}
        onAddProduct={handleAddProductFromModal}
      />

      {/* Edit Product Modal (Always rendered, but hidden until a product is selected) */}
      <EditProductModal product={editModalProduct} onClose={closeEditModal} />
    </div>
  );
};

export default ProductsPage;
