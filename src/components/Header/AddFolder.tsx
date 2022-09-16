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
import { addFolder } from '../../redux/folder/slice';

interface AddFolderProps {
	addFolderOpen: any;
	setAddFolderOpen: any;
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

const AddFolder: FC<AddFolderProps> = ({
	addFolderOpen,
	setAddFolderOpen,
	onClose
}) => {
	const [name, setName] = useState('');

	const dispatch = useAppDispatch();

	const onNameChanged = (e: any) => setName(e.target.value);

	const handleClose = () => {
		setAddFolderOpen(false);
	};

	const canSave = Boolean(name);

	const onSaveBookmarkClicked = (e: any) => {
		e.preventDefault();
		if (name) {
			dispatch(
				addFolder({
					id: Number(Math.random()),
					name,
					username: '',
					email: '',
					address: {
						street: '',
						suite: '',
						city: '',
						zipcode: '',
						geo: {
							lat: '',
							lng: ''
						}
					},
					phone: '',
					website: '',
					company: {
						name: '',
						catchPhrase: '',
						bs: ''
					}
				})
			);
			setName('');
		}
		setAddFolderOpen(false);
	};

	return (
		<>
			<Modal
				open={addFolderOpen}
				onClose={onClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h6">
						Add folder
					</Typography>
					{/* <form onSubmit={onSubmitForm}> */}
					<form>
						<InputLabel shrink htmlFor="postName">
							Name
						</InputLabel>
						<FormControl fullWidth required variant="standard">
							<TextField
								type="text"
								id="postName"
								name="postName"
								variant="filled"
								autoComplete="Name"
								autoFocus
								value={name}
								onChange={onNameChanged}
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
								Add Folder
							</Button>
						</Box>
					</form>
				</Box>
			</Modal>
		</>
	);
};

export default AddFolder;
