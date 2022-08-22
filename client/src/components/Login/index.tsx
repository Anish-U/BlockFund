import './styles.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import axios from 'axios';
import jwt from 'jwt-decode';

import { actionCreators } from '../../state';
import { User } from '../../state/actions';

const LoginBox = () => {
	const initialValues = {
		email: '',
		password: '',
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState(initialValues);

	const dispatch = useDispatch();

	const { login } = bindActionCreators(actionCreators, dispatch);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const validateForm = (values: { email: string; password: string }) => {
		const errors: any = {};

		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!regex.test(values.email)) {
			errors.email = 'Invalid email format';
		}

		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 4 || values.password.length > 15) {
			errors.password = 'Invalid Password format';
		}

		return errors;
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		setFormErrors(validateForm(formValues));

		const formData = {
			email: formValues.email,
			password: formValues.password,
		};

		if (Object.keys(formErrors).length > 0) return;

		try {
			const res = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/user/login`,
				formData
			);
			const token = res.data;

			const data: any = jwt(token);

			const userData = {
				email: data.email,
				firstName: data.firstName,
				lastName: data.lastName,
				ethAcc: data.ethAccount,
			};

			const user: User = {
				isLogged: true,
				userData: userData,
			};

			login(user);

			localStorage.setItem('token', token);
			localStorage.setItem('email', userData.email);
			localStorage.setItem('firstName', userData.firstName);
			localStorage.setItem('lastName', userData.lastName);
			localStorage.setItem('ethAcc', userData.ethAcc);
		} catch (err) {
			alert('Invalid Username or Password');
		}
	};

	return (
		<>
			<div className='loginContainer'>
				<div className='formContainer'>
					<form onSubmit={handleSubmit}>
						<h1 className='formHeading'>Login Form</h1>

						<div className='inputContainer'>
							<span>Email </span>
							<br />
							<input
								type='email'
								name='email'
								placeholder='Email'
								onChange={handleChange}
								value={formValues.email}
								required
							/>
							<br />
							<p className='error'>{formErrors.email}</p>
						</div>

						<div className='inputContainer'>
							<span>Password </span>
							<br />
							<input
								type='password'
								name='password'
								placeholder='Password'
								onChange={handleChange}
								value={formValues.password}
								required
							/>
							<br />
							<p className='error'>{formErrors.password}</p>
						</div>

						<div className='inputContainer'>
							<button type='submit' className='submitBtn'>
								Login
							</button>
						</div>

						<div className='linkContainer'>
							<Link to='/register'>New user? Register here </Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginBox;
