import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {Favorite, FavoritesState} from './types';



const initialState: FavoritesState = {
   favorites: [],
   active: false,
};

export const favoritesSlice = createSlice({
   name: "favorites",
   initialState,
   reducers: {
      addToFavorites: (state, action: PayloadAction<Favorite>) => {
         const bookId = action.payload;
         state.favorites.push(bookId)
        //  console.log("bookId", bookId)
        //  const index = state.favorites.indexOf(bookId);
        //  console.log("indexFavorite", index)
        //  console.log("stateFavorite", state.favorites)
        //  console.log("actionFavorite", state.favorites.push(action.payload))

        //  if(index === -1){
        //     state.favorites.push(bookId)
        //  }else{
        //     state.favorites.splice(index,1);
        //  }
      },
      removeFromFavorites: (state, action: PayloadAction<Favorite>) => {
         const bookId = action.payload;
         state.favorites = state.favorites.filter(favorite => favorite.id !== bookId.id)
      },
      setActive: (state, action: PayloadAction<boolean>) => {
         state.active = action.payload;
      }
      // addSelectedBookmarkId(state, action: PayloadAction<string>){
      //    state.selectedBookmarkIds.push(action.payload);
      // }
      // toggleFavorite: (state, action: PayloadAction<FavoritesState>) => {
      //    // console.log("isActive", state.isActive)
      //    // console.log("isActive.payload", action.payload)
      //    // state.isActive = !state.isActive;
            // const index = state.selected.indexOf(action.payload);
         //  if(index === -1){
            //  state.selected.push(action.payload);
         //  }else{
            //  state.selected.splice(index, 1);
         //  }
      //    const bookIndex = state.favorites.findIndex((bookmark) => bookmark.id === action.payload);
      //    if(bookIndex !== -1) {
      //       state.favorites.selected = !state.favorites.selected;
      //    }
      //    console.log("isFavorite_bookIndex_reducers", bookIndex)

      // }
   }
})

export const {addToFavorites, removeFromFavorites, setActive } = favoritesSlice.actions;

export default favoritesSlice.reducer;