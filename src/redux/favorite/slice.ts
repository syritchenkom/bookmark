import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Favorite, FavoritesState} from './types';



const initialState: FavoritesState = {
   favorites: [],
   isActive: false,
};

export const favoritesSlice = createSlice({
   name: "favorites",
   initialState,
   reducers: {
      addToFavorites: (state, action: PayloadAction<Favorite>) => {
         // console.log("action", action)
         const bookId = action.payload;
         state.favorites.push(bookId)
      },
      removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
         const bookId = action.payload;
         state.favorites = state.favorites.filter(favorite => favorite.id !== bookId.id)
      },
      toggleActiveFavorite: (state) => {
         // console.log("isActive", state.isActive)
         // console.log("isActive.payload", action.payload)
         // state.isActive = action.payload;
         state.isActive = !state.isActive;
         console.log("isActive_reducers", !state.isActive)

      }
   }
})

export const {addToFavorites, removeFromFavorites, toggleActiveFavorite} = favoritesSlice.actions;

export default favoritesSlice.reducer;