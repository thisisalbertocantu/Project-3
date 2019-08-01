const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FaqSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});