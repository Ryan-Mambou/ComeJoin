const express = require('express');
const router = express.Router();
const questionCtrl = require('../controllers/question');
const auth = require('../middlewares/auth')

router.post('/', auth, questionCtrl.createQuestion)

module.exports = router;