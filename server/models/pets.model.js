
// Connect to the database
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Create a schema
const petSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Please add a Pet Name.'], // First layer of validation
        minLength: [3, 'Pet Name must contain 2 characters.'], // Second layer of validation
        unique: [true, 'Pet Name Must Be Unique'] // Third layer of validation
    },
    description: {
        type: String,
        required: [true, 'Please add Pet Description.'], // First layer of validation
        minLength: [3, "Description must contain min of 3 characters."], // Second layer of validation
    },
    type: {
        type: String,
        required: [true, 'Please add Pet Type.'], // First layer of validation
        minLength: [3, "Type must contain min of 3 characters."], // Second layer of validation
    },
    skill1: {
        type: String,
        minLength: [3, "Skill must contain min of 3 characters."],
        required: false 
    },
    skill2: {
        type: String,
        minLength: [3, "Skill must contain min of 3 characters."],
        required: false  // Second layer
    },
    skill3: {
        type: String,
        minLength: [3, "Skill must contain min of 3 characters."],
        required: false  // Second layer
    },
    likes: {
        type: Number,
        default: 0
    }
});

petSchema.plugin(uniqueValidator);

// Create and export a model
module.exports = mongoose.model('exam2', petSchema);