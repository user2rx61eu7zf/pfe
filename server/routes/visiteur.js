const express = require('express');
const router = express.Router();
const visiteurController = require('../controllers/visiteurController')
const { requireAuth } = require('../config/auth');





router.get('/', visiteurController.page_accueil); 
router.get('/clubs', visiteurController.equipes); 
router.get('/club/:id', visiteurController.club); 
router.get('/classement', visiteurController.classement); 
router.get('/classement_u19', visiteurController.classementu19); 
router.get('/classement_u17', visiteurController.classementu17);
router.get('/classement_u15', visiteurController.classementu15);
router.get('/calendrier', visiteurController.calendrier); 
router.get('/match', visiteurController.match); 
router.get('/actualite', visiteurController.actualite); 
router.get('/article', visiteurController.article); 
router.get('/joueur/:id', visiteurController.joueur); 
router.get('/club_junior_u19', visiteurController.u19)
router.get('/club_junior_u17', visiteurController.u17)
router.get('/club_junior_u15', visiteurController.u15)




module.exports = router;   
