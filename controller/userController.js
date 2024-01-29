const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken');
var login = 0;

exports.getUser = async (req,res) =>{
    try {
        const userData = await userModel.find({_id:req.user});
        res.status(200).json({
            status: "Success",
            data: userData,
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "user Not exist",
            error
        })
    }
}
exports.createUser = async (req, res) => {

    try {
        const userData = await userModel.create(req.body);
        const token = await jwt.sign(userData.id,process.env.JWT_KEY);
        res.status(200).json({
            status: "Success",
            data: userData,
            token:token,
        })

    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "error in getUser",
            error
        })
    }
}

exports.loginUser = async (req, res) => {

    try {

        const user = await userModel.find({ email: req.body.email })
        if (login == 0) {
            if (user) {
                if (user[0].password === req.body.password) {
                    // const token = generateToken({ user })
                    const token = await jwt.sign(user[0].id,process.env.JWT_KEY)
                    res.status(200).json({
                        status: "user login successfully",
                        token:token,
                    })
                    login = 1;
                } else {
                    res.status(203).json("Enter correct email and password")
                }
            } else {
                res.status(203).json("Enter correct email and password")
            }
        } else {
            res.status(200).json("User already Login")
        }
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "error in loginUser",
            error: error
        })
    }
}

exports.logout = async (req, res) => {
    try {
        login = 0
        res.status(200).json('Logged out')
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: "error in logout",
            error
        })
    }
}
