const mysql = require('mysql');
const db = require('../config/db');



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




// get nouveau joueur 

exports.addPlayer = async (req, res) => {
    userId = req.params.id;
    console.log(userId)
    const locals = {
        title: 'Ajouter un Joueur ',
    }
    res.render('../views/Gestionnaire/add', { locals, userId })
}

// post nouveau joueur 

exports.postPlayer = async (req, res) => {

    userid = req.params.id;
    console.log(userid);


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
            // avoir id equipe on on veut ajouter un joueur selon lid du compte de gestionnaire connecte /gestionnaire/7
            db.query('SELECT id_eq FROM equipe  WHERE id_co_ge_eq=?', [userid], (err, resultideq) => {
                if (err) {
                    console.error("erreur avoir id  compte " + err);
                    return res.status(500).send("erreur sql avoir id compte du joueur");
                }
                console.log(resultideq) // id de lequipe que le gestionnaire gere 
                db.query('INSERT INTO joueur (nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,id_eq_jo,id_co_jo) VALUES (?,?,?,?,?,?,?,?,?,?) ', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.age, newjoueur.taille, newjoueur.poids, resultideq[0].id_eq, resultid[0].id_co], (err, result) => {
                    if (err) {
                        console.error("erreur creer joueur" + err);
                        return res.status(500).send("erreur sql ajouter joueur");
                    }
                })



                // console.log("joueur ajoute")
                //  console.log("compte cree")

            })
        })


    })
    await req.flash('info', "Joueur ajouté !!")

    res.redirect(`/gererjoueurs/${req.params.id}`)

}



// get paley data
exports.viewPlayer = async (req, res) => {

    const userId = req.params.id;  // Récupère l'ID du joueur depuis l'URL
    const GestionnaireId = req.params.idgest
    const locals = {
        title: "Voir Détails"
    }
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, age_jo, taille_jo, poids_jo,compte.email_co FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql id joueur" + err);
            return res.status(500).send("erreur sql id joueur");
        }


        const id = result[0].id_jo;
        res.render('../views/Gestionnaire/details', { locals, id, result, userId }); // Rend la vue avec les détails du joueur

    });
}

// get edit joueur

exports.editPlayer = async (req, res) => {
    playerId = req.params.id;
    userId = req.params.idgest;
    // Récupère l'ID du joueur depuis l'URL

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
        res.render('../views/Gestionnaire/modifier', { locals, id, result, userId }); // Rend la vue avec les détails du joueur

    });
}
// put edit joueur
exports.editpost = async (req, res) => {
    playerId = req.params.id
    userId = req.params.idgest
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
    db.query('UPDATE compte JOIN joueur ON compte.id_co = joueur.id_co_jo SET compte.id_type=?, compte.nom_utilisateur=?, compte.mot_de_passe=?, compte.email_co=? WHERE joueur.id_jo=?', [2, newjoueur.nom + " " + newjoueur.prenom, newjoueur.motdepasse, newjoueur.email, req.params.id], (err, result) => {
        if (err) {
            console.error("erreur creer compte " + err);
            return res.status(500).send("erreur sql ajouter compte du joueur");
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newjoueur.email], (err, resultid) => {
            if (err) {
                console.error("erreur avoir id  compte " + err);
                return res.status(500).send("erreur sql avoir id compte du joueur");
            }
            db.query('UPDATE joueur SET nom_jo=?, prenom_jo=?, nationalite_jo=?, poste_jo=?, num_mai_jo=?, age_jo=?, taille_jo=?, poids_jo=?,id_co_jo=? WHERE id_jo=?', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.age, newjoueur.taille, newjoueur.poids, resultid[0].id_co, playerId], (err, result) => {
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

    res.redirect(`/gererjoueurs/${userId}`,)

}


exports.supprimerJoueur = async (req, res) => {
    userId = req.params.idgest;

    db.query('SELECT id_co_jo FROM joueur WHERE id_jo=?', [req.params.id], (err, res) => {
        if (err) {
            console.error("erreur sql avoir id compte joueurs supprime" + err);
            return res.status(500).send("erreur sql avoir id compte joueurs supprime");
        }
        console.log(res)
        db.query("DELETE FROM joueur WHERE id_jo= ?", [req.params.id], (err, result) => {
            if (err) {
                console.error("erreur sql supp joueur" + err);
                return res.status(500).send("erreur sql supp joueur");
            }
            db.query('DELETE FROM compte WHERE id_co=?', [res[0].id_co_jo], (err, res) => {
                if (err) {
                    console.error("erreur sql supp compte joueurs" + err);
                    return res.status(500).send("erreur sql supp compte joueur");
                }
            })
        })

    });
    await req.flash('info', "Joueur Supprime !!");
    res.redirect(`/gererjoueurs/${req.params.idgest}`);
};



exports.gererJoueur = async (req, res) => {
    const userId = req.params.id;
    console.log(userId)
    const messages = await req.flash('info');
    const locals = {
        title: 'Gestion des Joueurs',
    }
    db.query("SELECT joueur.id_jo, joueur.nom_jo, joueur.prenom_jo, joueur.nationalite_jo, joueur.poste_jo, joueur.num_mai_jo, joueur.age_jo, joueur.taille_jo, joueur.poids_jo, compte.email_co FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq JOIN compte ON joueur.id_co_jo = compte.id_co WHERE equipe.id_co_ge_eq = ?; ", [userId], (err, result) => {
        if (err) {
            console.error("erreur sql select data joueurs  " + err);
            return res.status(500).send("erreur sql select data joueurs");
        }


        // console.log(result)

        res.render('GestionnaireIndex', { locals, messages, result, userId })
    })




}

exports.search = async (req, res) => {
    userId = req.params.id
    let recherche = req.body.searchTerm;
    db.query("SELECT joueur.id_jo, joueur.nom_jo, joueur.prenom_jo FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq JOIN compte ON joueur.id_co_jo = compte.id_co WHERE (joueur.nom_jo LIKE ? OR joueur.prenom_jo LIKE ?) AND equipe.id_co_ge_eq = ?"
        , [`%${recherche}%`, `%${recherche}%`, userId], (err, result) => {
            if (err) {
                console.error("erreur sql recherche  " + err);
                return res.status(500).send("erreur sql recherche");
            }
            console.log(result);
            res.render('../views/Gestionnaire/recherche', { result, userId });
        });

}


exports.monprofile = async (req, res) => {
    userId = req.params.id;
    const message_err = await req.flash('info');
    const message_scc = await req.flash('info1');
    const locals = {
        title: "Mon profile"
    }
    db.query('SELECT nom_utilisateur,email_co FROM compte WHERE id_co=?', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql page profile  " + err);
            return res.status(500).send("erreur sql page profile ");
        }
        db.query('SELECT nom_eq FROM equipe WHERE id_co_ge_eq=?', [userId], (err, results) => {
            if (err) {
                console.error("erreur sql equipe page profile  " + err);
                return res.status(500).send("erreur sql equipe page profile ");
            }
            res.render("../views/Gestionnaire/profile", { userId, locals, result, results, message_err, message_scc });
        });




    });
}

exports.monprofilepost = async (req, res) => {
    const userId = req.params.id;
    const mdpactuel = req.body.mdpactuel;
    const nvmdp = req.body.nvmdp;

    const locals = {
        title: "Mon profile"
    }

    db.query('SELECT mot_de_passe FROM compte WHERE id_co=?', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql avoir mdp   " + err);
            return res.status(500).send("erreur sql avoir mdp ");
        }

        // Check if current password matches
        if (mdpactuel === result[0].mot_de_passe) {
            // Update password
            db.query('UPDATE compte SET mot_de_passe=? WHERE id_co=?', [nvmdp, userId], (err, result) => {
                if (err) {
                    console.error("erreur sql changer mdp   " + err);
                    return res.status(500).send("erreur sql changer mdp ");
                } else {
                    console.log("password modified");

                    req.flash('info1', 'Mot de passe changé avec succès  ');
                    res.redirect(`/monprofile/${userId}`);
                }
            });
        } else {
            req.flash('info', ' Mot de passe actuel est faux ');
            res.redirect(`/monprofile/${userId}`);
        }
    });
};

exports.monequipe = async (req, res) => {
    userId = req.params.id;

    const locals = { title: "Mon equipe" }



    res.render('../views/Gestionnaire/equipe', { locals })










}

