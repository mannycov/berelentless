const express = require('express');
const router = express.Router();

// @route GET api/profile
// @desc Get User Profile
// @access Private
router.get('/test', (req, res) => res.json({msg: "profile"}));

module.exports = router;