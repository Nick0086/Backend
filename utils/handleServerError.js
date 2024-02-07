exports.handleServerError = (statu, res, error) => {
    res.status(statu).json({
        status: false,
        message: "Internal server error",
        error: error,
    })
    console.log("error : ",error)
}