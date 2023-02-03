const mongoose = require("mongoose");
const Schema = mongoose.Types;
let ObjectId = Schema.ObjectId;

const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: new Date().toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        }),
    },
});

module.exports = reactionSchema;

