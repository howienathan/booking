const User = require("../models/usersModels");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const getUsers = async(req, res, next) => {
   try {
    const users = await User.find();
    if(!users) {
        res.status(400);
        throw new Error ("User Not Found")
    }

    return res.status(200).json(users)

   } catch(error) {
    next(error);
   }
}

const createUser = async(req, res, next) => {
    try{
        const { password, ...rest } = req.body;

        //generate salt
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            ...rest,
            password: hashedPassword
        })
        if(!user) {
            res.status(400);
            throw new Error ("cant create user")
        }

        //hash pasword before save to db
        const { password: userPassword, ...otheerDetalis } = user._doc;

        return res.status(201).json(user);
    } catch(error) {
        next(error);
    }
};

const loginUser = async(req, res, next) => {
    try {

       
        const { email, password } = req.body;   

        const user = await User.findOne({email});

        if(!user){
            res.status(400);
            throw new Error ("cant login into ur acc")
        }


        const isCorrect = await bcrypt.compare(password, user.password)

        if(!isCorrect){
            res.status(400);
            throw new Error ("ur pass is wrong")
        }

        // generate token
        // set cookie
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.cookie("jwt", token);

        const { password: userPassword,  ...rest } = user._doc;
        console.log(token);
      return res.status(200).json({
         message: "Login success",
         token,
         user: rest
        });

    } catch(error){
        next(error)
    }
};
const logoutUser = async (req, res, next) => {
  res.cookie("jwt", " ", { expiresIn: "-1" });
  return res.json({ message: "you have been logged out" });
};

module.exports = {
    getUsers,
    createUser,
    loginUser,
    logoutUser,
};