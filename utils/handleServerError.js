exports.handleServerError = (status, res, error) => {
    res.status(status).json({
        status: false,
        message: "Internal server error",
        error: error,
    })
    console.log("error : ",error)
}