const mysql = require('mysql');
const db = require('../config/db');
const bdd = require('../config/db');


class Joueur {
    constructor({ nom, prenom, nationalite, poste, maillot, age, poids, taille, email, motdepasse }) {
        this.nom = nom;
        this.prenom = prenom;
        this.nationalite = nationalite;
        this.poste = poste;
        this.maillot = maillot;
        this.age = age;
        this.poids = poids;
        this.taille = taille;
        this.email = email;
        this.motdepasse = motdepasse;
    }
}


// get home page 



exports.homepage = async (req, res) => {
    const messages = await req.flash('info');
    const locals = {
        title: 'NodeJS',
    }
    db.query("SELECT id_jo,nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,compte.email_co FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co; ", (err, result) => {
        if (err) {
            console.error("erreur sql select data joueurs  " + err);
            return res.status(500).send("erreur sql select data joueurs");
        }


        // console.log(result)

        res.render('index', { locals, messages, result })
    })





}

// get nouveau joueur 

exports.addPlayer = async (req, res) => {
    const locals = {
        title: 'Ajouter un Joueur ',
    }
    res.render('../views/Player/add', { locals })
}

// post nouveau joueur 

exports.postPlayer = async (req, res) => {

    //  console.log(req.body);

    const newjoueur = new Joueur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        poste: req.body.poste,
        maillot: req.body.maillot,
        age: req.body.age,
        poids: req.body.poids,
        taille: req.body.taille,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    })

    db.query('INSERT INTO compte (id_type,nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [2, newjoueur.nom + " " + newjoueur.prenom, newjoueur.motdepasse, newjoueur.email], (err, result) => {
        if (err) {
            console.error("erreur creer compte " + err);
            return res.status(500).send("erreur sql ajouter compte du joueur");
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newjoueur.email], (err, resultid) => {
            if (err) {
                console.error("erreur avoir id  compte " + err);
                return res.status(500).send("erreur sql avoir id compte du joueur");
            }
            db.query('INSERT INTO joueur (nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,id_co_jo) VALUES (?,?,?,?,?,?,?,?,?) ', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.age, newjoueur.taille, newjoueur.poids, resultid[0].id_co], (err, result) => {
                if (err) {
                    console.error("erreur creer joueur" + err);
                    return res.status(500).send("erreur sql ajouter joueur");
                }


                // console.log("joueur ajoute")
                //  console.log("compte cree")
            })
        })


    })

    await req.flash('info', "Joueur ajouté !!")

    res.redirect('/')
}



// get paley data
exports.viewPlayer = async (req, res) => {
    const playerId = req.params.id; // Récupère l'ID du joueur depuis l'URL
    const locals = {
        title: "Voir Détails"
    }
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,compte.email_co FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [playerId], (err, result) => {
        if (err) {
            console.error("erreur sql id joueur" + err);
            return res.status(500).send("erreur sql id joueur");
        }


        const id = result[0].id_jo;
        res.render('../views/Player/details', { locals, id, result }); // Rend la vue avec les détails du joueur

    });
}

// get edit joueur

exports.editPlayer = async (req, res) => {
    const playerId = req.params.id; // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Modifier Joueur"
    }
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,compte.email_co,mot_de_passe FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [playerId], (err, result) => {
        if (err) {
            console.error("erreur sql id joueur" + err);
            return res.status(500).send("erreur sql id joueur");
        }


        const id = result[0].id_jo;
        res.render('../views/Player/modifier', { locals, id, result }); // Rend la vue avec les détails du joueur

    });
}
// put edit joueur
exports.editpost = async (req, res) => {
    const newjoueur = new Joueur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        poste: req.body.poste,
        maillot: req.body.maillot,
        age: req.body.age,
        poids: req.body.poids,
        taille: req.body.taille,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    })
    db.query('INSERT INTO compte (id_type,nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [2, newjoueur.nom + " " + newjoueur.prenom, newjoueur.motdepasse, newjoueur.email], (err, result) => {
        if (err) {
            console.error("erreur creer compte " + err);
            return res.status(500).send("erreur sql ajouter compte du joueur");
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newjoueur.email], (err, resultid) => {
            if (err) {
                console.error("erreur avoir id  compte " + err);
                return res.status(500).send("erreur sql avoir id compte du joueur");
            }
            db.query('INSERT INTO joueur (nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,id_co_jo) VALUES (?,?,?,?,?,?,?,?,?) ', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.age, newjoueur.taille, newjoueur.poids, resultid[0].id_co], (err, result) => {
                if (err) {
                    console.error("erreur creer joueur" + err);
                    return res.status(500).send("erreur sql ajouter joueur");
                }


                // console.log("joueur modifie")
                //  console.log("compte modifier")
            })
        })


    })


    await req.flash('info', "Joueur Modifié !!")

    res.redirect(`/edit/${req.params.id}`,)

}


exports.supprimerJoueur = async (req, res) => {
    bdd.query("DELETE FROM joueur WHERE id_jo= ?", [req.params.id], (err, result) => {
        if (err) {
            console.error("erreur creer joueur" + err);
            return res.status(500).send("erreur sql ajouter joueur");
        }

    })
    await req.flash('info', "Joueur Supprime !!")
    res.redirect('/')
}
//cherhcer
exports.chercherJoueur = async (req, res) => {
    let recherche = req.body.searchTerm;

}