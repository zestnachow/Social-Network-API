const mongoose = require("mongoose");
const Schema = mongoose.Types;

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true, 
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Please enter a real email address!",
            },
            required: [true, "Email is required!"],
        },
        thoughts: [
            {
                type: Schema.ObjectId,
                ref: "Thought",
            },
        ],
        friends: [
            {
                type: Schema.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;