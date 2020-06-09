const router = require('express').Router();
const multer = require('multer');
const path = require('path');

var Storage = multer.diskStorage({
    destination: './public/image',
    filename: function (req, file, callback) {
        callback(null, req.headers.filename + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage,
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback);
    }
}).single("image");

checkFileType = (file, callback) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extName) {
        callback(null, true);
    } else {
        callback("Error: image only");
    }
}

router.route('/image').post((req, res) => {
    console.log(req.headers);

    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                msg: err
            })
        } else {
            res.status(200).json({ msg: "image uploaded" })
        }
    });
});

router.route('/image').get((req, res) => {
    res.sendFile(path.join(__dirname, "../public/image/" + req.query.filename));
});

module.exports = router;
