import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getRecipes, updateRecipe } from "../api";

function EditRecipe() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [instructions, setInstructions] = useState("");
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchRecipe = async () => {
			try {
				const response = await getRecipes();
				const recipe = response.data.find((r) => r._id === id);
				if (recipe) {
					setTitle(recipe.title);
					setDescription(recipe.description);
					setIngredients(recipe.ingredients.join(", "));
					setInstructions(recipe.instructions);
				}
			} catch (error) {
				console.error("Error fetching recipe:", error);
			}
		};
		fetchRecipe();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await updateRecipe(id, {
				title,
				description,
				ingredients: ingredients.split(",").map((item) => item.trim()),
				instructions,
			});
			alert("Recipe updated successfully!");
			navigate("/recipes");
		} catch (error) {
			console.error("Error updating recipe:", error);
			alert("Failed to update recipe: " + error.message);
		}
	};

	return (
		<div className="edit-recipe">
			<h2>Edit Recipe</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Ingredients (comma-separated):</label>
					<textarea
						value={ingredients}
						onChange={(e) => setIngredients(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Instructions:</label>
					<textarea
						value={instructions}
						onChange={(e) => setInstructions(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Update Recipe</button>
			</form>
		</div>
	);
}

export default EditRecipe;
