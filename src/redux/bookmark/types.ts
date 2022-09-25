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
	bookmarks: Bookmark[];
   searchValue: Bookmark[];
   isSearch: boolean;
   status: Status;
}
