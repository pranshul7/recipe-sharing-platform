import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { getRecipes, deleteRecipe, searchRecipes } from "../api";

function RecipesList() {
	const [recipes, setRecipes] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
		const userJson = localStorage.getItem("user");
		if (userJson) {
			setCurrentUser(JSON.parse(userJson));
		}
	}, []);
	console.log("Current user:", currentUser); // Debug log
    

	const fetchRecipes = useCallback(async () => {
		try {
			const response = await (searchTerm
				? searchRecipes(searchTerm)
				: getRecipes());
			setRecipes(response.data);
			console.log("Fetched recipes:", response.data); // Debug log
		} catch (error) {
			console.error("Error fetching recipes:", error);
        }
	}, [searchTerm]);

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	const handleSearch = (e) => {
		e.preventDefault();
		fetchRecipes();
	};

	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this recipe?")) {
			try {
				await deleteRecipe(id);
				alert("Recipe deleted successfully!");
				fetchRecipes();
			} catch (error) {
				console.error("Error deleting recipe:", error);
				alert("Failed to delete recipe: " + error.message);
			}
		}
	};

	return (
		<div>
			<h2>Recipes</h2>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search recipes..."
				/>
				<button type="submit">Search</button>
			</form>
			<div className="recipes-list">
				<h2>Recipes</h2>
				{recipes.map((recipe) => (
					<div key={recipe._id} className="recipe-card">
						<h3>{recipe.title}</h3>
						<p>
							<strong>Description:</strong> {recipe.description}
						</p>
						<p>
							<strong>Ingredients:</strong>
						</p>
						<ul>
							{recipe.ingredients.map((ingredient, index) => (
								<li key={index}>{ingredient}</li>
							))}
						</ul>
						<p>
							<strong>Instructions:</strong> {recipe.instructions}
						</p>
						{currentUser && currentUser.id === recipe.user._id && (
							<>
								<Link to={`/edit-recipe/${recipe._id}`}><button>Edit</button></Link>
								<button onClick={() => handleDelete(recipe._id)}>Delete</button>
							</>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default RecipesList;
