const { nanoid } = require('nanoid');
const Issue = require('../Models/issue');  
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config();

// Get all issues
const issue_all = async (req, res) => {
    try {
        const issue = await Issue.find();
        res.json(issue);
    } catch (error) {
        console.log("Fetch error", error);
        res.status(500).json({
            message: error.toString()
        });
    }
};

// Insert a new issue
const insert_issue = async (req, res) => {
    try {
        let imagePath = null, audioPath = null, videoPath = null;

        // Helper function for images and videos
        const uploadBuffer = (buffer, type) => {
            return new Promise((resolve, reject) => {
                const options = { resource_type: type };

                if (type === "image") {
                    options.quality = "auto:good"; // reduce image quality
                    options.format = "jpg";
                } else if (type === "video") {
                    options.quality = "auto:good"; // reduce video quality
                    options.format = "mp4";
                    options.height = 480;       // reduce resolution
                    options.crop = "scale";
                }

                const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                });

                stream.end(buffer);
            });
        };

        // Helper function for audio (reduce bitrate)
        const uploadAudioBuffer = (buffer) => {
            return new Promise((resolve, reject) => {
                const options = {
                    resource_type: "video", // audio treated as video
                    format: "mp3",          // convert to mp3
                    audio_codec: "mp3",     // ensure audio codec is mp3
                    bit_rate: "128k"        // reduce bitrate for smaller size
                };

                const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                });

                stream.end(buffer);
            });
        };

        // Upload image
        if (req.files?.image) {
            imagePath = await uploadBuffer(req.files.image[0].buffer, "image");
        }

        // Upload audio
        if (req.files?.audio) {
            audioPath = await uploadAudioBuffer(req.files.audio[0].buffer);
        }

        // Upload video
        if (req.files?.video) {
            videoPath = await uploadBuffer(req.files.video[0].buffer, "video");
        }

        // Save issue to database
        const issue = new Issue({
            issueId: "ISSUE-" + nanoid(6),
            title: req.body.title,
            category: req.body.category,
            location: req.body.location,
            description: req.body.description,
            image: imagePath,
            audio: audioPath,
            video: videoPath
        });

        const savedissue = await issue.save();
        res.send(savedissue);

    } catch (error) {
        console.error("Insert issue error:", error);
        res.status(400).send({ error: error.message });
    }
};


// Update only status and description
const update_issue = async (req, res) => {
    const issueId = req.params.id ? req.params.id.trim() : null;

    const updatedData = {
        status: req.body.status,
        description: req.body.description,
    };

    try {
        const updateResult = await Issue.updateOne(
            { _id: issueId },
            { $set: updatedData }
        );

        if (updateResult.modifiedCount != 0) {
            res.send({ update: 'success' });
        } else {
            res.send({ update: 'Record Not Found or No Changes Made' });
        }
    } catch (error) {
        res.status(400).send(error);
    }
};

module.exports = {
    issue_all,
    insert_issue,
    update_issue
};
