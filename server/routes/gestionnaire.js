const express = require('express');
const router = express.Router();
const gestionnaireController = require('../controllers/gestionnaireController')
const { requireAuth } = require('../config/auth');





router.get('/view/:id/:idgest', requireAuth, gestionnaireController.viewPlayer);
router.get('/edit/:id/:idgest', requireAuth, gestionnaireController.editPlayer);
router.get('/ajouter_joueur/:id', requireAuth, gestionnaireController.addPlayer);
router.post('/ajouter_joueur/:id', requireAuth, gestionnaireController.postPlayer);
router.put('/edit/:id/:idgest', requireAuth, gestionnaireController.editpost)
router.delete('/supprimer/:id/:idgest', requireAuth, gestionnaireController.supprimerJoueur)
router.get('/gererjoueurs/:id', requireAuth, gestionnaireController.gererJoueur);
router.post('/recherche/:id', requireAuth, gestionnaireController.search);
router.get('/monprofile/:id', gestionnaireController.monprofile);
router.put('/monprofile/:id', gestionnaireController.monprofilepost); // pour changer le mdp 
router.get('/monequipe/:id/', gestionnaireController.monequipe);






module.exports = router;