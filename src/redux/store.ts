import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import folder from './folder/slice'
import bookmark from './bookmark/slice';
import theme from './theme/slice';
import favorite from './favorite/slice';


export const store = configureStore({
  reducer: {
    folder,
    bookmark, // bookmarkStore: bookmarkReducer
    theme,
    favorite
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;