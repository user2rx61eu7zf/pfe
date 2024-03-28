const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/admin", adminController.homepageAdmin); // renvoie la page d'acceuil de admin : la definition de la requete get est dans le fichier adminContoller
router.get("/detailGestio/:id", adminController.viewGestionnaire);
router.get("/edit/:id", adminController.editGestionnaire);
router.get("/ajouter_gestionnaire", adminController.addGestionnaire);
router.post("/ajouter_gestionnaire", adminController.postGestionnaire);
//router.put("/edit/:id", adminController.editpost);
router.delete("/supprimer/:id", adminController.supprimerGestionnaire);
router.get("/gererGestionnaire", adminController.gererGestionnaire);



module.exports = router;