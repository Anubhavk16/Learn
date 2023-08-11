import { createSlice } from "@reduxjs/toolkit";
const initialState={selectedCategoryId:"",
selectedproducts:[],
products: [],


}
 

let cart=[]





const categorySlice=createSlice({
    name:"category",
    initialState,
    reducers:{
        setCategories: (state, action) => {
            state.categories = action.payload;
            state.loading = false;
            state.error = null;
          },
          setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
          },
          setSelectedCategoryId: (state, action) => {
            state.selectedCategoryId = action.payload;
          },
          addToCart:(state,action)=>{
            
            const productId=action.payload;
            cart=state.selectedproducts;
            state.selectedproducts=[...cart,productId];
            
          },
          setProducts: (state, action) => {
            state.products = action.payload; // Update the products array
          },
          RemoveFromCart:(state,action)=>{
            
            
            const productdata = state.selectedproducts.filter((selectedproduct) => selectedproduct !== action.payload);
            // cart=state.selectedproducts;
            state.selectedproducts = productdata;
             

          },
          
        },
      });


      
      export const { setCategories, setError, setSelectedCategoryId,addToCart,RemoveFromCart,CartItems,setProducts } = categorySlice.actions;
      
      export default categorySlice.reducer;







