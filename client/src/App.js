import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import RecipesList from "./components/RecipesList";
import AddRecipe from "./components/AddRecipe";
import EditRecipe from "./components/EditRecipe";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Routes>
					<Route path="/" element={<RecipesList />} />
					<Route path="/recipes" element={<RecipesList />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/add-recipe"
						element={
							<ProtectedRoute>
								<AddRecipe />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/edit-recipe/:id"
						element={
							<ProtectedRoute>
								<EditRecipe />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/profile"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;

