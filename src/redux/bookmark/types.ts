export type Bookmark = {
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

export interface BookmarkSliceState {
   // searchValue: Bookmark[];
   searchValue: string;
	bookmarks: Bookmark[];
   status: Status;
   // addBookmark: AddBookmark;
}
