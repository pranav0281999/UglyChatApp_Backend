const router = require('express').Router();
const multer = require('multer');
const path = require('path');

var Storage = multer.diskStorage({
    destination: './public/image',
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage
}).single("image");

router.route('/image').post((req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({
                msg: err
            })
        } else {
            console.log(req.file);
            res.status(200).json({ msg: "image uploaded" })
        }
    });
});

module.exports = router;  