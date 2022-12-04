import React, { FC, useState } from 'react';

import { styled, alpha } from '@mui/material/styles';
import {
	AppBar,
	Box,
	Toolbar,
	Switch,
	Typography,
	InputBase,
	Avatar,
	FormControlLabel,
	ListItemButton
} from '@mui/material';

import { Search } from '@mui/icons-material';

import GoogleLogo from '../../assets/logo/googleLogo.png';
import ToggleColorMode from './ToggleColorMode';

import { useAppDispatch } from '../../redux/store';
import { searchGlobalBookmark } from '../../redux/bookmark/asyncActions';
import { searchBookmark } from '../../redux/bookmark/slice';
import MenuHeader from './MenuHeader';

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

const SearchIconStyled = styled('div')(({ theme }) => ({
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
	const dispatch = useAppDispatch();

	const [checkedSwitch, setCheckedSwitch] = useState<boolean>(false);
	const [searchValue, setSearchValue] = useState<string>('');
	const [openMenuHeader] = useState<boolean>(false);

	// Switch Search
	// const changeSearchSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	// send information about search switch
	// 	setCheckedSwitch(e.target.checked);
	// 	// console.log(e.target.checked);
	// };
	const changeSearchSwitch = (e: React.ChangeEvent<HTMLInputElement>) =>
		setCheckedSwitch((value) => !value);

	// Search Bookmark
	const searchBookmarks = (e: React.ChangeEvent<HTMLInputElement>) => {
		//event.preventDefault() => метод для відміни дій бравзера
		//addEventListener => для добавлення обробника подій
		//removeEventListener => для видалення обробника подій
		//event.currentTarget => для читання eventa
		//====

		setSearchValue(e.target.value);

		setTimeout(
			() =>
				!checkedSwitch // !checkedSwitch -> checkedSwitch === false
					? dispatch(searchBookmark(e.target.value))
					: dispatch(searchGlobalBookmark(e.target.value)),
			1000
		);
	};

	// Handle Menu Header
	// const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
	// 	// setAnchorElNav(event.currentTarget);
	// 	openMenuHeader();
	// };

	const mobileSearchId = 'primary-search-account-menu-mobile';
	const RenderSearch = (
		<>
			<SearchIconWrapper id={mobileSearchId}>
				<Search />
			</SearchIconWrapper>
			<StyledInputBase
				type="text"
				// autoFocus //???
				value={searchValue}
				onChange={searchBookmarks}
				placeholder="Search bookmark..."
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
				{/* Switch to global or local search */}
				<Box sx={{ width: '12%', textAlign: 'center' }}>
					<FormControlLabel
						value="bottom"
						control={
							<Switch
								checked={checkedSwitch}
								onChange={changeSearchSwitch}
								color="default"
								inputProps={{ 'aria-label': 'controlled' }}
							/>
						}
						label={checkedSwitch ? 'Global Search' : 'Local Search'}
						labelPlacement="bottom"
					/>
				</Box>
				<SearchIconItem>
					<Search />
				</SearchIconItem>
				<SearchIconStyled aria-controls={mobileSearchId}>
					{RenderSearch}
				</SearchIconStyled>
				<Box sx={{ flexGrow: 1 }} />
				{/* Switch Dark or White background */}
				<ToggleColorMode />
				{/* <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
					<WbSunnyIconStyled />
					<NightlightIconStyled />
				</Box>
				 <FormGroup>
					<FormControlLabel
						control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
						label="MUI switch"
					/>
				</FormGroup> */}
				{/* Menu Header */}
				<ListItemButton selected={openMenuHeader}>
					<MenuHeader />
				</ListItemButton>
			</StyledToolbar>
		</AppBar>
	);
};

export default Header;
