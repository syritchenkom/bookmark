import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	TableCell,
	Paper,
	Skeleton,
	List,
	ListSubheader
} from '@mui/material';
import { InsertDriveFileOutlined } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchBookmarks } from '../../redux/bookmark/asyncActions';

import MenuBookmarks from './MenuBookmarks';

const BookmarkList: FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const { userId } = useParams(); // const params = useParams(); const userId = params.userId

	const dispatch = useAppDispatch();
	const { bookmarks, searchValue, isSearch } = useAppSelector(
		({ bookmark }) => bookmark
	);
	// const [activeBookmark, setActiveBookmark] = useState(bookmarks[0]);

	//Added variable to search component
	const currentBookmarks = isSearch ? searchValue : bookmarks;

	useEffect(() => {
		const timer: any = setTimeout(() => {
			dispatch(fetchBookmarks({ userId }));
			setIsLoading(false);
			// searchValue();
		}, 1000);

		return () => clearTimeout(timer);
	}, [dispatch, userId]);

	const skeletons = [...new Array(10)].map((_, index) => (
		<TableRow key={index}>
			<TableCell sx={{ padding: '1px' }}>
				<Skeleton variant="rounded" width={762} height={110} />
			</TableCell>
		</TableRow>
	));

	return (
		<List
			sx={{
				maxHeight: 550,
				marginTop: '4rem',
				bgcolor: 'background.paper',
				position: 'relative',
				overflow: 'auto'
			}}
			component={Paper}
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Bookmarks List Items
				</ListSubheader>
			}>
			<TableContainer>
				<Table>
					<TableBody>
						{isLoading
							? skeletons
							: currentBookmarks.map((bookmark, index) => (
									<TableRow
										hover
										key={bookmark.id}
										sx={{
											display: 'flex'
											// alignItems: 'center',
											// '&:last-child td, &:last-child th': { border: 0 }
										}}>
										<TableCell
											sx={{
												display: 'flex',
												alignItems: 'center'
											}}
											// component="th"
											// scope="row"
										>
											<InsertDriveFileOutlined sx={{ marginRight: '1rem' }} />
										</TableCell>
										{/* Bookmarks Title & Body */}
										<TableCell
											sx={{
												display: 'flex',
												alignItems: 'center'
											}}
											// component="th"
											scope="row">
											Title: {bookmark.title}
											<br />
											Body: {bookmark.body}
										</TableCell>
										<TableCell sx={{ flexGrow: 1 }} />
										{/* Menu Bookmarks */}
										<TableCell
											sx={{
												display: { xs: 'flex' },
												alignItems: 'center'
											}}>
											<MenuBookmarks />
										</TableCell>
									</TableRow>
							  ))}
					</TableBody>
				</Table>
			</TableContainer>
		</List>
	);
};

export default BookmarkList;
