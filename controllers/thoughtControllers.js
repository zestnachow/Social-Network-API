const { ObjectId } = require("mongoose").Types;
const reactionSchema = require("../models/Reaction");
const { Thought, User, Reaction } = require("../models");

module.exports = {
    // GET all thoughts
    getThoughts: async (req, res) => {
        try {
            const allThoughts = await Thought.find({});
            res.status(200).json(allThoughts);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // GET a single thought via its id
    getThought: async (req, res) => {
        try {
            const singleThought = await Thought.find({
                _id: ObjectId(req.params.id),
            });
            res.status(200).json(singleThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST a new thought
    createThought: async (req, res) => {
        try {
            const createdThought = await Thought.create({
                thoughtText: req.body.thoughtText,
                username: req.body.username,
            });
            const postedThought = await User.findOneAndUpdate(
                { _id: ObjectId(req.params.id) },
                { $push: { thoughts: createdThought._id } },
                { new: true }
            );
            res.status(200).json(createdThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // UPDATE a thought
    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: ObjectId(req.params.id) },
                {thoughtText: req.body.thoughtText },
                { new: true }
            );
            res.status(200).json(updatedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a thought
    deleteThought: async (req, res) => {
        try {
            const deletedThought = await Thought.findOneAndDelete(
                { _id: req.params.id },
            );
            res.status(200).json(deletedThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // POST new reaction
    createReaction: async (req, res) => {
        try {
            const createdReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true } 
            );
            res.status(200).json(createdReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    // DELETE a reaction
    deleteReaction: async (req, res) => {
        try {
            const deletedReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            res.status(200).json(deletedReaction);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
