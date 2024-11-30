import React, { useState } from 'react'
import axios from 'axios'

const Register = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async e => {
		try {
			const response = await axios.post('/api/register', {
				username,
				email,
				password,
			})
			console.log('Registration successful:', response.data)
			// Здесь можно добавить логику для перенаправления на страницу входа
		} catch (error) {
			console.error('Registration failed:', error)
			alert('Registration failed. Please try again.')
		}
	}

	return (
		<div className='auth-container'>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div className='input-group'>
					<label>Username</label>
					<input
						type='text'
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className='input-group'>
					<label>Email</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='input-group'>
					<label>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className='loginButton'>
					<button type='submit' className='button primary'>
						Register
					</button>
				</div>
			</form>
		</div>
	)
}

export default Register
