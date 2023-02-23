import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Favorite, FavoritesState} from './types';

const initialState: FavoritesState = {
   favorites: [],
};

const favoritesSlice = createSlice({
   name: "favorites",
   initialState,
   reducers: {
      addToFavorites: (state, action: PayloadAction<Favorite>) => {
         state.favorites.push(action.payload)
      },
      removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
         state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload.id)
      }
   }
})

export const {addToFavorites, removeFromFavorites} = favoritesSlice.actions;

export default favoritesSlice;