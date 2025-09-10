const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String }  // This will store the image file path
});

module.exports = mongoose.model('issue', issueSchema);
