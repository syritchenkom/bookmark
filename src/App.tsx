import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import BookmarkList from './components/BookmarkList';
import NotFound from './pages/NotFound';
import Favorite from './pages/Favorite/Favorite';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route path=":userId" element={<BookmarkList />} />
				<Route path="*" element={<NotFound />} />
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
				{/* <Route path="*" element={<Navigate to="/" replace />} /> */}
				{/* <Route path="/*" element={<NotFound />} /> */}
			</Route>
			<Route path="/favorite" element={<Favorite />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	);
};

export default App;
