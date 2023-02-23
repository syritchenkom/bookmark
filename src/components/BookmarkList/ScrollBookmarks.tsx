import React, { useEffect } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateScrollBookmark } from '../../redux/bookmark/asyncActions';
import { Box, Fab } from '@mui/material';

const useStyles = {
	toTop: {
		zIndex: 2,
		position: 'fixed',
		bottom: '2vh',
		backgroundColor: '#DCDCDC',
		color: 'black',
		'&:hover, &.Mui-focusVisible': {
			transition: '0.3s',
			color: '#397BA6',
			backgroundColor: '#DCDCDC'
		},
		right: '5%'
	},
	toBottom: {
		zIndex: 2,
		position: 'fixed',
		bottom: '2vh',
		backgroundColor: '#DCDCDC',
		color: 'black',
		'&:hover, &.Mui-focusVisible': {
			transition: '0.3s',
			color: '#397BA6',
			backgroundColor: '#DCDCDC'
		},
		right: '5%'
	}
};

export const ScrollBookmarks = () => {
	const dispatch = useAppDispatch();
	const scrollPosition = useAppSelector(({ bookmark }) => bookmark.position);

	useEffect(() => {
		const handleScroll = () =>
			dispatch(updateScrollBookmark(window.pageYOffset));
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [dispatch]);

	const handleClickTop = () => {
		window.scrollTo({ top: 0, behavior: `smooth` });
	};

	const handleClickDown = () => {
		window.scrollTo({ top: document.body.scrollHeight, behavior: `smooth` });
	};

	/* const handleScroll = () => {
		if (window.pageYOffset > showBelow) {
			if (!show) setShow(true);
		} else {
			if (show) setShow(false);
		}
	};
	 useEffect(() => {
		if (showBelow) {
			window.addEventListener(`scroll`, handleScroll);
			return () => window.removeEventListener(`scroll`, handleScroll);
		}
	});  
	const handleClick = () => {
		window[`scrollTo`]({ top: 0, behavior: `smooth` });
	};
	*/

	return (
		<Box>
			{scrollPosition > 50 && (
				<Fab
					sx={useStyles.toTop}
					color="secondary"
					size="small"
					onClick={handleClickTop}>
					<KeyboardArrowUp />
				</Fab>
			)}
			{scrollPosition < 50 && (
				<Fab
					sx={useStyles.toBottom}
					color="secondary"
					size="small"
					onClick={handleClickDown}>
					<KeyboardArrowDown />
				</Fab>
			)}
		</Box>
	);
};
