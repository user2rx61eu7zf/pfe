const mysql = require("mysql");
const db = require("../config/db");

class Gestionnaire {
    constructor({ nom, prenom, age, email, motdepasse }) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.email = email;
        this.motdepasse = motdepasse;
    }
}

exports.homepageAdmin = async (req, res) => {
    const locals = {
        title: "Admin",
    };
    res.render("../views/Admin/homepageAdmin", {
        locals,
        layout: "./layouts/mainAdmin.ejs",
    });
};
// get gestionnaire data
exports.viewGestionnaire = async (req, res) => {
    const GestionnaireId = req.params.id; // Récupère l'ID du Gestionnaire depuis l'URL
    const locals = {
        title: "Voir Détails",
    };
    // Exécute une requête SQL pour récupérer les détails du Gestionnaire avec l'ID spécifié
    db.query(
        "SELECT id_ge,nom,prenom,age,compte.email_co FROM `gestionnaire de club` JOIN compte ON `gestionnaire de club`.id_co_ge = compte.id_co AND id_ge=?;",
        [GestionnaireId],
        (err, result) => {
            if (err) {
                console.error("erreur sql id gestionnaire" + err);
                return res.status(500).send("erreur sql id gestionnaire");
            }
            console.log(result);
            const id = result[0].id_ge;
            res.render("../views/Admin/detailsGestio", {
                locals,
                id,
                result,
                layout: "./layouts/mainAdmin.ejs",
            }); // Rend la vue avec les détails du gestionnaire
        }
    );
};

//get nouveau gestionnaire
exports.addGestionnaire = async (req, res) => {
    const locals = {
        title: "Ajouter un Gestionnaire",
    };
    res.render("../views/Admin/addGestio", {
        locals,
        layout: "./layouts/mainAdmin.ejs",
    });
};

exports.postGestionnaire = async (req, res) => {
    //  console.log(req.body);

    const newGestionnaire = new Gestionnaire({
        nom: req.body.nom,
        prenom: req.body.prenom,
        age: req.body.age,
        email: req.body.email,
        motdepasse: req.body.motdepasse,
    });

    db.query(
        "INSERT INTO compte (id_type,nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)", [
        6,
        newGestionnaire.nom + " " + newGestionnaire.prenom,
        newGestionnaire.motdepasse,
        newGestionnaire.email,
    ],
        (err, result) => {
            if (err) {
                console.error("erreur creer compte " + err);
                return res
                    .status(500)
                    .send("erreur sql ajouter compte du Gestionnaire");
            }
            db.query(
                "SELECT id_co FROM compte WHERE email_co =? ",
                [newGestionnaire.email],
                (err, resultid) => {
                    console.log(resultid);
                    if (err) {
                        console.error("erreur avoir id  compte " + err);
                        return res
                            .status(500)
                            .send("erreur sql avoir id compte du Gestionnaire");
                    }
                    db.query(
                        "INSERT INTO `gestionnaire de club` (nom, prenom,id_ad_ge,age,id_co_ge) VALUES (?,?,?,?,?) ",
                        [
                            newGestionnaire.nom,
                            newGestionnaire.prenom,
                            2,
                            newGestionnaire.age,
                            resultid[0].id_co,
                        ],
                        async (err, result) => {
                            if (err) {
                                console.error("erreur creer gestionnaire" + err);
                                return res.status(500).send("erreur sql ajouter gestionnaire");
                            }
                            console.log(result.insertId);
                            await req.flash("info", "Gestionnaire Ajouté !!");
                            res.redirect(`/gererGestionnaire`);

                            // console.log("joueur ajoute")
                            //  console.log("compte cree")
                        }
                    );
                }
            );
        }
    );
};

exports.supprimerGestionnaire = async (req, res) => {
    db.query(
        "DELETE FROM `gestionnaire de club` WHERE id_ge= ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                console.error("erreur supprimer gestionnaire" + err);
                return res.status(500).send("erreur sql supprimer Gestionnaire");
            }
        }
    );
    await req.flash("info", "Gestionnaire Supprime !!");
    res.redirect(`/gererGestionnaire`);
};

exports.gererGestionnaire = async (req, res) => {
    const messages = await req.flash("info");
    const locals = {
        title: "Gestion des Gestionnaire",
    };
    db.query(
        "SELECT id_ge,nom, prenom,age,compte.email_co FROM `gestionnaire de club` JOIN compte ON `gestionnaire de club`.id_co_ge = compte.id_co; ",
        (err, result) => {
            if (err) {
                console.error("erreur sql select data Gestionnaires  " + err);
                return res.status(500).send("erreur sql select data Gestionnaires");
            }

            // console.log(result)

            res.render("AdminIndex", {
                locals,
                messages,
                result,
                layout: "./layouts/mainAdmin.ejs",
            });
        }
    );
};
// get edit Gestionnaire

exports.editGestionnaire = async (req, res) => {
    const userId = req.params.id;
    db.query('SELECT id_ge,nom,prenom,age,compte.email_co,mot_de_passe FROM `gestionnaire de club` JOIN compte ON `gestionnaire de club`.id_co_ge = compte.id_co AND id_ge=?', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql select data Gestionnaires  " + err);
            return res.status(500).send("erreur sql select data Gestionnaires");
        }
        res.render('../views/Admin/modifierGestio', { result, layout: "./layouts/mainAdmin.ejs", })
    })



};