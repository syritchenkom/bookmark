import React, { FC, useEffect, useState } from 'react';
import { UserItemProps } from '../../types/types';
import {
	Table,
	TableBody,
	TableContainer,
	TableRow,
	Paper,
	TableCell,
	IconButton,
	MenuItem,
	Menu
} from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import DriveFileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// interface UserItemProps {
// 	posts: IPost[];
// }

const UserItem: FC = () => {
	const [bookmarks, setBookmarks] = useState<UserItemProps[]>([]);
	const [bookMenu, setBookMenu] = useState<null | HTMLElement>(null);

	// const params = useParams();
	// const userId = params.userId
	const { userId } = useParams();

	useEffect(() => {
		fetchUserItem();
	}); //}, []);

	async function fetchUserItem() {
		try {
			const response = await axios.get(
				`https://jsonplaceholder.typicode.com/users/${userId}/posts`
			);
			setBookmarks(response.data);
		} catch (error) {
			alert(error);
		}
	}
	const open = Boolean(bookMenu);

	const handleBookClick = (event: React.MouseEvent<HTMLElement>) => {
		setBookMenu(event.currentTarget);
	};

	const handleBookClose = () => {
		setBookMenu(null);
	};

	return (
		<TableContainer component={Paper} sx={{ marginTop: '6rem' }}>
			<Table
				sx={{
					minWidth: '300px',
					borderRadius: '1rem 1rem',
					boxShadow: 'inset 0px 0px 6px 0px #dadada'
				}}>
				<TableBody>
					{/* Data from jsonplaceholder.typicode.com */}
					{bookmarks.map((bookmark) => (
						<TableRow
							hover
							key={bookmark.id}
							sx={{
								display: 'flex',
								// alignItems: 'center',
								'&:last-child td, &:last-child th': { border: 0 }
							}}>
							<TableCell
								sx={{
									display: 'flex',
									alignItems: 'center'
								}}
								component="th"
								scope="row">
								<DriveFileIcon sx={{ marginRight: '1rem' }} />
								{bookmark.title}
							</TableCell>
							<TableCell sx={{ flexGrow: 1 }} />
							<TableCell
								sx={{
									// display: { xs: 'flex' }
									display: 'flex'
								}}>
								<IconButton
									size="small"
									id="menu-button"
									title="Menu Item"
									aria-label="more"
									aria-controls={open ? 'menu-bookmark' : undefined}
									aria-expanded={open ? 'true' : undefined}
									aria-haspopup="true"
									onClick={handleBookClick}
									// color="inherit"
								>
									<MoreIcon />
								</IconButton>
								<Menu
									id="menu-bookmark"
									// MenuListProps={{ 'aria-labelledby': 'menu-button' }}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right'
									}}
									anchorEl={bookMenu}
									open={open}
									onClose={handleBookClose}>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Rename
									</MenuItem>
									<MenuItem
										divider
										// onClick={handleProfileMenuOpen}
									>
										Delete
									</MenuItem>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Cut
									</MenuItem>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Copy
									</MenuItem>
									<MenuItem
										divider
										// onClick={handleProfileMenuOpen}
									>
										Paste
									</MenuItem>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Open in new tab
									</MenuItem>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Open in new window
									</MenuItem>
									<MenuItem
									// onClick={handleProfileMenuOpen}
									>
										Open in Incognito window
									</MenuItem>
								</Menu>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default UserItem;
