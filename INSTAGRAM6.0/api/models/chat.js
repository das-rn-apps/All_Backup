const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    from_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    to_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;