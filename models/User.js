const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userAddress:{
        type: String,
        unique: true,
        required: true,
    },
    userhex: {
        type: String,
    },
    check: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('user', UserSchema);