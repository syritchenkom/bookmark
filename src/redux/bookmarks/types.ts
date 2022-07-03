export interface BookmarkState {
   "userId": number,
   "id": number,
   "name": string,
   "url": string
}

export interface BookmarkArrayState {
	// bookmarks: Bookmark[];
	bookmarks: BookmarkState[];
   addBookmark: BookmarkState;
}
