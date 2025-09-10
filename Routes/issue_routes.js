const express = require('express');
const router = express.Router();
const issue = require("../api/issueapi");
const multer = require('multer');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Keep the GET route unchanged
router.get("/issue_all", issue.issue_all);

// Fix the POST route to call insert_issue and apply multer middleware
router.post("/insert_issue", upload.single('image'), issue.insert_issue);

module.exports = router;
