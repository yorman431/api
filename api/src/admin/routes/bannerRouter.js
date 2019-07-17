const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, '../src/assets/images/banner/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname.replace(/\s/g, ''));
  }
});

const upload = multer({storage: storage});

const bannerRouter = express.Router();

function router (dbConfig) {
  const bannerController = require('../controllers/bannerController')(dbConfig);

  bannerRouter.route('/')
    .post(upload.single('bannerImage'), bannerController.insertNewBanner)
    .get(bannerController.getBanners);

  bannerRouter.route('/:id')
    .get(bannerController.getOne)
    .patch(upload.single('bannerImage'), bannerController.updateBanner)
    .delete(bannerController.deleteBanner);

  return bannerRouter;
}

module.exports = router;
