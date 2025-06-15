import { createSlice } from '@reduxjs/toolkit';
import mockProducts from '../../data/MockProducts'; // Assuming you have this mock data

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: mockProducts, // Your initial product data
    searchTerm: '',
    selectedCategory: '',
    selectedProductType: '',
    selectedColor: '',
    selectedThickness: '',
    selectedDiameter: '',
    selectedSortBy: '',
    highlightedProductId: null,
    isAddNewProductModalOpen: false, // State for the modal visibility
  },
  reducers: {
    // Action to add a new product
    addProduct: (state, action) => {
      // Assuming action.payload is the new product object
      state.items.unshift(action.payload); // Add new product to the beginning
      state.highlightedProductId = action.payload.id; // Highlight the new product
    },
    // Action to update existing product (e.g., from EditProductModal)
    updateProduct: (state, action) => {
      const { id, updatedProduct } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedProduct };
      }
    },
    // Actions for filters and search (synchronize with your existing ProductsPage logic)
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedProductType: (state, action) => {
      state.selectedProductType = action.payload;
    },
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setSelectedThickness: (state, action) => {
      state.selectedThickness = action.payload;
    },
    setSelectedDiameter: (state, action) => {
      state.selectedDiameter = action.payload;
    },
    setSelectedSortBy: (state, action) => {
      state.selectedSortBy = action.payload;
    },
    setHighlightedProductId: (state, action) => {
      state.highlightedProductId = action.payload;
    },
    // Action to open/close the Add New Product Modal
    openAddNewProductModal: (state) => {
      state.isAddNewProductModalOpen = true;
    },
    closeAddNewProductModal: (state) => {
      state.isAddNewProductModalOpen = false;
    },
    // Action to reset filters
    resetFilters: (state) => {
      state.searchTerm = '';
      state.selectedCategory = '';
      state.selectedProductType = '';
      state.selectedColor = '';
      state.selectedThickness = '';
      state.selectedDiameter = '';
      state.selectedSortBy = '';
      state.highlightedProductId = null;
    }
  },
});

export const {
  addProduct,
  updateProduct,
  setSearchTerm,
  setSelectedCategory,
  setSelectedProductType,
  setSelectedColor,
  setSelectedThickness,
  setSelectedDiameter,
  setSelectedSortBy,
  setHighlightedProductId,
  openAddNewProductModal,
  closeAddNewProductModal,
  resetFilters
} = productSlice.actions;

export default productSlice.reducer;