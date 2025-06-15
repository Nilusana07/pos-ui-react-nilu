// src/components/AddNewProductModal.js
import React, { useState } from 'react';
import { X, Upload, Check, ChevronDown } from 'lucide-react'; // X for close, Upload for image, Check for checkbox, ChevronDown for select arrows

const AddNewProductModal = ({ isOpen, onClose, onAddProduct }) => {
  const [category, setCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [reorderLevel, setReorderLevel] = useState('');
  const [expireAlertDays, setExpireAlertDays] = useState('');
  const [gst, setGst] = useState(false);
  const [hst, setHst] = useState(false);
  const [vat, setVat] = useState(false);
  const [tax, setTax] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitOfScale, setUnitOfScale] = useState('kg'); // Default to kg based on screenshot
  const [location, setLocation] = useState('');
  const [rackName, setRackName] = useState('');
  const [rackColumn, setRackColumn] = useState('');
  const [rackRow, setRackRow] = useState('');

  // Mock options for select fields, you'd fetch these from an API in a real app
  const mockCategories = ['Electronics', 'Food', 'Apparel', 'Books', 'Groceries', 'Beverages'];
  const mockUnitsOfScale = ['kg', 'g', 'lbs', 'oz', 'pcs', 'ml', 'L'];
  const mockLocations = ['Main Store', 'Warehouse A', 'Warehouse B'];
  const mockRackNames = ['A1', 'A2', 'B1', 'B2'];
  const mockRackColumns = ['1', '2', '3', '4'];
  const mockRackRows = ['1', '2', '3', '4', '5'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!category || !productName || !productCode || !quantity) {
      alert('Please fill in all required fields (marked with *)');
      return;
    }

    const newProduct = {
      id: `prod_${Date.now()}`, // Unique ID
      category,
      productName,
      productDescription,
      reorderLevel: parseInt(reorderLevel) || 0,
      expireAlertDays: parseInt(expireAlertDays) || 0,
      gst, hst, vat, tax,
      productCode,
      quantity: parseFloat(quantity),
      unitOfScale,
      location,
      rackName,
      rackColumn,
      rackRow,
      // Add other default product properties that align with your mockProducts structure
      barcode: `BAR${Date.now().toString().slice(-6)}`,
      price: 0, // Assuming price might be set elsewhere or via edit, or add a field
      storeStock: parseFloat(quantity), // Assume initial stock is quantity
      warehouseStock: 0, // Or based on location
      status: 'In Stock', // Default status
      // You might want an image URL field here too
    };

    onAddProduct(newProduct); // Pass the new product data up to ProductsPage
    handleClearForm();
    onClose(); // Close the modal after adding
  };

  const handleClearForm = () => {
    setCategory('');
    setProductName('');
    setProductDescription('');
    setReorderLevel('');
    setExpireAlertDays('');
    setGst(false);
    setHst(false);
    setVat(false);
    setTax(false);
    setProductCode('');
    setQuantity('');
    setUnitOfScale('kg');
    setLocation('');
    setRackName('');
    setRackColumn('');
    setRackRow('');
  };

  if (!isOpen) return null;

  const renderSelectWithArrow = (label, value, onChange, options, isRequired = false) => (
    <div className="relative">
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}{isRequired && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border border-gray-300 rounded-md py-2 px-3 pr-8 leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none bg-white"
        required={isRequired}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={18} className="absolute right-3 top-1/2 mt-2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );

  const renderInputField = (label, state, setState, type = 'text', placeholder = '', isRequired = false) => (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-1">
        {label}{isRequired && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="shadow appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
        required={isRequired}
      />
    </div>
  );

  const renderCheckbox = (label, state, setState) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={label.toLowerCase()}
        checked={state}
        onChange={(e) => setState(e.target.checked)}
        className="form-checkbox h-4 w-4 text-green-600 rounded-md border-gray-300 focus:ring-green-500"
      />
      <label htmlFor={label.toLowerCase()} className="ml-2 text-gray-700 text-sm font-medium">{label}</label>
      <span className="ml-1 text-green-500"><Check size={16} /></span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        {/* Scan Barcode Button */}
        <div className="flex justify-end mb-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center">
                Scan Barcode
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Top Row: Category, Product Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderSelectWithArrow('Category', category, setCategory, mockCategories, true)}
            {renderInputField('Product Name', productName, setProductName, 'text', '', true)}
          </div>

          {/* Second Row: Product Descriptions, Re Order Level, Expire Alert Days */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderInputField('Product Descriptions', productDescription, setProductDescription, 'text', 'Optional Description')}
            {renderInputField('Re Order Level (Stock)', reorderLevel, setReorderLevel, 'number')}
            {renderInputField('Expire Alert Days', expireAlertDays, setExpireAlertDays, 'number')}
          </div>

          {/* Checkboxes for Taxes */}
          <div className="flex flex-wrap gap-6 items-center py-2">
            {renderCheckbox('GST', gst, setGst)}
            {renderCheckbox('HST', hst, setHst)}
            {renderCheckbox('VAT', vat, setVat)}
            {renderCheckbox('Tax', tax, setTax)}
          </div>

          {/* Image Upload, Use Scale, Product Code */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-300 rounded-md p-4 bg-gray-50">
            <div className="col-span-1">
              <label className="block text-gray-700 text-sm font-bold mb-1">Image upload</label>
              <div className="flex items-center space-x-2">
                <input type="file" id="imageUpload" className="hidden" />
                <label htmlFor="imageUpload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded inline-flex items-center">
                  <Upload size={18} className="mr-2" /> Select File
                </label>
                <span className="text-gray-500 text-sm">No file chosen</span> {/* Placeholder for file name */}
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600 rounded-md border-gray-300 focus:ring-green-500" />
              <label className="ml-2 text-gray-700 text-sm font-medium">Use Scale</label>
              <span className="ml-1 text-green-500"><Check size={16} /></span>
            </div>
            <div className="col-span-1">
              {renderInputField('Product Code', productCode, setProductCode, 'text', '', true)}
            </div>
          </div>

          {/* Quantity and Unit of Scale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInputField('Quantity', quantity, setQuantity, 'number', '', true)}
            {renderSelectWithArrow('Unit of Scale', unitOfScale, setUnitOfScale, mockUnitsOfScale)}
          </div>

          {/* Product Location */}
          <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Location</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {renderSelectWithArrow('Location', location, setLocation, mockLocations)}
              {renderSelectWithArrow('Rack Name', rackName, setRackName, mockRackNames)}
              {renderSelectWithArrow('Rack Column', rackColumn, setRackColumn, mockRackColumns)}
              {renderSelectWithArrow('Rack Row', rackRow, setRackRow, mockRackRows)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose} // Or handleClearForm if you want to clear on Cancel too
              className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewProductModal;