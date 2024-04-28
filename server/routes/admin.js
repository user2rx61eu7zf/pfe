const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { requireAuth } = require("../config/auth");
const path = require("path");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../images"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

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
  upload.single("photoGestionnaire"),
  requireAuth,
  adminController.postGestionnaire
);
//router.put("/edit/:id", adminController.editpost);
router.delete(
  "/supprimer/:id",
  requireAuth,
  adminController.supprimerGestionnaire
);
router.put(
  "/edit/:id",
  upload.single("photoGestionnaire"),
  requireAuth,
  adminController.editpostGestio
);
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
router.post(
  "/ajouter_arbitres",
  requireAuth,
  upload.single("photoArbitre"),
  adminController.postArbitres
);
router.put(
  "/editArbitres/:id",
  requireAuth,
  upload.single("photoArbitre"),
  adminController.editpostArbitres
);
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
router.post(
  "/ajouter_Articles",
  requireAuth,
  upload.single("image_art"),
  adminController.postArticles
);
router.put(
  "/editArticles/:id",
  requireAuth,
  upload.single("image_art"),
  adminController.editpostArticles
);
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
router.get("/monprofile", requireAuth, adminController.monprofile);
router.put(
  "/monprofile",
  upload.single("photo_admin"),
  adminController.monprofilepost
);

//pour les equipes
router.get("/gererEquipes", requireAuth, adminController.gererEquipes);
router.get("/detailsEquipes/:id", requireAuth, adminController.viewEquipes);
router.get("/editEquipes/:id", requireAuth, adminController.editEquipes);
router.get("/ajouter_Equipes", requireAuth, adminController.addEquipes);
router.post(
  "/ajouter_Equipes",
  requireAuth,
  upload.single("LogoEquipe"),
  adminController.postEquipes
);
router.put(
  "/editEquipes/:id",
  requireAuth,
  upload.single("LogoEquipe"),
  adminController.editpostEquipes
);
router.delete(
  "/supprimerEquipes/:id",
  requireAuth,
  adminController.supprimerEquipes
);
module.exports = router;
