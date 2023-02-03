const router = require("express").Router();
const controller = require("../../controllers/userControllers");

// GET all users
router.get("/", controller.getUsers);
// GET a single user by id
router.get("/:id", controller.getUser);
// POST to create a new user
router.post("/", controller.createUser);
// PUT to update a user by id
router.put("/:id", controller.updateUser);
// DELETE a user by id 
router.delete("/:id", controller.deleteUser);
// POST a new friend
router.post("/:userId/friends/:friendId", controller.createFriend);
// DELETE a friend
router.delete("/:userId/friends/:friendId", controller.deleteFriend);

module.exports = router;