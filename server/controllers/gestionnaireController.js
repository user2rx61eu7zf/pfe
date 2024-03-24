const mysql = require('mysql');
const db = require('../config/db');
const { use } = require('../routes/admin');



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
class Entraineur {
    constructor({ nom, prenom, nationalite, photo, date, email, motdepasse }) {
        this.nom = nom;
        this.prenom = prenom;
        this.photo = photo;
        this.nationalite = nationalite;
        this.date = date;
        this.email = email;
        this.motdepasse = motdepasse;
    }
}
class Stade {
    constructor({ nom, ville, adresse, capacite, date, }) {
        this.nom = nom;
        this.ville = ville;
        this.adresse = adresse;
        this.capacite = capacite;
        this.date = date;

    }
}




// get nouveau joueur 

exports.addPlayer = async (req, res) => {
    userId = req.params.id;
    const messages2 = await req.flash('inf');
    // console.log(userId)
    const locals = {
        title: 'Ajouter un Joueur ',
    }
    db.query("SELECT photo_profil FROM compte WHERE id_co=?", [userId], (err, results) => {
        if (err) {
            console.log("err avoir pfp" + err)
        }
        res.render('../views/Gestionnaire/add', { locals, userId, messages2, results })
    })

}

// post nouveau joueur 

exports.postPlayer = async (req, res) => {
    const { nom, prenom, nationalite, poste, maillot, date, poids, taille, email, motdepasse } = req.body;
    photojoueur = req.file.filename;

    // Check if email already exists
    db.query('SELECT COUNT(*) AS count FROM compte WHERE email_co = ?', [email], (err, results) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'email: " + err);
            return res.status(500).send("Erreur lors de la vérification de l'email");
        }
        const emailCount = results[0].count;
        if (emailCount > 0) {
            req.flash('inf', "Cet email existe déjà.");
            return res.redirect(`/ajouter_joueur/${req.params.id}`);
        } else {
            // Email doesn't exist, proceed with insertion
            db.query('INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [2, `${nom} ${prenom}`, motdepasse, email], (err, results) => {
                if (err) {
                    console.error("Erreur lors de la création du compte: " + err);
                    return res.status(500).send("Erreur lors de la création du compte");
                }
                db.query('SELECT id_co FROM compte WHERE email_co = ?', [email], (err, resultid) => {
                    if (err) {
                        console.error("Erreur lors de l'obtention de l'identifiant du compte: " + err);
                        return res.status(500).send("Erreur lors de l'obtention de l'identifiant du compte");
                    }
                    db.query('SELECT id_eq FROM equipe  WHERE id_co_ge_eq = ?', [req.params.id], (err, resultideq) => {
                        if (err) {
                            console.error("Erreur lors de l'obtention de l'identifiant de l'équipe: " + err);
                            return res.status(500).send("Erreur lors de l'obtention de l'identifiant de l'équipe");
                        }
                        // console.log(resultideq); // id de l'équipe que le gestionnaire gère 
                        db.query('INSERT INTO joueur (nom_jo, prenom_jo, photo_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo, id_eq_jo, id_co_jo) VALUES (?,?,?,?,?,?,?,?,?,?,?) ', [nom, prenom, photojoueur, nationalite, poste, maillot, date, taille, poids, resultideq[0].id_eq, resultid[0].id_co], (err, results) => {
                            if (err) {
                                console.error("Erreur lors de la création du joueur: " + err);
                                return res.status(500).send("Erreur lors de la création du joueur");
                            }
                            req.flash('info', "Joueur ajouté !");
                            res.redirect(`/gererjoueurs/${req.params.id}`);
                        });
                    });
                });
            });
        }
    });
};




// get paley data
exports.viewPlayer = async (req, res) => {

    const userId = req.params.id;  // Récupère l'ID du joueur depuis l'URL
    const gestId = req.params.idgest
    const locals = {
        title: "Voir Détails"
    }
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo,photo_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo,compte.email_co FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql id joueur" + err);
            return res.status(500).send("erreur sql id joueur");
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log("err avoir pfp page view joueur")
            }
            const id = results[0].id_jo;
            res.render('../views/Gestionnaire/details', { locals, id, results, result, userId, gestId }); // Rend la vue avec les détails du joueur

        })



    });
}
// voir entraineur
exports.voirEntraineur = async (req, res) => {

    const userId = req.params.id;  // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Voir Détails"
    }

    db.query('SELECT * FROM entraineur INNER JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent INNER JOIN compte ON compte.id_co = entraineur.id_co_ent WHERE id_co_ge_eq=?', [userId], (err, result) => {
        if (err) {
            console.log("erreue a avoir les donnes du coach" + err);
            return res.status(500).send("erreur sql avoir data du coach ")
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [userId], (err, results) => {
            if (err) {
                console.log("err avoir pfp" + err)
            }
            res.render('../views/Gestionnaire/detailsEntraineur', { locals, userId, results, result });
        })

    })






}
exports.voirStade = async (req, res) => {

    const gestId = req.params.id;  // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Voir Détails"
    }

    db.query('SELECT * FROM stade INNER JOIN equipe ON equipe.id_eq = stade.id_eq_std WHERE id_co_ge_eq=?', [gestId], (err, result) => {
        if (err) {
            console.log("erreue a avoir les donnes du stade" + err);
            return res.status(500).send("erreur sql avoir data du stade ")
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [gestId], (err, results) => {
            if (err) {
                console.log("erreur avoir pfp page edit joueur")
            }
            res.render('../views/Gestionnaire/detailsStade', { locals, gestId, results, result });
        })


    })






}
// get edit joueur

exports.editPlayer = async (req, res) => {
    playerId = req.params.id;
    gestId = req.params.idgest;
    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Modifier Joueur"
    }
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo,photo_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo,compte.email_co,mot_de_passe FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [playerId], (err, result) => {
        if (err) {
            console.error("erreur sql id joueur" + err);
            return res.status(500).send("erreur sql id joueur");
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [gestId], (err, results) => {
            if (err) {
                console.log("erreur avoir pfp page edit joueur")
            }
            const id = results[0].id_jo;
            res.render('../views/Gestionnaire/modifier', { locals, id, results, result, gestId }); // Rend la vue avec les détails du joueur
        })




    });
}
// edit entraineur 
exports.editEntraineur = async (req, res) => {
    gestId = req.params.id;

    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Modifier Entraineur "
    }

    db.query('SELECT * FROM entraineur JOIN compte ON entraineur.id_co_ent = compte.id_co JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent WHERE id_co_ge_eq = ?;', [gestId], (err, result) => {
        if (err) {
            console.error("erreur sql page modifier coach " + err)
            return res.status(500).send("erreur sql page modifier coach");
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [gestId], (err, results) => {
            if (err) {
                console.log("erreur avoir pfp page edit joueur")
            }
            res.render('../views/Gestionnaire/modifierEntraineur', { locals, results, result, gestId }); // Rend la vue avec les détails du joueur

        })
        // console.log(result)




    });
}
exports.editStade = async (req, res) => {
    gestId = req.params.id;

    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: "Modifier Stade "
    }

    db.query('SELECT * FROM stade JOIN equipe ON stade.id_eq_std = equipe.id_eq  WHERE id_co_ge_eq = ?;', [gestId], (err, result) => {
        if (err) {
            console.error("erreur sql page modifier stade " + err)
            return res.status(500).send("erreur sql page modifier stade");
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [gestId], (err, results) => {
            if (err) {
                console.log("erreur avoir pfp page edit joueur")
            }
            res.render('../views/Gestionnaire/modifierStade', { locals, results, result, gestId });
        })






    });
}



// put edit joueur
exports.editpost = async (req, res) => {
    playerId = req.params.id
    gestId = req.params.idgest
    const newjoueur = new Joueur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        poste: req.body.poste,
        maillot: req.body.maillot,
        date: req.body.date,
        poids: req.body.poids,
        taille: req.body.taille,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    })
    db.query('UPDATE compte JOIN joueur ON compte.id_co = joueur.id_co_jo SET compte.id_type=?, compte.nom_utilisateur=?, compte.mot_de_passe=?, compte.email_co=? WHERE joueur.id_jo=?', [2, newjoueur.nom + " " + newjoueur.prenom, newjoueur.motdepasse, newjoueur.email, req.params.idgest], (err, result) => {
        if (err) {
            console.error("erreur creer compte " + err);
            return res.status(500).send("erreur sql ajouter compte du joueur");
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newjoueur.email], (err, resultid) => {
            if (err) {
                console.error("erreur avoir id  compte " + err);
                return res.status(500).send("erreur sql avoir id compte du joueur");
            }
            db.query('UPDATE joueur SET nom_jo=?, prenom_jo=?, nationalite_jo=?, poste_jo=?, num_mai_jo=?, date_naiss_jo=?, taille_jo=?, poids_jo=?,id_co_jo=? WHERE id_jo=?', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.date, newjoueur.taille, newjoueur.poids, resultid[0].id_co, req.params.idgest], (err, result) => {
                if (err) {
                    console.error("erreur modifier joueur" + err);
                    return res.status(500).send("erreur sql modifier joueur");
                }



            })
        })


    })


    await req.flash('info', "Joueur Modifié !!")

    res.redirect(`/gererjoueurs/${playerId}`,)

}
exports.editpostEntraineur = async (req, res) => {
    userId = req.params.id

    const newentraineur = new Entraineur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        date: req.body.date,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    })
    db.query('UPDATE compte JOIN entraineur ON compte.id_co = entraineur.id_co_ent JOIN equipe ON equipe.id_eq =entraineur.id_eq_ent SET compte.id_type=?, compte.nom_utilisateur=?, compte.mot_de_passe=?, compte.email_co=? WHERE id_co_ge_eq=?', [2, newentraineur.nom + " " + newentraineur.prenom, newentraineur.motdepasse, newentraineur.email, userId], (err, result) => {
        if (err) {
            console.error("erreur creer compte " + err);
            return res.status(500).send("erreur sql ajouter compte du joueur");
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newentraineur.email], (err, resultid) => {
            if (err) {
                console.error("erreur avoir id  compte " + err);
                return res.status(500).send("erreur sql avoir id compte du joueur");
            }
            db.query('UPDATE entraineur JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent SET nom_ent = ?, prenom_ent = ?, nationalite_ent = ?,date_naiss_ent = ? WHERE id_co_ge_eq = ?', [newentraineur.nom, newentraineur.prenom, newentraineur.nationalite, newentraineur.date, userId], (err, result) => {
                if (err) {
                    console.error("erreur creer joueur" + err);
                    return res.status(500).send("erreur sql ajouter joueur");
                }


                // console.log("joueur modifie")
                //  console.log("compte modifier")
            })
        })


    })


    await req.flash('infoentraineur', "Entraineur Modifié !!")

    res.redirect(`/monequipe/${userId}`,)

}
exports.editpostStade = async (req, res) => {
    userId = req.params.id

    const newstade = new Stade({
        nom: req.body.nom,
        ville: req.body.ville,
        adresse: req.body.adresse,
        ville: req.body.ville,
        capacite: req.body.capacite,
        date: req.body.date,

    })
    db.query('UPDATE stade  JOIN equipe AS eq1 ON stade.id_eq_std = eq1.id_eq  JOIN equipe AS eq2 ON eq1.id_eq = eq2.id_eq SET stade.nom_std = ?,  stade.ville_std = ?, stade.adresse_std = ?, stade.capacite_std = ?,stade.date_crt=? WHERE eq2.id_co_ge_eq = ? ', [newstade.nom, newstade.ville, newstade.adresse, newstade.capacite, newstade.date, userId], (err, result) => {
        if (err) {
            console.error("erreur modifier stade " + err);
            return res.status(500).send("erreur sql modifier stade");
        }



    })






    await req.flash('editstade', "Stade Modifié !!")

    res.redirect(`/monequipe/${userId}`,)

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
    const gestId = req.params.id;
    // console.log(gestId)
    const messages = await req.flash('info');
    const locals = {
        title: 'Gestion des Joueurs',
    }
    db.query("SELECT joueur.id_jo, joueur.nom_jo, joueur.prenom_jo,photo_jo, joueur.nationalite_jo, joueur.poste_jo, joueur.num_mai_jo, joueur.date_naiss_jo, joueur.taille_jo, joueur.poids_jo, compte.email_co FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq JOIN compte ON joueur.id_co_jo = compte.id_co WHERE equipe.id_co_ge_eq = ?; ", [gestId], (err, result) => {
        if (err) {
            console.error("erreur sql select data joueurs  " + err);
            return res.status(500).send("erreur sql select data joueurs");
        }
        db.query("SELECT photo_profil FROM compte WHERE id_co=?", [gestId], (err, results) => {
            if (err) {
                console.error("erreur sql select pfp  " + err);
                return res.status(500).send("erreur sql pfp");
            }

            // console.log(results)

            res.render('GestionnaireIndex', { locals, messages, results, gestId, result })
        })


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
            // console.log(result);
            res.render('../views/Gestionnaire/recherche', { result, userId });
        });

}


exports.monprofile = async (req, res) => {
    gestId = req.params.id;
    const message_err = await req.flash('info');
    const message_scc = await req.flash('info1');
    const locals = {
        title: "Mon profile"
    }
    db.query('SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
        if (err) {
            console.error("erreur sql page profile  " + err);
            return res.status(500).send("erreur sql page profile ");
        }
        db.query('SELECT nom_eq FROM equipe WHERE id_co_ge_eq=?', [gestId], (err, result) => {
            if (err) {
                console.error("erreur sql equipe page profile  " + err);
                return res.status(500).send("erreur sql equipe page profile ");
            }
            res.render("../views/Gestionnaire/profile", { gestId, locals, result, results, message_err, message_scc });
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

    // Store the response object outside the MySQL query callback
    const response = res;

    db.query('SELECT mot_de_passe, photo_profil FROM compte WHERE id_co=?', [userId], (err, result) => {
        if (err) {
            console.error("erreur sql avoir mdp   " + err);
            return response.status(500).send("erreur sql avoir mdp ");
        }

        // Check if current password matches
        if (mdpactuel === result[0].mot_de_passe && !req.file) {
            // If current password matches and no file (profile picture) is uploaded
            photo_gest = result[0].photo_profil;
            // Update password
            db.query('UPDATE compte SET mot_de_passe=?,photo_profil=? WHERE id_co=?', [nvmdp, photo_gest, userId], (err, results) => {
                if (err) {
                    console.error("erreur sql changer mdp   " + err);
                    return response.status(500).send("erreur sql changer mdp ");
                } else {

                    req.flash('info1', 'Mot de passe changé avec succès');
                    return response.redirect(`/monprofile/${userId}`);
                }
            });
        } else if (!req.body.mdpactuel && !req.file) {
            // If neither the current password nor the file (profile picture) is updated

            return response.redirect(`/monprofile/${userId}`);
        } else if (!req.body.mdpactuel && req.file) {
            // If only the profile picture is being changed
            photo_gest = req.file.filename;
            db.query('UPDATE compte SET photo_profil=? WHERE id_co=?', [photo_gest, userId], (err, res) => {
                if (err) {
                    console.error("erreur sql changer pfp   " + err);
                    return response.status(500).send("erreur sql changer pfp ");
                }
                return response.redirect(`/monprofile/${userId}`);
            });
        } else {
            // If the current password is incorrect
            req.flash('info', 'Mot de passe actuel est faux');
            return response.redirect(`/monprofile/${userId}`);
        }
    });

};

exports.monequipe = async (req, res) => {
    gestId = req.params.id;
    const message_ent = await req.flash('infoentraineur');
    const message_editstade = await req.flash('editstade');
    const message_stade = await req.flash('infostade');


    const locals = { title: "Mon equipe" }

    db.query("SELECT * FROM equipe WHERE id_co_ge_eq=? ", [gestId], (err, result) => {
        if (err) {
            console.error("erreur sql avoir donnee equipe   " + err);
            return res.status(500).send("erreur sql avoir donnee equipe ");
        }

        db.query('SELECT * FROM entraineur JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent WHERE equipe.id_co_ge_eq = ?', [gestId], (err, resu) => {
            if (err) {
                console.error("erreur sql avoir donnee entaineur   " + err);
                return res.status(500).send("erreur sql avoir donnee entraineur ");
            }
            db.query('SELECT * FROM stade  JOIN equipe ON equipe.id_eq = stade.id_eq_std WHERE equipe.id_co_ge_eq = ? ', [gestId], (err, resultstd) => {
                if (err) {
                    console.error("erreur sql avoir donnee stade   " + err);
                    return res.status(500).send("erreur sql avoir donnee stade ");
                }
                db.query('SELECT * FROM compte WHERE id_co=? ', [gestId], (err, results) => {
                    if (err) {
                        console.error("erreur sql avoir pfp  " + err);
                        return res.status(500).send("erreur sql pfp ")
                    }
                    // console.log(results)
                    // console.log(result)
                    res.render('../views/Gestionnaire/equipe', { locals, results, resu, message_ent, message_stade, resultstd, result, message_editstade })
                })


            })


        })


    })
}
exports.addEntraineur = async (req, res) => {
    userId = req.params.id;
    const message_email = await req.flash('inf2');
    const locals = { title: "Ajouter Entraineur " }

    db.query("SELECT photo_profil FROM compte WHERE id_co=?", [userId], (err, results) => {
        if (err) {
            console.log("err avoir pfp" + err)
        }
        res.render('../views/Gestionnaire/add_entraineur', { locals, message_email, results })
    })


}

exports.postEntraineur = async (req, res) => {
    userId = req.params.id;
    const newentraineur = new Entraineur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        photo: req.file.filename,
        date: req.body.date,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    })


    db.query('SELECT COUNT(*) AS count FROM compte WHERE email_co = ?', [newentraineur.email], (err, result) => {
        if (err) {
            console.error("Erreur lors de la vérification de l'email: " + err);
            return res.status(500).send("Erreur lors de la vérification de l'email");
        }
        const emailCount = result[0].count;
        if (emailCount > 0) {
            req.flash('inf2', "Cet email existe déjà.");
            return res.redirect(`/ajouter_entraineur/${req.params.id}`);
        } else {
            // Email doesn't exist, proceed with insertion
            db.query('INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [3, `${newentraineur.nom} ${newentraineur.prenom}`, newentraineur.motdepasse, newentraineur.email], (err, result) => {
                if (err) {
                    console.error("Erreur lors de la création du compte: " + err);
                    return res.status(500).send("Erreur lors de la création du compte");
                }
                db.query('SELECT id_eq FROM equipe WHERE id_co_ge_eq = ?', [userId], (err, resultideq) => {
                    if (err) {
                        console.error("Erreur sql lors de l'obtention de l'identifiant du equipe: " + err);
                        return res.status(500).send("Erreur sql lors de l'obtention de l'identifiant de lequipe");
                    }
                    db.query('SELECT id_co FROM compte  WHERE email_co = ?', [newentraineur.email], (err, resultidco) => {
                        if (err) {
                            console.error("Erreur sql lors de l'obtention de l'identifiant du compte: " + err);
                            return res.status(500).send("Erreur sql lors de l'obtention de l'identifiant du compte");
                        }
                        db.query(' INSERT INTO entraineur ( nom_ent, prenom_ent, date_naiss_ent ,img_ent, nationalite_ent, id_eq_ent, id_co_ent) VALUES ( ?,?,?, ?,?, ?, ?);', [newentraineur.nom, newentraineur.prenom, newentraineur.date, newentraineur.photo, newentraineur.nationalite, resultideq[0].id_eq, resultidco[0].id_co], (err, result) => {
                            if (err) {
                                console.error("Erreur lors de la création du entraineur: " + err);
                                return res.status(500).send("Erreur lors de la création du entraineur");
                            }
                            req.flash('infoentraineur', "Entraineur ajouté !");
                            res.redirect(`/monequipe/${req.params.id}`);
                        });
                    });
                });
            });
        }
    });


}


exports.monstade = async (req, res) => {
    userId = req.params.id;
    const locals = { title: "Mon equipe" }
    db.query("SELECT photo_profil FROM compte WHERE id_co=?", [userId], (err, results) => {
        if (err) {
            console.log("err avoir pfp" + err)
        }
        res.render('../views/Gestionnaire/ajouterStade', { locals, results })
    })









}


exports.postStade = async (req, res) => {
    userId = req.params.id;
    const newstade = new Stade({
        nom: req.body.nom,
        ville: req.body.ville,
        adresse: req.body.adresse,
        capacite: req.body.capacite,
        date: req.body.date
    })
    db.query(' SELECT id_eq FROM equipe WHERE equipe.id_co_ge_eq = ?', [userId], (err, result) => {
        if (err) {
            console.log("erreur sql avoir id equipe  " + err)
            return res.status(500).send("erreur sql avoir id equipe ")
        }
        // console.log(res)
        db.query('INSERT INTO STADE (nom_std,ville_std,adresse_std,capacite_std,date_crt,id_eq_std) VALUES (?,?,?,?,?,?) ', [newstade.nom, newstade.ville, newstade.adresse, newstade.capacite, newstade.date, result[0].id_eq], (err, result) => {
            if (err) {
                console.log("erreur sql ajouter stade" + err)
                return res.status(500).send("erreur sql ajouter stade")
            }

        })
        req.flash('infostade', "Stade ajouté !");
        res.redirect(`/monequipe/${req.params.id}`);
    })


}


exports.gerermatch = async (req, res) => {
    gestId = req.params.id;
    const locals = {
        title: "Gestion de match"
    }
    db.query('SELECT * FROM compte  WHERE id_co=? ', [gestId], (err, results) => {
        if (err) {
            console.log("erreur sql avoir pfp page gestion match " + err)
        }
        res.render('../views/Gestionnaire/gerermatch', { locals, gestId, results })
    })



}
