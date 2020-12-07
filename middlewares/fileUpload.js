const multer = require('multer');
const path = require('path');

exports.fileUpload = (image, audio) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(
        null,
        path.parse(file.originalname).name +
          ' - ' +
          new Date().getFullYear() +
          '-' +
          new Date().getMonth() +
          '-' +
          new Date().getDate() +
          ' - ' +
          new Date().getHours() +
          '-' +
          new Date().getMinutes() +
          '-' +
          new Date().getSeconds() +
          '-' +
          new Date().getMilliseconds() +
          path.extname(file.originalname)
      );
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldName === audio) {
      if (!file.originalname.match(/\.(mp3|MP3|ogg|OGG|flac|FLAC)$/)) {
        req.fileValidationError = {
          message: 'Please select audio files only',
        };
        return cb(new Error('Please select audio files only'), false);
      }
    }
    if (file.fieldName === image) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
        req.fileValidationError = {
          message: 'Please select image files only',
        };
        return cb(new Error('Please select image files only'), false);
      }
    }
    cb(null, true);
  };

  const fileSize = 15 * 1024 * 1024;

  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize,
    },
  }).fields([
    { name: image, maxCount: 1 },
    { name: audio, maxCount: 1 },
  ]);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !err) {
        return res.status(400).send({
          message: 'No files selected',
        });
      }
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file size exceeded (3Mb)',
          });
        }
      }
      return next();
    });
  };
};
