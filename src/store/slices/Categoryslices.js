import { createSlice } from "@reduxjs/toolkit";
const initialState={selectedCategoryId:"",
selectedproducts:[],
products: [],
isAuthenticated: false,
user: [],

notifications: [],



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
          
          addToCart: (state, action) => {
            const productId = action.payload;
            const product = state.products.find((p) => p._id === productId);
          
            if (product) {
              const existingCartItem = state.selectedproducts.find((product) => product.id === productId);
          
              if (existingCartItem) {
                existingCartItem.quantity++;
              } else {
                state.selectedproducts.push({
                  id: productId,
                  quantity: 1,
                  price: product.price,
                });
              }
            }
          },
          
          decrementQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.selectedproducts.find((product) => product.id === productId);
          
            if (product) {
              if (product.quantity > 1) {
                product.quantity--;
              }
            }
          },

          incrementQuantity:(state,action)=>{
            const products=state.selectedproducts.find((product)=>product.id===action.payload);
            products.quantity++;
          },
          setNotifications: (state, action) => {
            state.notifications.push(action.payload);
          },
          
          
          





          setProducts: (state, action) => {
            state.products = action.payload; 
          },
          RemoveFromCart: (state, action) => {
            state.selectedproducts = state.selectedproducts.filter(
              (selectedproduct) => selectedproduct.id !== action.payload
            );

          },
          RemoveFromWishlist: (state, action) => {
            const productData = state.selectedproducts.filter(
              (selectedproduct) => selectedproduct !== action.payload
            );
            state.selectedproducts = productData;
          },
          addToWishlist: (state, action) => {
            const productId = action.payload;
            state.selectedproducts = [...state.selectedproducts, productId];
          },
          
          login: (state, action) => {
            state.isAuthenticated = true;
            
            state.user = action.payload;
            state.email = action.payload.email;
            state.password = action.payload.password; 
            
            
          },
          logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
          },
        },
      });

      export const { setCategories, setError, setSelectedCategoryId,addToCart,RemoveFromCart,CartItems,setProducts,RemoveFromWishlist,addToWishlist,login,logout,incrementQuantity,decrementQuantity,setNotifications } = categorySlice.actions;
      
      export default categorySlice.reducer;







