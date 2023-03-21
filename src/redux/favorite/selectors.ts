import { RootState } from "../store";

export const selectActive = (state: RootState) => state.favorite.active;