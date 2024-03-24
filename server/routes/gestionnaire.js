const express = require('express');
const router = express.Router();
const gestionnaireController = require('../controllers/gestionnaireController')
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




router.get('/view/:idgest/:id', requireAuth, gestionnaireController.viewPlayer);
router.get('/voir_entraineur/:id', requireAuth, gestionnaireController.voirEntraineur);
router.get('/voir_stade/:id', requireAuth, gestionnaireController.voirStade);
router.get('/edit/:id/:idgest', requireAuth, gestionnaireController.editPlayer);
router.get('/modifier_entraineur/:id/', requireAuth, gestionnaireController.editEntraineur);
router.get('/modifier_stade/:id/', requireAuth, gestionnaireController.editStade);
router.get('/ajouter_joueur/:id', requireAuth, gestionnaireController.addPlayer);
router.post('/ajouter_joueur/:id', upload.single('photojoueur'), requireAuth, gestionnaireController.postPlayer);
router.put('/edit/:idgest/:idgest', requireAuth, gestionnaireController.editpost)
router.put('/modifier_entraineur/:id', requireAuth, gestionnaireController.editpostEntraineur)
router.put('/modifier_stade/:id', requireAuth, gestionnaireController.editpostStade)
router.delete('/supprimer/:id/:idgest', requireAuth, gestionnaireController.supprimerJoueur)
router.get('/gererjoueurs/:id', requireAuth, gestionnaireController.gererJoueur);
router.post('/recherche/:id', requireAuth, gestionnaireController.search);
router.get('/monprofile/:id', requireAuth, gestionnaireController.monprofile);
router.put('/monprofile/:id', upload.single('photo_gest'), gestionnaireController.monprofilepost); // pour changer le mdp 
router.get('/monequipe/:id/', requireAuth, gestionnaireController.monequipe);
router.get('/stade/:id/', requireAuth, gestionnaireController.monstade);
router.get('/ajouter_entraineur/:id/', requireAuth, gestionnaireController.addEntraineur);
router.post('/ajouter_entraineur/:id', upload.single('photo'), requireAuth, gestionnaireController.postEntraineur); // ajouter a la bdd
router.post('/ajouter_stade/:id', requireAuth, gestionnaireController.postStade);
router.get('/gerer_match/:id', requireAuth, gestionnaireController.gerermatch);





module.exports = router;