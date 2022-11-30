import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeState } from "./type";

// trying to get the theme from the browser's local storage
// if nothing there, then try to get the theme from the system settings
// if there are no settings, then use the dark theme
const getTheme = () => {
   const theme = `${window?.localStorage?.getItem('theme')}`
   if(['light', 'dark'].includes(theme)) return theme

   const userMedia = window.matchMedia('(prefers-color-scheme: light)')
   if (userMedia.matches) return 'light'

   return 'dark'
}

const initialState = getTheme();

export const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      toggleTheme: (state, action: PayloadAction) => action.payload
   }
})

/* 
// const themeFormLocationStorage = !!localStorage.getItem("movies-theme");

// const initialState: ThemeState = themeFormLocationStorage;
const initialState: ThemeState = {
   darkTheme: false
}

export const themeSlice = createSlice({
   name: "theme",
   initialState,
   reducers: {
   //     toggleTheme: (state) => {
   //    if (state) {
   //      localStorage.removeItem("movies-theme")
   //    } else {
   //      localStorage.setItem("movies-theme", "_")
   //    }
   //    return (state = !state);
   //  }, 
      toggleTheme: (state) => {
         state.darkTheme = !state.darkTheme;
      }
   }
});
 */

export const { toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;