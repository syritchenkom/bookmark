import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Favorite, FavoritesState} from './types';

const initialState: FavoritesState = {
   favorites: [],
};

export const favoritesSlice = createSlice({
   name: "favorites",
   initialState,
   reducers: {
      addToFavorites: (state, action: PayloadAction<Favorite>) => {
         console.log("action", action)
         const bookId = action.payload;
         state.favorites.push(bookId)
      },
      removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
         const bookId = action.payload;
         state.favorites = state.favorites.filter(favorite => favorite.id !== bookId.id)
      }
   }
})

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;