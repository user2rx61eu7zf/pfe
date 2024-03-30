const express = require('express');
const router = express.Router();
const visiteurController = require('../controllers/visiteurController')
const { requireAuth } = require('../config/auth');





router.get('/', visiteurController.page_accueil); 
router.get('/clubs', visiteurController.equipes); 
router.get('/club/:id', visiteurController.club); 
router.get('/classement', visiteurController.classement); 
router.get('/calendrier', visiteurController.calendrier); 
router.get('/match', visiteurController.match); 
router.get('/actualite', visiteurController.actualite); 
router.get('/article', visiteurController.article); 
router.get('/joueur/:id', visiteurController.joueur); 




module.exports = router;   
