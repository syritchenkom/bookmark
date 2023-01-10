import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "./type";

const initialState: ThemeState = {
   darkTheme: !!localStorage.getItem("darkTheme")
};

export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         if(state.darkTheme){
            localStorage.removeItem('darkTheme')
         }else{
            localStorage.setItem('darkTheme', '_')
         }
         state.darkTheme = !state.darkTheme
      }
   }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;