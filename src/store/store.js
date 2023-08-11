import { configureStore } from "@reduxjs/toolkit";
import  categoryReducer  from "./slices/Categoryslices";

const store=configureStore({
    reducer: { 
        category:categoryReducer
    }
})
export default store;



