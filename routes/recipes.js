const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("../middleware/auth");

// Get all recipes (with search functionality)
router.get("/", async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { ingredients: { $regex: search, $options: "i" } },
                    { instructions: { $regex: search, $options: "i" } },
                ],
            };
        }

        const recipes = await Recipe.find(query).populate('user', 'id username');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get a single recipe
router.get("/:id", async (req, res) => {
	try {
		const recipe = await Recipe.findById(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}
		res.json(recipe);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Create a new recipe
router.post("/", auth, async (req, res) => {
	const recipe = new Recipe({
		title: req.body.title,
		description: req.body.description,
		ingredients: req.body.ingredients,
		instructions: req.body.instructions,
		user: req.user.id,
	});

	try {
		const newRecipe = await recipe.save();
		res.status(201).json(newRecipe);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Update a recipe
router.put("/:id", auth, async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}
		res.json(recipe);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete a recipe
router.delete("/:id", auth, async (req, res) => {
	try {
		const recipe = await Recipe.findByIdAndDelete(req.params.id);
		if (!recipe) {
			return res.status(404).json({ message: "Recipe not found" });
		}
		res.json({ message: "Recipe deleted successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
