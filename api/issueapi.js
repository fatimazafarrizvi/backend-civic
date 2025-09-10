const Issue = require('../Models/issue');  // Make sure the model file name matches

// Get all issues
const issue_all = async (req, res) => {
    try {
        const issue = await Issue.find();
        res.json(issue);
    } catch (error) {
        console.log("Fetch error");
        res.json({
            message: error
        });
    }
};

// Insert a new issue
const insert_issue = async (req, res) => {
    const imagePath = req.file ? req.file.path : null;

    const issue = new Issue({
        title: req.body.title,
        category: req.body.category,
        location: req.body.location,
        description: req.body.description,
        image: imagePath
    });

    try {
        const savedissue = await issue.save();
        res.send(savedissue);
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    issue_all,
    insert_issue
};
