import { createSlice } from "@reduxjs/toolkit";
import { ThemeState } from "./type";

const initialState: ThemeState = {
  blackStyle: !!localStorage.getItem("darkTheme")
};

export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
      toggleTheme: (state) => {
         if(state.blackStyle){
            localStorage.removeItem('darkTheme')
         }else{
            localStorage.setItem('darkTheme', '_')
         }
         state.blackStyle = !state.blackStyle;
      }
   }
})

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;