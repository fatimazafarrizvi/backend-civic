const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    issueId: { type: String, unique: true, required: true }, // custom unique ID (optional)
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },   // URL/path of uploaded image
    audio: { type: String },   // URL/path of uploaded audio
    video: { type: String },   // URL/path of uploaded video
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('issue', issueSchema);
//


