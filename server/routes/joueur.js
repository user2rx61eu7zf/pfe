const express = require('express');
const router = express.Router();
const joueurController = require('../controllers/joueurController')
const { requireAuth } = require('../config/auth');
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../images'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        return cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage })




router.get('/profileJoueur/:id', joueurController.profile);
router.get('/mes_entrainement/:id', joueurController.entrainement);
router.get('/mes_matchs/:id', joueurController.matchs);
router.get('/mes_stats/:id', joueurController.stats);
router.put('/monprofile_joueur/:id', upload.single('photo_joueur'), joueurController.profilepost); 

module.exports = router;