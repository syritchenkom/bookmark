import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserItem from './components/BookmarkList/UserItem';
// import MainLayout from './components/layouts/MainLayout';

const App = () => {
	return (
		// https://codesandbox.io/s/cool-rubin-vwsp36?file=/src/App.js => Link to route
		<Routes>
			<Route path="/" element={<Home />}>
				<Route
					index
					element={
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
								minHeight: '40rem'
							}}>
							<p>
								&lt;There's nothing here!&gt;
								<br />
								{'<='} Select an invoice on left
							</p>
						</div>
					}
				/>
				<Route path=":userId" element={<UserItem />} />
				{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
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
							}}>
							<p>There's nothing here!</p>
						</div>
					}
				/>
			</Route>
		</Routes>
	);
};

export default App;
