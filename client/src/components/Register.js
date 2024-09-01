import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	// const API_URL = '5000-idx-recipe-sharing-platformgit-1724994789362.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev';

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:5000/auth/register", {
				// await axios.post(
				// 	`http://${API_URL}/auth/register`,
				// 	{
						username,
						email,
						password,
					},
					{
						// withCredentials: true
					}
				);
			alert("Registration successful!");
			navigate("/login");
		} catch (error) {
			console.error("Error registering user:", error);
			alert("Failed to register: " + error.response.data.message);
		}
	};

	return (
		<div className="register">
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username">Username:</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						id="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Register</button>
			</form>
		</div>
	);
}

export default Register;
