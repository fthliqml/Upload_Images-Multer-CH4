const multer = require("multer");

const multerFiltering = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Image format is not valid..."), false);
    }
};

const upload = multer({
    fileFilter: multerFiltering,
});

// kalo export gapake kurung kurawal, import juga gapake kurung kurawal
module.exports = upload;
