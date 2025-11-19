const { Router } = require("express");
const { getUsers, createUser, loginUser, logoutUser } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

const router = Router();

//get users
router.get("/",auth,  getUsers);

// create user admin
router.post("/", createUser)

//create users client
router.post("/register", createUser);
// login user
router.post("/login", loginUser);
//logout user
router.get("/logout", logoutUser)


module.exports = router;