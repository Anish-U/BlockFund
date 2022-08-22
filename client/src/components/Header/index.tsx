import './styles.css';

import { Link } from 'react-router-dom';
import { Home, Logout, Login, PersonAdd, AddCircle } from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';

import { stringAvatar } from '../../helpers/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators, State } from '../../state';
import { bindActionCreators } from 'redux';

const Header = () => {
	const dispatch = useDispatch();

	const { logout } = bindActionCreators(actionCreators, dispatch);

	const user = useSelector((state: State) => state.auth);

	const logOutHandler = () => {
		logout();

		localStorage.removeItem('token');
		localStorage.removeItem('email');
		localStorage.removeItem('ethAcc');
		localStorage.removeItem('firstName');
		localStorage.removeItem('lastName');
	};

	return (
		<>
			<div className='headerContainer'>
				<div className='headerLeft'></div>

				<div className='headerMid'>
					<h2 className='headerTitle'>BlockFund 🤝🏽</h2>
					<p className='headerTagline'>
						Crowdfunding using the powers of Blockchain.
					</p>
				</div>

				<div className='headerRight'>
					<div className='headerLinks'>
						<Tooltip title='Home'>
							<Link to='/' style={{ textDecoration: 'none' }}>
								<Home color='primary' />
							</Link>
						</Tooltip>

						{user.isLogged && (
							<>
								<Tooltip title='Create Campaign'>
									<Link to='/createCampaign' style={{ textDecoration: 'none' }}>
										<AddCircle color='primary' />
									</Link>
								</Tooltip>

								<Tooltip title={user.userData.email || ''}>
									<Avatar
										{...stringAvatar(
											user.userData.firstName || '',
											user.userData.lastName || ''
										)}
										style={{ fontSize: '12px' }}
									/>
								</Tooltip>

								<Tooltip title='Logout'>
									<Logout
										color='primary'
										style={{ cursor: 'pointer' }}
										onClick={logOutHandler}
									/>
								</Tooltip>
							</>
						)}

						{!user.isLogged && (
							<>
								<Tooltip title='Login'>
									<Link to='/login' style={{ textDecoration: 'none' }}>
										<Login color='primary' />
									</Link>
								</Tooltip>

								<Tooltip title='Register'>
									<Link to='/register' style={{ textDecoration: 'none' }}>
										<PersonAdd color='primary' />
									</Link>
								</Tooltip>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
