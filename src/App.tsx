import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
// import MenuList from './components/MenuList/MenuList';
import UserItem from './components/UserItem/UserItem';
// import './App.css';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}>
				<Route path=":userId" element={<UserItem />}>
					<Route
						index
						element={
							<main style={{ padding: '1rem' }}>
								<p>Select an invoice</p>
							</main>
						}
					/>
				</Route>
			</Route>
			<Route
				path="*"
				element={
					<main
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
					</main>
				}
			/>
		</Routes>
	);
};

export default App;
