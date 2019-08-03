const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String
    },
    answer:{
        type: String
    },
    tag:{
        type: String
    },
});

module.exports = Profile = mongoose.model('question', QuestionSchema);