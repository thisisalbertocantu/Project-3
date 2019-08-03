const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Question = require('../../models/Question');
const User  = require('../../models/User');

router.post('/',[
    auth,
    [check('title', 'Title is required').not().isEmpty()]
], async (req, res) => {
    console.log('post route');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({errors: errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const newQuestion = new Question({
            title: req.body.title,
            answer: req.body.answer,
            tag: req.body.tag,
            user: user.id
        });
        const question = await newQuestion.save();
        res.json(question);
    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;