const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const Question = require('../../models/Question');
const User  = require('../../models/User');

// @route   POST api/faqs
// @desc    Create a faq
// @access  Private
router.post('/',[
    auth,
    [check('title', 'Title is required').not().isEmpty()]
], async (req, res) => {
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

// @route   GET api/faqs
// @desc    Get all faqs
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const faqs = await Question.find().sort({date: -1});
        res.json(faqs);
    }catch (e) {
        console.error(e.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route   GET api/faqs/:id
// @desc    Get faq by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const faq = await Question.findById(req.params.id);
        if (!faq){
            return res.status(404).json({msg: 'F.A.Q. not found'});
        }
        res.json(faq);
    }catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId'){ // Checks if the id provided is a valid one
            return res.status(404).json({msg: 'F.A.Q. not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route   DELETE api/faqs/id
// @desc    Delete a faq
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const faq = await Question.findById(req.params.id);
        if (!faq){ // Checks if the id provided is a valid one
            return res.status(404).json({msg: 'F.A.Q. not found'});
        }
        // Check user
        if (faq.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        await faq.remove();
        res.json({msg: 'F.A.Q. removed'});
    }catch (e) {
        console.error(e.message);
        if (e.kind === 'ObjectId'){ // Checks if the id provided is a valid one
            return res.status(404).json({msg: 'F.A.Q. not found'});
        }
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route   PUT api/faqs/like/:id
// @desc    Like a faq
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const faq = await Question.findById(req.params.id);
        // Check if the faq has alredy been liked by user
        if (faq.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'F.A.Q. alredy liked'});
        }
        faq.likes.unshift({user: req.user.id});
        await faq.save();
        res.json(faq.likes);
    }catch (e) {
        console.error(e.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route   PUT api/faqs/unlike/:id
// @desc    Unlike in faq
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const faq = await Question.findById(req.params.id);
        // Check if the post has alredy been liked by user
        if (faq.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({msg: 'F.A.Q. has not yet been liked'});
        }
        // Get remove index
        const removeIndex = faq.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);
        faq.likes.splice(removeIndex, 1);
        await faq.save();
        res.json(faq.likes);
    }catch (e) {
        console.error(e.message);
        res.status(500).json({msg: 'Server Error'});
    }
});

// @route   POST api/faqs/comment/:id
// @desc    Comment on a faq
// @access  Private
router.post('/comment/:id', [
    auth,
    [check('text', 'Text is required').not().isEmpty()]
], async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({errors: errors.array()});
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const faq = await Question.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };
        faq.comments.unshift(newComment);
        await faq.save();
        res.json(faq.comments);
    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/faqs/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) =>{
    try {
        const faq = await Question.findById(req.params.id);
        // Pull out comment
        const comment = faq.comments.find(
            comment => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment){
            return res.status(404).json({msg: 'Comment does not exist'});
        }
        // Check user
        if (comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
        // Get remove index
        const removeIndex = faq.comments
            .map(comment => comment.user.toString())
            .indexOf(req.user.id);
        faq.comments.splice(removeIndex, 1);
        await faq.save();
        res.json(faq.comments);
    }catch (e) {
        console.error(e.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;