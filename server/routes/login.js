const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')
const { requireAuth } = require('../config/auth');






router.get('/login', loginController.loginPage);
router.get("/s'inscrire", loginController.sinscrire); 
router.post('/compte', loginController.comptePage);
router.post('/addaccount', loginController.creer);
router.get('/compteGestionnaire/:idgest', requireAuth, loginController.comptegestionnaire);
router.get('/compteAdmin/:id', loginController.compteadmin);







module.exports = router;