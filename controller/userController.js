const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { handleServerError } = require("../utils/handleServerError");
var login = 0;

exports.getUser = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user });
        res.status(200).json({
            status: "Success",
            data: userData,
        })
    } catch (error) {
        handleServerError(404, req, error);
    }
}
exports.alluser = async (req, res) => {
    try {
        const userData = await userModel.find();
        res.status(200).json({
            status: "Success",
            data: userData,
        })

    } catch (error) {
        handleServerError(404, req, error);
    }
}
exports.createUser = async (req, res) => {

    try {
        // check if email already exist or not
        const userEmail = await userModel.findOne({ email: req.body.email });
        if (userEmail) {
            return res.status(409).json({
                status: "Conflict",
                message: "Email already exists!"
            });
        };
        // check for userName
        const userName = await userModel.findOne({ name: req.body.name });
        if (userName) {
            return res.status(409).json({
                status: "Conflict",
                message: "Username already taken!"
            });
        };

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create user with hashed password
        const userData = await userModel.create({ ...req.body, password: hashedPassword });
        const token = await jwt.sign(userData.id, process.env.JWT_KEY);
        res.status(200).json({
            status: "Success",
            data: userData,
            token: token,
        });

    } catch (error) {
        handleServerError(404, req, error);
    }
}
exports.loginUser = async (req, res) => {

    try {

        const user = await userModel.findOne({ email: req.body.email });
        if (login == 0) {
            if (user) {
                const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
                console.log("isPasswordValid", isPasswordValid);
                if (isPasswordValid) {
                    const token = await jwt.sign(user.id, process.env.JWT_KEY);
                    res.status(200).json({
                        status: "user login successfully",
                        data: user,
                        token: token,
                    })
                    login = 1;
                } else {
                    res.status(401).json("Enter correct email and password");
                }
            } else {
                res.status(401).json("Enter correct email and password");
            }
        } else {
            res.status(401).json("User already Login");
        }
    } catch (error) {
        handleServerError(404, req, error);
    }
}
exports.logout = async (req, res) => {
    try {
        login = 0;
        res.status(200).json('Logged out');
    } catch (error) {
        handleServerError(404, req, error);
    }
}
