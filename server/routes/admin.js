const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAuth } = require("../config/auth");

router.get("/admin", requireAuth, adminController.homepageAdmin); // renvoie la page d'acceuil de admin : la definition de la requete get est dans le fichier adminContoller
router.get("/detailGestio/:id", requireAuth, adminController.viewGestionnaire);
router.get("/edit/:id", requireAuth, adminController.editGestionnaire);
router.get(
  "/ajouter_gestionnaire",
  requireAuth,
  adminController.addGestionnaire
);
router.post(
  "/ajouter_gestionnaire",
  requireAuth,
  adminController.postGestionnaire
);
//router.put("/edit/:id", adminController.editpost);
router.delete(
  "/supprimer/:id",
  requireAuth,
  adminController.supprimerGestionnaire
);
router.put("/edit/:id", requireAuth, adminController.editpostGestio);
router.get(
  "/gererGestionnaire",
  requireAuth,
  adminController.gererGestionnaire
);
//pour les arbitres
router.get("/gererArbitres", requireAuth, adminController.gererArbitres);
router.get("/detailsArbitres/:id", requireAuth, adminController.viewArbitres);
router.get("/editArbitre/:id", requireAuth, adminController.editArbitre);
router.get("/ajouter_arbitres", requireAuth, adminController.addArbitres);
router.post("/ajouter_arbitres", requireAuth, adminController.postArbitres);
router.put("/editArbitres/:id", requireAuth, adminController.editpostArbitres);
router.delete(
  "/supprimerArbitres/:id",
  requireAuth,
  adminController.supprimerArbitres
);
//pour les stades
router.get("/gererStades", requireAuth, adminController.gererStades);
router.get("/detailsStades/:id", requireAuth, adminController.viewStades);
router.get("/editStades/:id", requireAuth, adminController.editStades);
router.get("/ajouter_Stades", requireAuth, adminController.addStades);
router.post("/ajouter_Stades", requireAuth, adminController.postStades);
router.put("/editStades/:id", requireAuth, adminController.editpostStades);
router.delete(
  "/supprimerStades/:id",
  requireAuth,
  adminController.supprimerStades
);
//----------------------------------------------------------------------------------------------------------------//
//pour les articles
router.get("/gererArticles", requireAuth, adminController.gererArticles);
router.get("/detailsArticles/:id", requireAuth, adminController.viewArticles);
router.get("/editArticles/:id", requireAuth, adminController.editArticles);
router.get("/ajouter_Articles", requireAuth, adminController.addArticles);
router.post("/ajouter_Articles", requireAuth, adminController.postArticles);
router.put("/editArticles/:id", requireAuth, adminController.editpostArticles);
router.delete(
  "/supprimerArticles/:id",
  requireAuth,
  adminController.supprimerArticles
);

//pour les matches
router.get("/gererMatches", requireAuth, adminController.gererMatches);
router.get("/detailsMatches/:id", requireAuth, adminController.viewMatches);
router.get("/editMatches/:id", requireAuth, adminController.editMatches);
router.get("/ajouter_Matches", requireAuth, adminController.addMatches);
router.post("/ajouter_Matches", requireAuth, adminController.postMatches);
router.put("/editMatches/:id", requireAuth, adminController.editpostMatches);
router.delete(
  "/supprimerMatches/:id",
  requireAuth,
  adminController.supprimerMatches
);
/*
//pour les equipes
router.get("/gererEquipes", requireAuth, adminController.gererEquipes);
router.get("/detailsEquipes/:id", requireAuth, adminController.viewEquipes);
router.get("/editEquipes/:id", requireAuth, adminController.editEquipes);
router.get("/ajouter_Equipes", requireAuth, adminController.addEquipes);
router.post("/ajouter_Equipes", requireAuth, adminController.postEquipes);
router.put("/editEquipes/:id", requireAuth, adminController.editpostEquipes);
router.delete(
  "/supprimerEquipes/:id",
  requireAuth,
  adminController.supprimerEquipes
);

//la partie de profile
//router.get("/monprofile/:id", adminController.monprofile); this need to be fixed
*/
module.exports = router;