const { User } = require("../models");

module.exports = {
    // GET all users
    getUsers: async (req, res) => {
        try {
            const allUsers = await User.find({});
            res.status(200).json(allUsers);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // GET a single user via id
    getUser: async (req, res) => {
        try {
            const singleUser = await User.find({ _id: req.params.id }).populate({ path: thoughts}).populate({ path: friends });
            res.status(200).json(singleUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST a new user
    createUser: async (req, res) => {
        try {
            const createdUser = await User.create({
                username: req.body.username,
                email: req.body.email,
            });
            createdUser.save();
            res.status(200).json(createdUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // UPDATE a user
    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.id },
                req.body,
                { new: true, runValidators: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a user
    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete(
                { _id: req.params.id }
            );
            res.status(200).json (deletedUser);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST a new friend
    createFriend: async (req, res) => {
        try {
            const createdFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { new: true, runValidators: true }
            );
            res.status(200).json(createdFriend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a friend
    deleteFriend: async (req, res) => {
        try {
            const deletedFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            res.status(200).json(deletedFriend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}