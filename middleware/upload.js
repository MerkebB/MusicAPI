const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9-]/g, "");
        cb(null, fileName);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3") {
            cb(null, true);
        } else {
            cb(new Error("Only MP3 files allowed"));
        }
    }
});


module.exports = upload;