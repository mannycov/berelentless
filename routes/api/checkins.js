const express = require('express');
const router = express.Router();

// @route GET api/checkins
// @desc Get all Check Ins
// @access Public
router.get('/test', (req, res) => res.json({msg: "Check INs"}));

module.exports = router;