const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log("file",file)
        cb(null, file.originalname +'-'+ uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
module.exports = upload;