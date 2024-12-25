exports.handleServerError = (statu, res, error) => {

    console.log("handleServerError",error)

    res.status(statu).json({
        status: false,
        message: "Internal server error",
        error: error,
    })
}