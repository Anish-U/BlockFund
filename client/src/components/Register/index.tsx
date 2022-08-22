import './styles.css';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import Web3 from 'web3';

const RegisterBox = () => {
	const initialValues = {
		email: '',
		firstName: '',
		lastName: '',
		password: '',
		confirmPassword: '',
	};

	type values = {
		email: string;
		firstName: string;
		lastName: string;
		password: string;
		confirmPassword: string;
	};

	const [formValues, setFormValues] = useState(initialValues);
	const [formErrors, setFormErrors] = useState(initialValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const validateForm = (values: values) => {
		const errors: any = {};

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		const nameRegex = /^[a-zA-Z]{1,30}$/;

		if (!values.email) {
			errors.email = 'Email is required';
		} else if (!emailRegex.test(values.email)) {
			errors.email = 'Invalid email format';
		}

		if (!values.firstName) {
			errors.firstName = 'First Name is required';
		} else if (!nameRegex.test(values.firstName)) {
			errors.firstName = 'Invalid Name format';
		}

		if (!values.lastName) {
			errors.lastName = 'Last Name is required';
		} else if (!nameRegex.test(values.lastName)) {
			errors.lastName = 'Invalid Name format';
		}

		if (!values.password) {
			errors.password = 'Password is required';
		} else if (values.password.length < 4 || values.password.length > 15) {
			errors.password = 'Invalid Password format';
		}

		if (!values.confirmPassword) {
			errors.confirmPassword = 'Confirm Password is required';
		} else if (
			values.confirmPassword.length < 4 ||
			values.confirmPassword.length > 15
		) {
			errors.confirmPassword = 'Invalid Confirm Password format';
		} else if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	};

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();

		setFormErrors(validateForm(formValues));

		const formData = {
			email: formValues.email,
			firstName: formValues.firstName,
			lastName: formValues.lastName,
			password: formValues.password,
			confirmPassword: formValues.confirmPassword,
			ethAccount: '',
		};

		if (Object.keys(formErrors).length > 0) return;

		try {
			let web3;

			web3 = new Web3(window.web3.currentProvider);
			const addresses = await web3.eth.getAccounts();
			console.log(addresses[0]);

			formData.ethAccount = addresses[0];

			const res = await axios.post(
				`${process.env.REACT_APP_SERVER_URL}/user`,
				formData
			);

			// console.log(res.data);

			window.location.href = '/login';
		} catch (err) {
			alert('Please try again later!');
		}
	};

	return (
		<>
			<div className='registerContainer'>
				<div className='formContainer'>
					<form onSubmit={handleSubmit}>
						<h1 className='formHeading'>Register Form</h1>

						<div className='inputContainer'>
							<span>Email</span>
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
							<span>First Name</span>
							<br />
							<input
								type='firstName'
								name='firstName'
								placeholder='First Name'
								onChange={handleChange}
								value={formValues.firstName}
								required
							/>
							<br />
							<p className='error'>{formErrors.firstName}</p>
						</div>

						<div className='inputContainer'>
							<span>Last Name</span>
							<br />
							<input
								type='lastName'
								name='lastName'
								placeholder='Last Name'
								onChange={handleChange}
								value={formValues.lastName}
								required
							/>
							<br />
							<p className='error'>{formErrors.lastName}</p>
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
							<span> Confirm Password </span>
							<br />
							<input
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
								onChange={handleChange}
								value={formValues.confirmPassword}
								required
							/>
							<br />
							<p className='error'>{formErrors.confirmPassword}</p>
						</div>

						<div className='inputContainer'>
							<button type='submit' className='submitBtn'>
								Register
							</button>
						</div>

						<div className='linkContainer'>
							<Link to='/login'>Already a user? Login here </Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default RegisterBox;
