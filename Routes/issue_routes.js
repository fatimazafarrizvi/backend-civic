const express = require('express');
const router = express.Router();
const issue = require("../api/issueapi");
const multer = require('multer');

// Use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Keep the GET route unchanged
router.get("/issue_all", issue.issue_all);

// Update POST route to accept multiple files
router.post("/insert_issue", upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), issue.insert_issue);

// Update PUT route (optional: if you want to update files too)
router.put("/update_issue/:id", upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'audio', maxCount: 1 },
    { name: 'video', maxCount: 1 }
]), issue.update_issue);

module.exports = router;
