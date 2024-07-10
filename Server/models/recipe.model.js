const mongoose = require("mongoose");
const { Types } = mongoose;
require('dotenv').config();

const dbRecipe = process.env.COLLECTIONRECIPE;

const recipe = mongoose.Schema(
    {
        _id: { type: Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        name: { type: String, required: true },
        steps: { type: String, required: true },
        ingredients: [
            {
                _id: { type: Types.ObjectId, default: new mongoose.Types.ObjectId() },
                name: { type: String, required: true },
                amount: { type: Number, required: true },
                unit: { type: String, required: true }
            }
        ],
        tags: [
            {
                name: { type: String, required: true }
            }
        ],
        pricecategory: { type: Number, required: false },
        preparationtime: { type: Number, required: true },
        creator: {
            _id: { type: Types.ObjectId, default: new mongoose.Types.ObjectId() },
            name: { type: String, required: true }
        },
        creationdate: { type: String, required: true },
        picture: { type: String, required: true }
    }
);

const Recipe = mongoose.model(dbRecipe, recipe);

module.exports = Recipe;