const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')


router.get('/admin', adminController.homepageAdmin);  // renvoie la page d'acceuil de admin : la definition de la requete get est dans le fichier adminContoller



module.exports = router;
