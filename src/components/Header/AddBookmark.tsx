import React, { FC, useState } from 'react';

import {
	Modal,
	Box,
	Typography,
	FormControl,
	InputLabel,
	TextField,
	Button
} from '@mui/material';

import { useAppDispatch } from '../../redux/store';
// import { nanoid } from '@reduxjs/toolkit';
import { addBookmark } from '../../redux/bookmark/slice';
import { useParams } from 'react-router-dom';

interface AddBookmarkProps {
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
	addBookmarkOpen,
	setAddBookmarkOpen,
	onClose
}) => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const dispatch = useAppDispatch();

	const { userId } = useParams();

	const onTitleChanged = (e: any) => setTitle(e.target.value);
	const onBodyChange = (e: any) => setBody(e.target.value);

	const handleClose = () => {
		setAddBookmarkOpen(false);
	};

	const canSave = Boolean(title) && Boolean(body);

	const onSaveBookmarkClicked = (e: any) => {
		e.preventDefault();
		if (title && body) {
			dispatch(
				addBookmark({
					userId: Number(userId),
					id: Number(Math.random()),
					title,
					body
				})
			);
			setTitle('');
			setBody('');
		}
		setAddBookmarkOpen(false);
	};

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
					{/* <form onSubmit={onSubmitForm}> */}
					<form>
						<InputLabel shrink htmlFor="postTitle">
							Title
						</InputLabel>
						<FormControl fullWidth required variant="standard">
							<TextField
								type="text"
								id="postTitle"
								name="postTitle"
								variant="filled"
								autoComplete="title"
								autoFocus
								value={title}
								onChange={onTitleChanged}
							/>
						</FormControl>
						<Box mt={2} />
						<InputLabel shrink htmlFor="postBody">
							Body
						</InputLabel>
						<FormControl fullWidth variant="standard">
							<TextField
								type="text"
								id="postBody"
								name="postBody"
								variant="filled"
								autoComplete="body"
								value={body}
								onChange={onBodyChange}
							/>
						</FormControl>
						<Box mt={2} sx={{ float: 'right' }}>
							<Button type="button" onClick={handleClose}>
								Cancel
							</Button>
							<Button
								type="submit"
								variant="contained"
								onClick={onSaveBookmarkClicked}
								disabled={!canSave}>
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
