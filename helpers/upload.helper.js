const multerS3 = require('multer-s3');
const multer = require('multer'); 
const path = require('path'); 

const s3 = require('../utils/s3.util');

function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}

const upload = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: 'uploads-test-123',
        
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {   
            const fileName = `${Date.now()}_${Math.round(Math.random() * 1E9)}`;
            //sanitizeFile(file, cb)
            cb(null, `uploads/all/${fileName}${path.extname(file.originalname)}`);
        }
    }),
    limits: { 
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
}

);

module.exports = upload;