const multer = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        console.log("destination your file", file)
        cb(null, './temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        console.log("your file", file)
        return cb(null, file.originalname + '-' + uniqueSuffix)
    }
})
const upload = multer({ storage: storage })
module.exports = upload;

// const storage = multer.memoryStorage();

// const upload = multer({ storage: storage });

// module.exports = upload;
