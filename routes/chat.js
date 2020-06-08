const router = require('express').Router();

router.route('/').get((req, res) => {
    res.status(200).json({ "hello": "world" })
});

module.exports = router;