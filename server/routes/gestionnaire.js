const express = require('express');
const router = express.Router();
const gestionnaireController = require('../controllers/gestionnaireController')




router.get('/gestionnaire', gestionnaireController.homepageGestionnaire);
router.get('/view/:id', gestionnaireController.viewPlayer);
router.get('/edit/:id', gestionnaireController.editPlayer);
router.get('/ajouter_joueur', gestionnaireController.addPlayer);
router.post('/ajouter_joueur', gestionnaireController.postPlayer);
router.put('/edit/:id', gestionnaireController.editpost)
router.delete('/supprimer/:id', gestionnaireController.supprimerJoueur)
router.get('/gererjoueurs', gestionnaireController.gererJoueur);






module.exports = router;