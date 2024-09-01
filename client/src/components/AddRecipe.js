import React, { useState } from "react";
import { createRecipe } from "../api";
import { useNavigate } from "react-router-dom";

function AddRecipe() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState("");
	const [instructions, setInstructions] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createRecipe({
				title,
				description,
				ingredients: ingredients.split(",").map((item) => item.trim()),
				instructions,
			});
			alert("Recipe added successfully!");
			navigate("/recipes");
		} catch (error) {
			console.error("Error adding recipe:", error);
			alert("Failed to add recipe: " + error.message);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add New Recipe</h2>
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
			<button type="submit">Add Recipe</button>
		</form>
	);
}

export default AddRecipe;
