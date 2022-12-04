import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				flexDirection: 'column',
				alignItems: 'center',
				textAlign: 'center',
				width: '100%',
				minHeight: '40rem'
			}}>
			<h1 style={{ marginBottom: '4rem' }}>
				404 <br />
				Page NotFound
			</h1>
			<p>Sorry, the page you were looking for does not exist.</p>
			<p>Go To Homepage by Button Below</p>
			<Link
				to="/"
				style={{
					display: 'inline-block',
					margin: '1rem 0',
					padding: '1rem',
					fontSize: '1rem',
					color: 'black',
					cursor: 'pointer',
					backgroundColor: 'skyBlue',
					borderRadius: '0.25rem',
					textDecoration: 'none',
					transition:
						'color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out'
				}}>
				Home Page
			</Link>
		</div>
	);
};

export default NotFound;
