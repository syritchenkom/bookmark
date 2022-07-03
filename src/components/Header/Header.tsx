import React, { FC, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	InputBase,
	MenuItem,
	Menu,
	Avatar
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import GoogleLogo from '../../assets/logo/googleLogo.png';
import AddBookmark from './AddBookmark';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
	justifyContent: 'flex-end'
}));

const SearchIconItem = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 1),
	marginRight: '3rem',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	[theme.breakpoints.up('md')]: {
		display: 'none'
	}
}));

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: '1.5rem',
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	display: 'none',
	[theme.breakpoints.up('md')]: {
		display: 'block',
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(3),
		width: '42rem'
	}
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '36rem'
		}
	}
}));

const Header: FC = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const [addBookmarkOpen, setAddBookmarkOpen] = useState<boolean>(false);
	// const [searchBookmark, setSearchBookmark] = useState<string | undefined>();

	// const searchBookmarks = (event: any) => {
	// 	const value = event.target?.value;
	// 	setSearchBookmark(value)
	// };

	const toggleModal = () => {
		setAddBookmarkOpen((addBookmarkOpen) => !addBookmarkOpen);
	};
	const bookmarkModalClose = () => {
		setAddBookmarkOpen(false);
	};

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleMenuClose = () => {
		// If addBookmarkOpen that Menu closed
		// if (addBookmarkOpen === true) {
		// 	anchorElNav();
		// }
		// =======
		setAnchorElNav(null);
		// setAddBookmarkOpen(false);
	};

	const mobileSearchId = 'primary-search-account-menu-mobile';
	const RenderSearch = (
		<>
			<SearchIconWrapper id={mobileSearchId}>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				// onChange={searchBookmarks}
				placeholder="Search…"
				inputProps={{ 'aria-label': 'search' }}
			/>
		</>
	);

	return (
		<AppBar position="fixed">
			<StyledToolbar>
				<Box
					component="div"
					sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
					<Avatar
						src={GoogleLogo}
						alt="Google logo"
						sx={{ width: 24, height: 24, marginRight: 1 }}
					/>
					<Typography
						variant="h6"
						noWrap
						component="div"
						// sx={{ display: { xs: 'block' } }
					>
						Bookmarks
					</Typography>
				</Box>
				<SearchIconItem>
					<SearchIcon />
				</SearchIconItem>
				<Search aria-controls={mobileSearchId}>{RenderSearch}</Search>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: 'flex' } }}>
					<IconButton
						size="large"
						title="Menu"
						aria-label="show more"
						aria-controls="menu-bookmark"
						aria-haspopup="true"
						onClick={handleMenuOpen}
						color="inherit">
						<MoreIcon />
					</IconButton>
					<Menu
						anchorEl={anchorElNav}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						id="menu-bookmark"
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						open={Boolean(anchorElNav)}
						onClose={handleMenuClose}>
						<MenuItem
							divider
							// onClick={handleProfileMenuOpen}
						>
							Sort by name
						</MenuItem>
						{/* Add new Bookmark */}
						<MenuItem onClick={toggleModal}>Add new Bookmark</MenuItem>
						{/* Bookmark Modal Card */}
						<AddBookmark
							anchorElNav={anchorElNav}
							addBookmarkOpen={addBookmarkOpen}
							setAddBookmarkOpen={setAddBookmarkOpen}
							onClose={bookmarkModalClose}
						/>
						<MenuItem
							divider
							// onClick={handleProfileMenuOpen}
						>
							Add new folder
						</MenuItem>
						<MenuItem
						// onClick={handleProfileMenuOpen}
						>
							Import Bookmarks
						</MenuItem>
						<MenuItem
							divider
							// onClick={handleProfileMenuOpen}
						>
							Export Bookmarks
						</MenuItem>
						<MenuItem
						// onClick={handleProfileMenuOpen}
						>
							Help center
						</MenuItem>
					</Menu>
				</Box>
			</StyledToolbar>
		</AppBar>
	);
};

export default Header;
