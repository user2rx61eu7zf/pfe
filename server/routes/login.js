const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')
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




router.get('/login', loginController.loginPage);
router.get('/logout', loginController.logout);
router.get("/s'inscrire", loginController.sinscrire); 
router.post('/compte', loginController.comptePage);
router.post('/addaccount', upload.single('photovisiteur'),loginController.creer);
router.get('/compteGestionnaire/:idgest', requireAuth, loginController.comptegestionnaire);
router.get('/compteAdmin/:id', loginController.compteadmin);
router.get('/compteJoueur/:id', loginController.compteJoueur);







module.exports = router;