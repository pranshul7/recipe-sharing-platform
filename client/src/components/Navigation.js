import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
	const navigate = useNavigate();
	const isLoggedIn = !!localStorage.getItem("token");

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav>
			<ul>
				<li><Link to="/recipes">Recipes</Link></li>
				<li><Link to="/add-recipe">Add Recipe</Link></li>
				{isLoggedIn ? (
					<>
						<li><Link to="/profile">Profile</Link></li>
						<li><button onClick={handleLogout}>Logout</button></li>
					</>
				) : (
					<>
						<li><Link to="/login">Login</Link></li>
						<li><Link to="/register">Register</Link></li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navigation;
