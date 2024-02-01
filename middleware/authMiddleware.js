const jwt = require('jsonwebtoken');


exports.authenticateUser = async (req, res, next) => {

    const token = req.header('Authorization');
    // Extract the JWT token from the cookie
    const token = req.cookies.jwt;

    try {
        if (token) {
            jwt.verify(token, 'nk', function (err, decoded) {
                if (err) {
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Unauthorized: Invalid token',
                        error:err
                    });
                }
                req.user = decoded;
                console.log(req.user)
                next();
                
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Unauthorized: Missing token'
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 'failed',
            message: 'Unauthorized: Invalid token'
        });
    }

}