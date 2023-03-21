export type Favorite = {
      userId: number;
      id: number;
      title: string;
      body: string;
}

export enum Status {
   LOADING = 'loading',
   SUCCESS = 'completed',
   ERROR = 'error',
}

export interface FavoritesState {
   favorites: Favorite[];
   active: boolean;

}