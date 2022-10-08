const db = require("../models");
const User = db.users;
const config = require("../config/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


exports.register = async(req,res) => {
    const { firstname,lastname,email,password,mobile,role,status } = req.body;
    try{
        // Validate user input
        if (!(email && password && firstname && lastname && mobile && role && status )) {
            res.status(400).send("All input is required");
        };

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).send("User Already Exist. Please Login");
        };

        //Encrypt user password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create user in our database
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
            mobile,
            role,
            status
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            config.secret,
            {
                expiresIn: "30d",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(200).json({msg:"Account successfully created",user});
    }catch(err){
        res.status(500).json(err);
    }
};

exports.login = async(req,res) => {
    const { email,password } = req.body;
    try{
        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        };
        
        // Validate if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user._id, email },
              config.secret,
              {
                expiresIn: "30d",
              }
            );
      
            // save user token
            user.token = token;
      
            // user
            res.status(200).json({message: "Logged in successfully",user});
        }
        res.status(400).send("Invalid Credentials");
    }catch(err){
        res.status(500).json(err);
    }
};

exports.getallusers = async(req,res) => {
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
};

exports.getUserDetails = async(req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
};

exports.searchbyRole = async(req,res) => {
    try{
        const findrole = req.params.role;
        const obj = await User.find({role: { $regex:'.*'+findrole+'.*'}})
        res.status(200).json(obj);
    }catch(err){
        res.status(500).json(err);
    }
}