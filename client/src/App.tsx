import './App.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import { State } from './state';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Campaign from './pages/Campaign';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateCampaign from './pages/CreateCampaign';

const App = () => {
	// const dispatch = useDispatch();

	// const { login, logout } = bindActionCreators(actionCreators, dispatch);

	const user = useSelector((state: State) => state.auth);

	return (
		<>
			<div className='appContainer'>
				<Router>
					<Routes>
						<Route
							path='/'
							element={user.isLogged ? <Home /> : <Navigate to='/login' />}
						/>

						<Route
							path='/campaign/:id'
							element={!user.isLogged ? <Navigate to='/' /> : <Campaign />}
						/>

						<Route
							path='/createCampaign'
							element={
								!user.isLogged ? <Navigate to='/' /> : <CreateCampaign />
							}
						/>

						<Route
							path='/login/'
							element={user.isLogged ? <Navigate to='/' /> : <Login />}
						/>

						<Route
							path='/register'
							element={user.isLogged ? <Navigate to='/' /> : <Register />}
						/>

						<Route path='*' element={<NotFound />} />
					</Routes>
				</Router>
			</div>
		</>
	);
};

export default App;
