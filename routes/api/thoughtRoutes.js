const router = require("express").Router();
const controller = require("../../controllers/thoughtControllers");

// GET all thoughts
router.get("/", controller.getThoughts);
// GET single thought by id
router.get("/:id", controller.getThought);
// POST a new thought
router.post("/", controller.createThought);
// PUT to update a thought via id
router.put("/:id", controller.updateThought);
// DELETE a thought by id
router.delete("/:id", controller.deleteThought);
// POST a new reaction
router.post("/:thoughtId/reactions", controller.createReaction);
// DELETE a reaction
router.delete("/:thoughtId/reactions/:reactionId", controller.deleteReaction);

module.exports = router;