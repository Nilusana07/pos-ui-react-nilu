import { createSlice } from '@reduxjs/toolkit';
import mockProducts from '../../data/MockProducts'; // Assuming this is where your mock data lives

const itemsSlice = createSlice({
  name: 'items', // A unique name for your slice
  initialState: {
    allProducts: mockProducts, // Your initial list of all products
    newlyAddedItems: [],      // State to hold items added via the 'Add New Item' form
    filteredProducts: mockProducts, // State to hold the products after applying filters
    editModalProduct: null,     // State for the product currently being edited
    // Add states for your filters here, e.g.,
    searchTerm: '',
    selectedCategory: '',
    selectedProductType: '',
    selectedColor: '',
    selectedThickness: '',
    selectedDiameter: '',
    selectedSortBy: '',
  },
  reducers: {
    // Action to add a new custom item
    addNewItem: (state, action) => {
      state.newlyAddedItems.push(action.payload);
    },
    // Action to set the list of filtered products (after applying search/filters)
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
    // Action to open the edit modal with a specific product
    setEditModalProduct: (state, action) => {
      state.editModalProduct = action.payload;
    },
    // Action to clear the edit modal product
    clearEditModalProduct: (state) => {
      state.editModalProduct = null;
    },
    // Actions for filter updates (directly update the state)
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
    // Action to reset all filters
    resetFilters: (state) => {
        state.searchTerm = '';
        state.selectedCategory = '';
        state.selectedProductType = '';
        state.selectedColor = '';
        state.selectedThickness = '';
        state.selectedDiameter = '';
        state.selectedSortBy = '';
        // When filters are reset, you might want to show all products again
        state.filteredProducts = state.allProducts;
    },
    // Action to update an existing product (e.g., from EditProductModal)
    updateProduct: (state, action) => {
        const { id, updatedData } = action.payload;
        const index = state.allProducts.findIndex(product => product.id === id);
        if (index !== -1) {
            state.allProducts[index] = { ...state.allProducts[index], ...updatedData };
            // Also update filteredProducts if the updated product is in there
            const filteredIndex = state.filteredProducts.findIndex(product => product.id === id);
            if (filteredIndex !== -1) {
                state.filteredProducts[filteredIndex] = { ...state.filteredProducts[filteredIndex], ...updatedData };
            }
        }
    },
  },
});

export const {
  addNewItem,
  setFilteredProducts,
  setEditModalProduct,
  clearEditModalProduct,
  setSearchTerm,
  setSelectedCategory,
  setSelectedProductType,
  setSelectedColor,
  setSelectedThickness,
  setSelectedDiameter,
  setSelectedSortBy,
  resetFilters,
  updateProduct,
} = itemsSlice.actions;

export default itemsSlice.reducer;