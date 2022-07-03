import React, { FC } from 'react';

import {
	Modal,
	Box,
	Typography,
	FormControl,
	InputLabel,
	TextField,
	Button
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
// import { addBookmark } from '../../redux/bookmarks/slice';
// import { title } from 'pr

interface AddBookmarkProps {
	anchorElNav: null | HTMLElement;
	addBookmarkOpen: any;
	setAddBookmarkOpen: any;
	onClose: (value: string) => void;
}

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	maxWidth: '100%',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
};

const AddBookmark: FC<AddBookmarkProps> = ({
	anchorElNav,
	addBookmarkOpen,
	setAddBookmarkOpen,
	onClose
}) => {
	const bookmarks = useAppSelector((state) => state.bookmark);
	// console.log('bookmarks', bookmarks);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		setAddBookmarkOpen(false);
	};

	const onSubmitForm = (event: any) => {
		event.preventDefault();
		// dispatch(
		// 	addBookmark({
		// 		// userId: event.target,
		// 		// id: event.target,
		// 		name: event.target[0].value,
		// 		url: event.target[1].value
		// 	})
		// );
		setAddBookmarkOpen(false);
		console.log('bookmark', bookmarks);
	};
	// 	//cancel default value
	// 	event.preventDefault();
	// 	//canceled information about input if he empty
	// 	if (bookmarkModalOpen === '') return;
	// 	//here create list!!!
	// 	if (anchorElNav === null) {
	// 		setAddBookmarkOpen([
	// 			...bookmarkModalOpen,
	// 			// add property
	// 			{ title: bookmarkModalOpen, id: Math.random() * 1000 }
	// 		]);
	// 		anchorElNav();
	// 	}
	// };
	return (
		<>
			<Modal
				open={addBookmarkOpen}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h6">
						Add bookmark
					</Typography>
					<form onSubmit={onSubmitForm}>
						<InputLabel shrink htmlFor="name">
							Name
						</InputLabel>
						<FormControl fullWidth required variant="standard">
							<TextField
								type="text"
								id="name"
								name="name"
								variant="filled"
								autoComplete="name"
								autoFocus
							/>
						</FormControl>
						<Box mt={2} />
						<InputLabel shrink htmlFor="url">
							Url
						</InputLabel>
						<FormControl fullWidth variant="standard">
							<TextField
								type="text"
								id="url"
								name="url"
								variant="filled"
								autoComplete="url"
							/>
						</FormControl>
						<Box mt={2} sx={{ float: 'right' }}>
							<Button type="button" onClick={handleClose}>
								Cancel
							</Button>
							<Button type="submit" variant="contained">
								Save
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default AddBookmark;
