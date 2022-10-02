import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import BookmarkList from './components/BookmarkList';

const App = () => {
	return (
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
								{'<='} Select an folder on left
							</p>
						</div>
					}
				/>
				<Route path=":userId" element={<BookmarkList />} />
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
