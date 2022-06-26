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
// import { title } from 'pr

interface ModalDialogProps {
	anchorElNav: null | HTMLElement;
	bookmarkModalOpen: any;
	setBookmarkModalOpen: any;
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

const ModalCard: FC<ModalDialogProps> = ({
	anchorElNav,
	bookmarkModalOpen,
	setBookmarkModalOpen,
	onClose
}) => {
	const handleClose = () => {
		setBookmarkModalOpen(false);
	};

	const onSubmitForm = (event: any) => {
		event.preventDefault();
		console.log('event', event);
		console.log('event', event.target[0].value);
		console.log('event', event.target[1].value);
	};
	// 	//cancel default value
	// 	event.preventDefault();
	// 	//canceled information about input if he empty
	// 	if (bookmarkModalOpen === '') return;
	// 	//here create list!!!
	// 	if (anchorElNav === null) {
	// 		setBookmarkModalOpen([
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
				open={bookmarkModalOpen}
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
								// value={value}
								// onChange={handleChange}
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

export default ModalCard;
