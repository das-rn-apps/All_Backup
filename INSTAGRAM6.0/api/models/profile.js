const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String },
    email: { type: String, unique: true },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;