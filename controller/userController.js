const userModel = require("../model/userModel");
const bcrypt = require('bcrypt');
const { handleServerError } = require("../utils/handleServerError");
const { generateToken } = require("../middleware/authMiddleware");
const jwt = require('jsonwebtoken');
var login = 0;
const HttpStatus = {
    OK: 200,
    CONFLICT: 409,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
};

exports.getUser = async (req, res) => {
    try {
        const userData = await userModel.findOne({ _id: req.user });
        res.status(HttpStatus.OK).json({
            status: "Success",
            data: userData,
        })
    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}
exports.alluser = async (req, res) => {
    try {
        const userData = await userModel.find();
        res.status(HttpStatus.OK).json({
            status: "Success",
            data: userData,
        })

    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}
exports.createUser = async (req, res) => {

    try {
        // check if email already exist or not
        const userEmail = await userModel.findOne({ email: req.body.email });
        if (userEmail) {
            return res.status(HttpStatus.CONFLICT).json({
                status: "Conflict",
                message: "Email already exists!"
            });
        };
        // check for userName
        const userName = await userModel.findOne({ name: req.body.name });
        if (userName) {
            return res.status(HttpStatus.CONFLICT).json({
                status: "Conflict",
                message: "Username already taken!"
            });
        };

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Create user with hashed password
        const userData = await userModel.create({ ...req.body, password: hashedPassword });
        const token = await  generateToken(userData.id);
        res.status(HttpStatus.OK).json({
            status: "Success",
            data: userData,
            token: token,
        });

    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}
exports.loginUser = async (req, res) => {

    try {
        if (login == 0) {
            const user = await userModel.findOne({ email: req.body.email });
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!user || !isPasswordValid) {
                res.status(HttpStatus.UNAUTHORIZED).json({ status: "Unauthorized", message: "Invalid email or password" });
            }

            const token = await generateToken(userData.id);
            res.status(HttpStatus.OK).json({
                status: "user login successfully",
                data: user,
                token: token,
            })

            if (isPasswordValid) {
                login = 1;
            }
        } else {
            res.status(HttpStatus.UNAUTHORIZED).json("User already Login");
        }
    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, res, error);
    }
}
exports.logout = async (req, res) => {
    try {
        login = 0;
        res.status(HttpStatus.OK).json('Logged out');
    } catch (error) {
        handleServerError(HttpStatus.NOT_FOUND, req, error);
    }
}
