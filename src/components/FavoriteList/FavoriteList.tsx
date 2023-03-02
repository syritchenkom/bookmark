import { Favorite } from '@mui/icons-material'
import { Fab, TableCell } from '@mui/material'
import React from 'react'

export const FavoriteList = () => {
  return (
    <TableCell
											sx={{
												display: 'flex',
												alignItems: 'center'
											}}
											// component="th"
											// scope="row"
										>
											{/* <InsertDriveFileOutlined sx={{ marginRight: '1rem' }} /> */}
											<Fab
												aria-label="Like the bookmark"
												color="primary"
												size="medium">
												<Favorite />
											</Fab>
										</TableCell>
  )
}
    