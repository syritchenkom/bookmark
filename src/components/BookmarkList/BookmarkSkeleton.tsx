import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		speed={2}
		width={762}
		height={110}
		viewBox="0 0 762 110"
		backgroundColor="#dbdbdb"
		foregroundColor="#bdbdbd">
		<rect x="0" y="0" rx="0" ry="0" width="762" height="110" />
	</ContentLoader>
);

export default Skeleton;

/* import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

export default function SkeletonColor() {
  return (
    <Box
      sx={{
        bgcolor: '#121212',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
  );
} */
