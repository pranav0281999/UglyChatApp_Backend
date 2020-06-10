const router = require('express').Router();
const multer = require('multer');
const path = require('path');

var storageImage = multer.diskStorage({
    destination: './public/image',
    filename: function (req, file, callback) {
        callback(null, req.headers.filename + path.extname(file.originalname));
    }
});

var uploadImage = multer({
    storage: storageImage,
    fileFilter: (req, file, callback) => {
        checkImageFileType(file, callback);
    }
}).single("image");

checkImageFileType = (file, callback) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extName) {
        callback(null, true);
    } else {
        callback("Error: image only");
    }
}

router.route('/image').post((req, res) => {
    uploadImage(req, res, (err) => {
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

var storageVideo = multer.diskStorage({
    destination: './public/video',
    filename: function (req, file, callback) {
        callback(null, req.headers.filename + path.extname(file.originalname));
    }
});

var uploadVideo = multer({
    storage: storageVideo,
    fileFilter: (req, file, callback) => {
        checkVideoFileType(file, callback);
    }
}).single("video");

checkVideoFileType = (file, callback) => {
    const fileTypes = /mov|mpeg4|mp4|avi|wmv|flv|mpegps|webm/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extName) {
        callback(null, true);
    } else {
        callback("Error: video only");
    }
}

router.route('/video').post((req, res) => {
    uploadVideo(req, res, (err) => {
        if (err) {
            res.status(400).json({
                msg: err
            })
        } else {
            res.status(200).json({ msg: "video uploaded" })
        }
    });
});

router.route('/video').get((req, res) => {
    res.sendFile(path.join(__dirname, "../public/video/" + req.query.filename));
});

var storageAudio = multer.diskStorage({
    destination: './public/audio',
    filename: function (req, file, callback) {
        callback(null, req.headers.filename + path.extname(file.originalname));
    }
});

var uploadAudio = multer({
    storage: storageAudio,
    fileFilter: (req, file, callback) => {
        checkAudioFileType(file, callback);
    }
}).single("audio");

checkAudioFileType = (file, callback) => {
    const fileTypes = /mp3|m4a|flac|mp4|wav|wma|aac/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    if (extName) {
        callback(null, true);
    } else {
        callback("Error: audio only");
    }
}

router.route('/audio').post((req, res) => {
    uploadAudio(req, res, (err) => {
        if (err) {
            res.status(400).json({
                msg: err
            })
        } else {
            res.status(200).json({ msg: "audio uploaded" })
        }
    });
});

router.route('/audio').get((req, res) => {
    res.sendFile(path.join(__dirname, "../public/audio/" + req.query.filename));
});

module.exports = router;
