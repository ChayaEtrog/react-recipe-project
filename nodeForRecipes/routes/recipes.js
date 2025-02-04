import express from 'express';
import fs from 'fs';
import path from 'path';
import authMiddleware from '../middleware/authMiddleware.js';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db/db.json');

// שליפת כל המתכונים
router.get('/', (req, res) => {
    const db = JSON.parse(fs.readFileSync(dbPath));
    res.json(db.recipes);
});

// הוספת מתכון (רק למשתמש מחובר)
router.post('/', authMiddleware, (req, res) => {
    const {
        title,
        description,
        products,
        ingredients,
        instructions
    } = req.body;
    const db = JSON.parse(fs.readFileSync(dbPath));

    const newRecipe = {
        id: Date.now(),
        title,
        products,
        description,
        authorId: req.header('user-id'),
        ingredients,
        instructions,
    };

    db.recipes.push(newRecipe);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.status(201).json({ message: "Recipe added", recipe: newRecipe });
});

router.put('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const { title, description, products, ingredients, instructions } = req.body;
    const userId = req.header('user-id'); // מזהה המשתמש המחובר

    const db = JSON.parse(fs.readFileSync(dbPath));

    const recipeIndex = db.recipes.findIndex(recipe => recipe.id == id);

    if (recipeIndex === -1) {
        return res.status(401).json({ message: "Recipe not found" });
    }

    // בדיקה שהמשתמש המחובר הוא היוצר של המתכון
    if (db.recipes[recipeIndex].authorId !== userId) {
        return res.status(403).json({ message: "You are not authorized to edit this recipe" });
    }

    // עדכון המתכון
    db.recipes[recipeIndex] = {
        ...db.recipes[recipeIndex], // שומר את הערכים הקודמים
        title: title ?? db.recipes[recipeIndex].title,
        description: description ?? db.recipes[recipeIndex].description,
        products: products ?? db.recipes[recipeIndex].products,
        ingredients: ingredients ?? db.recipes[recipeIndex].ingredients,
        instructions: instructions ?? db.recipes[recipeIndex].instructions
    };

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({ message: "Recipe updated successfully", recipe: db.recipes[recipeIndex] });
});

router.delete('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    const userId = req.header('user-id'); // מזהה המשתמש המחובר

    const db = JSON.parse(fs.readFileSync(dbPath));
    const recipeIndex = db.recipes.findIndex(recipe => recipe.id == id);

    if (recipeIndex === -1) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    // בדיקה שהמשתמש המחובר הוא היוצר של המתכון
    if (db.recipes[recipeIndex].authorId !== userId) {
        return res.status(403).json({ message: "You are not authorized to delete this recipe" });
    }

    // מחיקת המתכון
    db.recipes.splice(recipeIndex, 1);
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({ message: "Recipe deleted successfully" });
});

export default router;
