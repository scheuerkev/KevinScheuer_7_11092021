//Multer requirement
const multerAvatar = require('multer');

//Multer MIME_TYPES associating array
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

//Multer storage config
const storage = multerAvatar.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/avatars')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Exporting Multer
module.exports = multerAvatar({ storage }).single('image');