import './styles.css';

import { Link } from 'react-router-dom';
import { Home, Logout, Login, PersonAdd, AddCircle } from '@mui/icons-material';
import { Avatar, Tooltip } from '@mui/material';

import { stringAvatar } from '../../helpers/avatar';

const Header = () => {
	const user: boolean = true;
	const name: string = 'Anish ummenthala';

	const logOutHandler = () => {
		alert('Logout clicked');
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

						{user && (
							<>
								<Tooltip title='Create Campaign'>
									<Link to='/createCampaign' style={{ textDecoration: 'none' }}>
										<AddCircle color='primary' />
									</Link>
								</Tooltip>

								<Tooltip title={name}>
									<Avatar
										{...stringAvatar(name)}
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

						{!user && (
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
