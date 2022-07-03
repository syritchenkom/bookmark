import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserItem from './components/UserItem/UserItem';
// import MainLayout from './components/layouts/MainLayout';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route path=":userId" element={<UserItem />}>
					<Route
						index
						element={
							<div style={{ padding: '1rem' }}>
								<p>Select an invoice</p>
							</div>
						}
					/>
				</Route>
				<Route
					path="*"
					element={
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								minHeight: '40rem'
							}}
							// className="nothingClass"
						>
							<p>There's nothing here!</p>
						</div>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
