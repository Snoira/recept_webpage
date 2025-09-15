import mongoose from "mongoose";
import User from "../models/user.model.js";
import Recipe from "../models/recipe.model.js";
import Favorites from "../models/favorites.model.js";
import Comment from "../models/comment.model.js";
import { readDatabaseFile } from "../utils/database.js";
import { connect } from "../config/mongoose.js";
import path from "path";
import { fileURLToPath } from "url";

const databaseURI = process.env.DATABASE_PATH;
const USER_PASSWORD = process.env.SEED_USER_PASSWORD || "!losen1234";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDataPath = path.join(__dirname, "../data/users.data.json");
const recipesDataPath = path.join(__dirname, "../data/recipes.data.json");

const comments = [
    "Jättebra recept!",
    "Jag älskade det!",
    "Kommer laga igen.",
    "Inte min smak.",
    "För salt för mig.",
    "Perfekt för en snabb måltid.",
    "Kunde haft mer kryddor.",
    "Mina barn gillade det.",
    "Lätt att följa instruktionerna.",
    "Lite smaklöst, lade till extra örter."
];

connect(databaseURI);

const seedDatabase = async () => {
    try {
        const usersCount = await User.countDocuments();
        const recipesCount = await Recipe.countDocuments();
        const favoritesCount = await Favorites.countDocuments();
        const commentsCount = await Comment.countDocuments();

      

        if (usersCount > 0 || recipesCount > 0 || favoritesCount > 0 || commentsCount > 0) {
            console.log("Database already seeded.\n", { usersCount, recipesCount, favoritesCount, commentsCount }, "\nExiting...");
            return;
        }

        const userData = await readDatabaseFile(userDataPath);
        const recipesData = await readDatabaseFile(recipesDataPath);

        const databaseUsers = userData.map((user, i) => {
            return {
                ...user,
                _id: new mongoose.Types.ObjectId(),
                password: USER_PASSWORD
            }
        })

        const databaseRecipes = recipesData.map((recipe, i) => {
            const authorID = databaseUsers[i % databaseUsers.length]._id;
            return {
                ...recipe,
                author: authorID,
                _id: new mongoose.Types.ObjectId(),
            }
        })

        const databaseComments = [];
        databaseUsers.forEach((user, i) => {
            const userComments = databaseRecipes
                .filter((recipe, index) => {
                    if (recipe.author === user._id) return false;
                    if (index === 0 || index === 13) return false;
                    if (index % databaseUsers.length === 5 - i) return true;
                    if (i + 1 === index) return true;
                    return false;
                })
                .map((recipe) => {
                    const randomComment = comments[Math.floor(Math.random() * comments.length)];


                    const commentObject = {
                        user: user._id,
                        recipe: recipe._id,
                        content: randomComment
                    }
                    return commentObject;
                })
            databaseComments.push(...userComments);
        })

        const databaseFavorites = databaseUsers.map((user, i) => {
            const userFavorites = databaseRecipes
                .filter((recipe, index) => {
                    if (recipe.author === user._id) return false;
                    if (index === 0 || index === 13) return false;
                    if (index % databaseUsers.length === 5 - i) return true;
                    if (i + 2 === index) return true;
                    return false;
                })
                .map((recipe) => {
                    return recipe._id;
                })
            return {
                user: user._id,
                recipes: userFavorites
            }
        })

        const seedingInfo = {
            users: databaseUsers.length,
            recipes: databaseRecipes.length,
            favorites: databaseFavorites.length,
            comments: databaseComments.length
        }

        console.log("Seeding database with: \n", seedingInfo);

        await User.create(databaseUsers);
        await Recipe.insertMany(databaseRecipes);
        await Favorites.insertMany(databaseFavorites);
        await Comment.insertMany(databaseComments);

        console.log("Database seeded successfully!");

    } catch (error) {
        console.error("Error seeding database:", error);
    }
    finally {
        mongoose.connection.close();
        console.log("Database connection closed.");
        return;
    }
}

seedDatabase();