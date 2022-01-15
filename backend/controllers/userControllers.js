const asyncHandler = require("express-async-handler");
const User = require('../models/userModel.js');
const generateToken = require("../utils/generateToken.js");


const registerUser = async (req, res) =>
{
    const { name, email, password, pic } = req.body;
    const userExists = await User.findOne({ email });
    
    if (userExists)
    {
        res.status(400);
        throw new Error("User already Exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (user)
    {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else
    {
        res.status(400)
        throw new Error("Error occured!");
    }
}

const authUser = async (req, res) =>
{
    const { email, password } = req.body;
    
    const user = await  User.findOne({ email });

    if (user && (await user.matchPassword(password)))
    {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id)
        })
    } else
    {
        res.status(400);
        throw new Error("invalid email or password");
    }
   
}


module.exports = { registerUser, authUser };