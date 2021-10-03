//This file set multer behaviour for post images

//Multer requirement
const multerPost = require('multer');

//Multer MIME_TYPES associating array
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

//Multer storage config
const storage = multerPost.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

//Exporting Multer
module.exports = multerPost({storage}).single('image');