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
         console.log("state", state)
         console.log("action", action)
         state.favorites.push(action.payload)
      },
      removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
         const bookId = action.payload;
         state.favorites = state.favorites.filter(favorite => favorite.id !== bookId.id)
      }
   }
})

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice.reducer;