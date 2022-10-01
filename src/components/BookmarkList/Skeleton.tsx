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
