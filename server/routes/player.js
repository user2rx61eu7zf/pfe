const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController')


//player

router.get('/', playerController.homepage);
router.get('/view/:id', playerController.viewPlayer);
router.get('/edit/:id', playerController.editPlayer);
router.get('/add', playerController.addPlayer);
router.post('/add', playerController.postPlayer);
router.put('/edit/:id', playerController.editpost)
router.delete('/edit/:id', playerController.supprimerJoueur)
router.post('/search', playerController.chercherJoueur)






module.exports = router;