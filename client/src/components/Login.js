import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	// const API_URL = '5000-idx-recipe-sharing-platformgit-1724994789362.cluster-bec2e4635ng44w7ed22sa22hes.cloudworkstations.dev';

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:5000/auth/login",
				// `http://${API_URL}/auth/login`,
				{
					email,
					password,
				},
				{
					// withCredentials:true
				}
			);
			localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
			alert("Login successful!");
			navigate("/recipes");
		} catch (error) {
			console.error("Error logging in:", error);
			alert("Failed to login: " + error.response.data.message);
		}
	};

	return (
		<div className="login">
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
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
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
