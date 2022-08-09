import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Campaign from './pages/Campaign';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
	return (
		<>
			<div className='appContainer'>
				<Router>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/campaign/:id' element={<Campaign />} />
						<Route path='/createCampaign' element={<Campaign />} />
						<Route path='/login/' element={<Login />} />
						<Route path='/register' element={<Register />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</Router>
			</div>
		</>
	);
};

export default App;
