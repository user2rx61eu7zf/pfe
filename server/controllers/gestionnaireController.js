const mysql = require('mysql');
const db = require('../config/db');
const http = require('http');
const { use } = require('../routes/admin');
// const { dbQuery } = require('../config/db');
const app = require('../../app'); 
const { io } = require('../../app.js');
const { equipes } = require('./visiteurController.js');







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




exports.addPlayer = async (req, res) => {
    gestId = req.params.idgest;


    const messages2 = await req.flash('inf');

    const locals = {
        title: 'Ajouter un Joueur ',
    };
    db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
        if (err) 
        {
            console.log('err avoir pfp' + err);
        }


        res.render('../views/Gestionnaire/add', { locals, gestId, messages2, results });
    });

};

// post nouveau joueur 

exports.postPlayer = async (req, res) => {
    const { nom, prenom, nationalite, poste, maillot, date, poids, taille, email, motdepasse } = req.body;


    // Check if email already exists
    db.query('SELECT COUNT(*) AS count FROM compte WHERE email_co = ?', [email], (err, resultmail) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email: ' + err);
            return res.status(500).send('Erreur lors de la vérification de l\'email');
        }
        const emailCount = resultmail[0].count;
        if (emailCount > 0) {
            req.flash('inf', 'Cet email existe déjà.');
            return res.redirect(`/ajouter_joueur/${req.params.idgest}`);
        } else {
            // Email doesn't exist, proceed with insertion
            db.query('INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [2, `${nom} ${prenom}`, motdepasse, email], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la création du compte: ' + err);
                    return res.status(500).send('Erreur lors de la création du compte');
                }
                db.query('SELECT id_co FROM compte WHERE email_co = ?', [email], (err, resultid) => {
                    if (err) {
                        console.error('Erreur lors de l\'obtention de l\'identifiant du compte: ' + err);
                        return res.status(500).send('Erreur lors de l\'obtention de l\'identifiant du compte');
                    }
                    db.query('SELECT id_eq FROM equipe  WHERE id_co_ge_eq = ?', [req.params.idgest], (err, resultideq) => {
                        if (err) {
                            console.error('Erreur lors de l\'obtention de l\'identifiant de l\'équipe: ' + err);
                            return res.status(500).send('Erreur lors de l\'obtention de l\'identifiant de l\'équipe');
                        }



                        if (req.file) {
                            photo = req.file.filename;
                            db.query('INSERT INTO joueur (nom_jo, prenom_jo, photo_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo, id_eq_jo, id_co_jo) VALUES (?,?,?,?,?,?,?,?,?,?,?) ', [nom, prenom, photo, nationalite, poste, maillot, date, taille, poids, resultideq[0].id_eq, resultid[0].id_co], (err, result) => {
                                if (err) {
                                    console.error('Erreur lors de la création du joueur: ' + err);
                                    return res.status(500).send('Erreur lors de la création du joueur');
                                }
                                req.flash('info', 'Joueur ajouté !');
                                res.redirect(`/gererjoueurs/${req.params.idgest}`);
                            });
                        } else {
                            db.query('INSERT INTO joueur (nom_jo, prenom_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo, id_eq_jo, id_co_jo) VALUES (?,?,?,?,?,?,?,?,?,?) ', [nom, prenom, nationalite, poste, maillot, date, taille, poids, resultideq[0].id_eq, resultid[0].id_co], (err, results) => {
                                if (err) {
                                    console.error('Erreur lors de la création du joueur sans photo: ' + err);
                                    return res.status(500).send('Erreur lors de la création du joueur');
                                }

                                req.flash('info', 'Joueur ajouté !');
                                res.redirect(`/gererjoueurs/${req.params.idgest}`);


                            });

                        }

                    });
                });
            });
        }
    });
};




// get paley data
exports.viewPlayer = async (req, res) => {

    const userId = req.params.id;  // Récupère l'ID du joueur depuis l'URL
    const gestId = req.params.idgest;
    const locals = {
        title: 'Voir Détails'
    };
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo,photo_jo, nationalite_jo,nbr_buts_jo,nbr_passe_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo,compte.email_co FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [userId], (err, result) => {
        if (err) {
            console.error('erreur sql id joueur' + err);
            return res.status(500).send('erreur sql id joueur');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log('err avoir pfp page view joueur');
            }
            const id = results[0].id_jo;
            res.render('../views/Gestionnaire/details', { locals, id, results, result, userId, gestId }); // Rend la vue avec les détails du joueur

        });
        


    });
};
exports.article = async (req, res) => {

    const gestId = req.params.idgest;  

    const messages = await req.flash('article');
   
    const locals = {
        title: 'Article'
    };
    db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
        if (err) {
            console.log('err avoir pfp' + err);
        }
        res.render('../views/Gestionnaire/article', {results, gestId,messages }); 
     })
    
    
};
exports.articlepost = async (req, res) => {

    const gestId = req.params.idgest;  
   console.log(req.body);
   
    photo=req.file.filename;
    
   db.query("INSERT INTO article (date_art,titre_art,description_art,image_art,auteur_art)VALUES(?,?,?,?,?)",[req.body.date,req.body.titre,req.body.description,photo,req.body.auteur],(err,result)=>{
    if(err){
        console.log("erreur ajouter article"+err);
    }
  
   })
   await req.flash('article', 'Article ajouté !!');
   res.redirect(`/ecrire_article/${gestId}`,);
    
};
// voir entraineur
exports.voirEntraineur = async (req, res) => {

    const userId = req.params.id;  // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: 'Voir Détails'
    };

    db.query('SELECT * FROM entraineur INNER JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent INNER JOIN compte ON compte.id_co = entraineur.id_co_ent WHERE id_co_ge_eq=?', [userId], (err, result) => {
        if (err) {
            console.log('erreue a avoir les donnes du coach' + err);
            return res.status(500).send('erreur sql avoir data du coach ');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [userId], (err, results) => {
            if (err) {
                console.log('err avoir pfp' + err);
            }
            res.render('../views/Gestionnaire/detailsEntraineur', { locals, userId, results, result });
        });

    });






};
exports.voirStade = async (req, res) => {

    const gestId = req.params.id;  // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: 'Voir Détails'
    };

    db.query('SELECT * FROM stade INNER JOIN equipe ON equipe.id_eq = stade.id_eq_std WHERE id_co_ge_eq=?', [gestId], (err, result) => {
        if (err) {
            console.log('erreue a avoir les donnes du stade' + err);
            return res.status(500).send('erreur sql avoir data du stade ');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log('erreur avoir pfp page edit joueur');
            }
            res.render('../views/Gestionnaire/detailsStade', { locals, gestId, results, result });
        });


    });






};
// get edit joueur

exports.editPlayer = async (req, res) => {
    gestId = req.params.id;
    playerId = req.params.idgest;
    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: 'Modifier Joueur'
    };
    // Exécute une requête SQL pour récupérer les détails du joueur avec l'ID spécifié
    db.query('SELECT id_jo,nom_jo, prenom_jo,photo_jo, nationalite_jo, poste_jo, num_mai_jo, date_naiss_jo, taille_jo, poids_jo,compte.email_co,mot_de_passe FROM joueur JOIN compte ON joueur.id_co_jo = compte.id_co AND id_jo=?;', [playerId], (err, result) => {
        if (err) {
            console.error('erreur sql id joueur' + err);
            return res.status(500).send('erreur sql id joueur');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log('erreur avoir pfp page edit joueur');
            }
            const id = result[0].id_jo;
            res.render('../views/Gestionnaire/modifier', { locals, id, results, result, gestId }); // Rend la vue avec les détails du joueur
        });




    });
};
// edit entraineur 
exports.editEntraineur = async (req, res) => {
    gestId = req.params.id;

    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: 'Modifier Entraineur '
    };

    db.query('SELECT * FROM entraineur JOIN compte ON entraineur.id_co_ent = compte.id_co JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent WHERE id_co_ge_eq = ?;', [gestId], (err, result) => {
        if (err) {
            console.error('erreur sql page modifier coach ' + err);
            return res.status(500).send('erreur sql page modifier coach');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log('erreur avoir pfp page edit joueur');
            }
            res.render('../views/Gestionnaire/modifierEntraineur', { locals, results, result, gestId }); // Rend la vue avec les détails du joueur

        });
        // console.log(result)




    });
};
exports.editStade = async (req, res) => {
    gestId = req.params.id;

    // Récupère l'ID du joueur depuis l'URL

    const locals = {
        title: 'Modifier Stade '
    };

    db.query('SELECT * FROM stade JOIN equipe ON stade.id_eq_std = equipe.id_eq  WHERE id_co_ge_eq = ?;', [gestId], (err, result) => {
        if (err) {
            console.error('erreur sql page modifier stade ' + err);
            return res.status(500).send('erreur sql page modifier stade');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.log('erreur avoir pfp page edit joueur');
            }
            res.render('../views/Gestionnaire/modifierStade', { locals, results, result, gestId });
        });






    });
};



// put edit joueur
exports.editpost = async (req, res) => {
    playerId = req.params.id;
    gestId = req.params.idgest;
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
    });
    console.log(req.body);
    
    db.query('UPDATE compte JOIN joueur ON compte.id_co = joueur.id_co_jo SET compte.id_type=?, compte.nom_utilisateur=?, compte.mot_de_passe=?, compte.email_co=? WHERE joueur.id_jo=?', [2, newjoueur.nom + ' ' + newjoueur.prenom, newjoueur.motdepasse, newjoueur.email, req.params.idgest], (err, result) => {
        if (err) {
            console.error('erreur creer compte ' + err);
            return res.status(500).send('erreur sql ajouter compte du joueur');
        }
        db.query('SELECT id_co FROM compte WHERE email_co =? ', [newjoueur.email], (err, resultid) => {
            if (err) {
                console.error('erreur avoir id  compte ' + err);
                return res.status(500).send('erreur sql avoir id compte du joueur');
            }
            if (req.file) {
                photo = req.file.filename;

                db.query('UPDATE joueur SET nom_jo=?, prenom_jo=?, photo_jo=?, nationalite_jo=?, poste_jo=?, num_mai_jo=?, date_naiss_jo=?, taille_jo=?, poids_jo=?,id_co_jo=? WHERE id_jo=?', [newjoueur.nom, newjoueur.prenom, photo, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.date, newjoueur.taille, newjoueur.poids, resultid[0].id_co, req.params.idgest], (err, result) => {
                    if (err) {
                        console.error('erreur modifier joueur' + err);
                        return res.status(500).send('erreur sql modifier joueur');
                    }
                });



            }
            else {
                db.query('UPDATE joueur SET nom_jo=?, prenom_jo=?, nationalite_jo=?, poste_jo=?, num_mai_jo=?, date_naiss_jo=?, taille_jo=?, poids_jo=?,id_co_jo=? WHERE id_jo=?', [newjoueur.nom, newjoueur.prenom, newjoueur.nationalite, newjoueur.poste, newjoueur.maillot, newjoueur.date, newjoueur.taille, newjoueur.poids, resultid[0].id_co, req.params.idgest], (err, result) => {
                    if (err) {
                        console.error('erreur modifier joueur' + err);
                        return res.status(500).send('erreur sql modifier joueur');
                    }
                });
            }

        });


    });


    await req.flash('info', 'Joueur Modifié !!');

    res.redirect(`/gererjoueurs/${playerId}`,);

};
exports.editpostEntraineur = async (req, res) => {
    const userId = req.params.id;

    try {
        const newentraineur = new Entraineur({
            nom: req.body.nom,
            prenom: req.body.prenom,
            nationalite: req.body.nationalite,
            date: req.body.date,
            email: req.body.email,
            motdepasse: req.body.motdepasse
        });

        db.query('UPDATE compte JOIN entraineur ON compte.id_co = entraineur.id_co_ent JOIN equipe ON equipe.id_eq =entraineur.id_eq_ent SET compte.id_type=?, compte.nom_utilisateur=?, compte.mot_de_passe=?, compte.email_co=? WHERE id_co_ge_eq=?', [2, newentraineur.nom + ' ' + newentraineur.prenom, newentraineur.motdepasse, newentraineur.email, userId], (err, result) => {
            if (err) {
                console.error('erreur creer compte ' + err);
                return res.status(500).send('erreur sql ajouter compte du joueur');
            }

            db.query('SELECT id_co FROM compte WHERE email_co =? ', [newentraineur.email], (err, resultid) => {
                if (err) {
                    console.error('erreur avoir id  compte ' + err);
                    return res.status(500).send('erreur sql avoir id compte du joueur');
                }

                if (req.file) { 
                    const photo = req.file.filename;
                    db.query('UPDATE entraineur JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent SET nom_ent = ?, prenom_ent = ?, img_ent=?,nationalite_ent = ?,date_naiss_ent = ? WHERE id_co_ge_eq = ?', [newentraineur.nom, newentraineur.prenom, photo, newentraineur.nationalite, newentraineur.date, userId], (err, result) => {
                        if (err) {
                            console.error('erreur modifier entraineur' + err);
                            return res.status(500).send('erreur sql modifier entraineur');
                        }

                        
                    });
                } else { 
                    db.query('UPDATE entraineur JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent SET nom_ent = ?, prenom_ent = ?, nationalite_ent = ?, date_naiss_ent = ? WHERE id_co_ge_eq = ?', [newentraineur.nom, newentraineur.prenom, newentraineur.nationalite, newentraineur.date, userId], (err, result) => {
                        if (err) {
                            console.error('erreur modifier entraineur' + err);
                            return res.status(500).send('erreur sql modifier entraineur');
                        }

                        // Handle success
                    });
                }
            });
        });

        req.flash('infoentraineur', 'Entraineur Modifié !!');
        res.redirect(`/monequipe/${userId}`);
    } catch (error) {
        console.error('Error in editpostEntraineur route:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.editpostStade = async (req, res) => {
    userId = req.params.id;

    const newstade = new Stade({
        nom: req.body.nom,
        ville: req.body.ville,
        adresse: req.body.adresse,
        ville: req.body.ville,
        capacite: req.body.capacite,
        date: req.body.date,

    });
    db.query('UPDATE stade  JOIN equipe AS eq1 ON stade.id_eq_std = eq1.id_eq  JOIN equipe AS eq2 ON eq1.id_eq = eq2.id_eq SET stade.nom_std = ?,  stade.ville_std = ?, stade.adresse_std = ?, stade.capacite_std = ?,stade.date_crt=? WHERE eq2.id_co_ge_eq = ? ', [newstade.nom, newstade.ville, newstade.adresse, newstade.capacite, newstade.date, userId], (err, result) => {
        if (err) {
            console.error('erreur modifier stade ' + err);
            return res.status(500).send('erreur sql modifier stade');
        }



    });






    await req.flash('editstade', 'Stade Modifié !!');

    res.redirect(`/monequipe/${userId}`,);

};


exports.supprimerJoueur = async (req, res) => {
    userId = req.params.idgest;

    db.query('SELECT id_co_jo FROM joueur WHERE id_jo=?', [req.params.id], (err, res) => {
        if (err) {
            console.error('erreur sql avoir id compte joueurs supprime' + err);
            return res.status(500).send('erreur sql avoir id compte joueurs supprime');
        }
        console.log(res);
        db.query('DELETE FROM joueur WHERE id_jo= ?', [req.params.id], (err, result) => {
            if (err) {
                console.error('erreur sql supp joueur' + err);
                return res.status(500).send('erreur sql supp joueur');
            }
            db.query('DELETE FROM compte WHERE id_co=?', [res[0].id_co_jo], (err, res) => {
                if (err) {
                    console.error('erreur sql supp compte joueurs' + err);
                    return res.status(500).send('erreur sql supp compte joueur');
                }
            });
        });

    });
    await req.flash('info', 'Joueur Supprime !!');
    res.redirect(`/gererjoueurs/${req.params.idgest}`);
};



exports.gererJoueur = async (req, res) => {
    const gestId = req.params.id;
    // console.log(gestId)
    const messages = await req.flash('info');
    const locals = {
        title: 'Gestion des Joueurs',
    };
    db.query('SELECT joueur.id_jo, joueur.nom_jo, joueur.prenom_jo,photo_jo, joueur.nationalite_jo, joueur.poste_jo, joueur.num_mai_jo, joueur.date_naiss_jo, joueur.taille_jo, joueur.poids_jo, compte.email_co FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq JOIN compte ON joueur.id_co_jo = compte.id_co WHERE equipe.id_co_ge_eq = ?; ', [gestId], (err, result) => {
        if (err) {
            console.error('erreur sql select data joueurs  ' + err);
            return res.status(500).send('erreur sql select data joueurs');
        }
        db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
            if (err) {
                console.error('erreur sql select pfp  ' + err);
                return res.status(500).send('erreur sql pfp');
            }

            // console.log(results)

            res.render('GestionnaireIndex', { locals, messages, results, gestId, result });
        });


    });




};

exports.search = async (req, res) => {
    gestId = req.params.id;
    let recherche = req.body.searchTerm;
    db.query('SELECT joueur.id_jo, joueur.nom_jo, joueur.prenom_jo,joueur.photo_jo FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq JOIN compte ON joueur.id_co_jo = compte.id_co WHERE (joueur.nom_jo LIKE ? OR joueur.prenom_jo LIKE ?) AND equipe.id_co_ge_eq = ?'
        , [`%${recherche}%`, `%${recherche}%`, gestId], (err, result) => {
            if (err) {
                console.error('erreur sql recherche  ' + err);
                return res.status(500).send('erreur sql recherche');
            }
            db.query('SELECT photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
                if (err) {
                    console.error('erreur sql avoir pfp page recherche  ' + err);
                    return res.status(500).send('erreur sql avoir pfp page recherche');
                }
                res.render('../views/Gestionnaire/recherche', { result, gestId, results });
            });
            // console.log(result);

        });

};


exports.monprofile = async (req, res) => {
    gestId = req.params.id;
    const message_err = await req.flash('info');
    const message_scc = await req.flash('info1');
    const locals = {
        title: 'Mon profile'
    };
    db.query('SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?', [gestId], (err, results) => {
        if (err) {
            console.error('erreur sql page profile  ' + err);
            return res.status(500).send('erreur sql page profile ');
        }
        db.query('SELECT nom_eq FROM equipe WHERE id_co_ge_eq=?', [gestId], (err, result) => {
            if (err) {
                console.error('erreur sql equipe page profile  ' + err);
                return res.status(500).send('erreur sql equipe page profile ');
            }
            res.render('../views/Gestionnaire/profile', { gestId, locals, result, results, message_err, message_scc });
        });




    });
};

exports.monprofilepost = async (req, res) => {
    const userId = req.params.id;
    const mdpactuel = req.body.mdpactuel;
    const nvmdp = req.body.nvmdp;


    const locals = {
        title: 'Mon profile'
    };


    const response = res;

    db.query('SELECT mot_de_passe, photo_profil FROM compte WHERE id_co=?', [userId], (err, result) => {
        if (err) {
            console.error('erreur sql avoir mdp   ' + err);
            return response.status(500).send('erreur sql avoir mdp ');
        }

        // Check if current password matches
        if (mdpactuel === result[0].mot_de_passe && !req.file) {
            // If current password matches and no file (profile picture) is uploaded
            photo_gest = result[0].photo_profil;
            // Update password
            db.query('UPDATE compte SET mot_de_passe=?,photo_profil=? WHERE id_co=?', [nvmdp, photo_gest, userId], (err, results) => {
                if (err) {
                    console.error('erreur sql changer mdp   ' + err);
                    return response.status(500).send('erreur sql changer mdp ');
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
                    console.error('erreur sql changer pfp   ' + err);
                    return response.status(500).send('erreur sql changer pfp ');
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


    const locals = { title: 'Mon equipe' };

    db.query('SELECT * FROM equipe WHERE id_co_ge_eq=? ', [gestId], (err, result) => {
        if (err) {
            console.error('erreur sql avoir donnee equipe   ' + err);
            return res.status(500).send('erreur sql avoir donnee equipe ');
        }

        db.query('SELECT * FROM entraineur JOIN equipe ON equipe.id_eq = entraineur.id_eq_ent WHERE equipe.id_co_ge_eq = ?', [gestId], (err, resu) => {
            if (err) {
                console.error('erreur sql avoir donnee entaineur   ' + err);
                return res.status(500).send('erreur sql avoir donnee entraineur ');
            }
            db.query('SELECT * FROM stade  JOIN equipe ON equipe.id_eq = stade.id_eq_std WHERE equipe.id_co_ge_eq = ? ', [gestId], (err, resultstd) => {
                if (err) {
                    console.error('erreur sql avoir donnee stade   ' + err);
                    return res.status(500).send('erreur sql avoir donnee stade ');
                }
                db.query('SELECT * FROM compte WHERE id_co=? ', [gestId], (err, results) => {
                    if (err) {
                        console.error('erreur sql avoir pfp  ' + err);
                        return res.status(500).send('erreur sql pfp ');
                    }
                    // console.log(results)
                    // console.log(result)
                    res.render('../views/Gestionnaire/equipe', { locals, results, resu, message_ent, message_stade, resultstd, result, message_editstade });
                });


            });


        });


    });
};
exports.addEntraineur = async (req, res) => {
    userId = req.params.id;
    const message_email = await req.flash('inf2');
    const locals = { title: 'Ajouter Entraineur ' };

    db.query('SELECT photo_profil FROM compte WHERE id_co=?', [userId], (err, results) => {
        if (err) {
            console.log('err avoir pfp' + err);
        }
        res.render('../views/Gestionnaire/add_entraineur', { locals, message_email, results });
    });


};

exports.postEntraineur = async (req, res) => {
    userId = req.params.id;
    const newentraineur = new Entraineur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nationalite: req.body.nationalite,
        date: req.body.date,
        email: req.body.email,
        motdepasse: req.body.motdepasse
    });


    db.query('SELECT COUNT(*) AS count FROM compte WHERE email_co = ?', [newentraineur.email], (err, result) => {
        if (err) {
            console.error('Erreur lors de la vérification de l\'email: ' + err);
            return res.status(500).send('Erreur lors de la vérification de l\'email');
        }
        const emailCount = result[0].count;
        if (emailCount > 0) {
            req.flash('inf2', 'Cet email existe déjà.');
            return res.redirect(`/ajouter_entraineur/${req.params.id}`);
        } else {
            // Email doesn't exist, proceed with insertion
            db.query('INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)', [3, `${newentraineur.nom} ${newentraineur.prenom}`, newentraineur.motdepasse, newentraineur.email], (err, result) => {
                if (err) {
                    console.error('Erreur lors de la création du compte: ' + err);
                    return res.status(500).send('Erreur lors de la création du compte');
                }
                db.query('SELECT id_eq FROM equipe WHERE id_co_ge_eq = ?', [userId], (err, resultideq) => {
                    if (err) {
                        console.error('Erreur sql lors de l\'obtention de l\'identifiant du equipe: ' + err);
                        return res.status(500).send('Erreur sql lors de l\'obtention de l\'identifiant de lequipe');
                    }
                    db.query('SELECT id_co FROM compte  WHERE email_co = ?', [newentraineur.email], (err, resultidco) => {
                        if (err) {
                            console.error('Erreur sql lors de l\'obtention de l\'identifiant du compte: ' + err);
                            return res.status(500).send('Erreur sql lors de l\'obtention de l\'identifiant du compte');
                        }
                        if (req.file) {
                            photo = req.file.filename;
                            db.query(' INSERT INTO entraineur ( nom_ent, prenom_ent, date_naiss_ent ,img_ent, nationalite_ent, id_eq_ent, id_co_ent) VALUES ( ?,?,?, ?,?, ?, ?);', [newentraineur.nom, newentraineur.prenom, newentraineur.date, photo, newentraineur.nationalite, resultideq[0].id_eq, resultidco[0].id_co], (err, result) => {
                                if (err) {
                                    console.error('Erreur lors de la création du entraineur: ' + err);
                                    return res.status(500).send('Erreur lors de la création du entraineur');
                                }
                                req.flash('infoentraineur', 'Entraineur ajouté !');
                                res.redirect(`/monequipe/${req.params.id}`);
                            });
                        }
                        else {
                            db.query(' INSERT INTO entraineur ( nom_ent, prenom_ent, date_naiss_ent , nationalite_ent, id_eq_ent, id_co_ent) VALUES ( ?,?, ?,?, ?, ?);', [newentraineur.nom, newentraineur.prenom, newentraineur.date, newentraineur.nationalite, resultideq[0].id_eq, resultidco[0].id_co], (err, result) => {
                                if (err) {
                                    console.error('Erreur lors de la création du entraineur sans photo: ' + err);
                                    return res.status(500).send('Erreur lors de la création du entraineur');
                                }
                                req.flash('infoentraineur', 'Entraineur ajouté !');
                                res.redirect(`/monequipe/${req.params.id}`);
                            });
                        }

                    });
                });
            });
        }
    });


};



exports.monstade = async (req, res) => {
    userId = req.params.id;
    const locals = { title: 'Mon equipe' };
    db.query('SELECT photo_profil FROM compte WHERE id_co=?', [userId], (err, results) => {
        if (err) {
            console.log('err avoir pfp' + err);
        }
        res.render('../views/Gestionnaire/ajouterStade', { locals, results });
    });
};



exports.postStade = async (req, res) => {
    userId = req.params.id;
    const newstade = new Stade({
        nom: req.body.nom,
        ville: req.body.ville,
        adresse: req.body.adresse,
        capacite: req.body.capacite,
        date: req.body.date
    });
    db.query(' SELECT id_eq FROM equipe WHERE equipe.id_co_ge_eq = ?', [userId], (err, result) => {
        if (err) {
            console.log('erreur sql avoir id equipe  ' + err);
            return res.status(500).send('erreur sql avoir id equipe ');
        }
        // console.log(res)
        db.query('INSERT INTO STADE (nom_std,ville_std,adresse_std,capacite_std,date_crt,id_eq_std) VALUES (?,?,?,?,?,?) ', [newstade.nom, newstade.ville, newstade.adresse, newstade.capacite, newstade.date, result[0].id_eq], (err, result) => {
            if (err) {
                console.log('erreur sql ajouter stade' + err);
                return res.status(500).send('erreur sql ajouter stade');
            }

        });
        req.flash('infostade', 'Stade ajouté !');
        res.redirect(`/monequipe/${req.params.id}`);
    });
};


exports.gerermatch = async (req, res) => {
    gestId = req.params.id;
    matchId = req.params.idmatch;

    db.query('SELECT * FROM compte  WHERE id_co=? ', [gestId], (err, results) => {
        if (err) {
            console.log('erreur sql avoir pfp page gestion match ' + err);
        }
        db.query('SELECT id_ma FROM `match` WHERE id_co_ge_ma=?', [gestId], (err, result) => {
            if (err) {
                console.log('erreur sql avoir id match page gestion match ' + err);
                return res.status(500).send('erreur sql avoir id match');
            }
            // console.log(result)
            if (result.length === 0) { res.render('../views/Gestionnaire/pas_daffectation', { results }); }
            else {
                res.redirect(`/match/${gestId}/${result[0].id_ma}`);
            }
        });
    });
};

exports.match = async (req, res) => {


    try {
        const message_carton_rouge = await req.flash('rouge');
        const message_carton_jaune = await req.flash('jaune');
        const penalty = await req.flash('penalty');
        const changement = await req.flash('changement');
        const message_but = await req.flash('but');

        const gestId = req.params.id;
        const matchId = req.params.idmatch;

        const results = await dbQuery('SELECT * FROM compte WHERE id_co=?', [gestId]);
        const result = await dbQuery('SELECT * FROM `match` WHERE id_co_ge_ma=?', [gestId]);
        const reseq = await dbQuery('SELECT * FROM equipe WHERE nom_eq IN (?,?)', [result[0].equipe_1, result[0].equipe_2]);

        const resjoeq1 = await dbQuery('SELECT * FROM joueur WHERE id_eq_jo =?', [reseq[1].id_eq]);
        const resjoeq2 = await dbQuery('SELECT * FROM joueur WHERE id_eq_jo =?', [reseq[0].id_eq]);

        const locals = {
            title: 'Gestion de match'
        };

        res.render('../views/Gestionnaire/gerermatch', { changement,penalty,locals, gestId, results, result, reseq, resjoeq1, resjoeq2, matchId, message_carton_rouge, message_carton_jaune, message_but });
    } catch (error) {
        console.error('Error in match route:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.but = async (req, res) => {

    gestId = req.params.idgest;
    matchId = req.params.idmatch;
    // console.log(req.body.joueur);

    

    try {

        const score = await dbQuery('UPDATE `match` SET score_eq1 = CASE WHEN equipe_1 = ? THEN score_eq1 + 1 ELSE score_eq1 END,  score_eq2 = CASE WHEN equipe_2 = ? THEN score_eq2 + 1 ELSE score_eq2 END  WHERE equipe_1 = ? OR equipe_2 = ?', [req.body.equipe, req.body.equipe, req.body.equipe, req.body.equipe]);
        const idequipe = await dbQuery('SELECT id_eq FROM equipe WHERE nom_eq=?', [req.body.equipe]);
        var maillotbuteur = parseInt(req.body.joueur[0].split('.')[0].trim());
        var maillotpasseur = parseInt(req.body.joueur[1].split('.')[0].trim());
        const buteur = await dbQuery('UPDATE `joueur` SET nbr_buts_jo = nbr_buts_jo + 1 WHERE num_mai_jo=? AND id_eq_jo=?', [maillotbuteur, idequipe[0].id_eq]);
        if (maillotpasseur) {
            const passeur = await dbQuery('UPDATE `joueur` SET nbr_passe_jo = nbr_passe_jo + 1 WHERE num_mai_jo=? AND id_eq_jo=?', [maillotpasseur, idequipe[0].id_eq]);
        }
        const new_score=await dbQuery('SELECT score_eq1,score_eq2 FROM `match` WHERE id_ma=? ',[matchId]) 
const clubs=await dbQuery("SELECT equipe_1,equipe_2 FROM `match` WHERE id_ma=? ",[matchId])

var equipe1=clubs[0].equipe_1
var equipe2=clubs[0].equipe_2
var equipes={equipe1,equipe2}
//  console.log(equipes);
const equipe_encaisse = req.body.equipe === equipes.equipe1 ? equipes.equipe2 : equipes.equipe1;
// console.log(equipe_encaisse);


         const but_p= await dbQuery('UPDATE equipe SET nbr_but_p_eq= nbr_but_p_eq+1 WHERE nom_eq=?',[req.body.equipe])
         const but_c= await dbQuery('UPDATE equipe SET nbr_but_c_eq= nbr_but_c_eq+1 WHERE nom_eq=?',[equipe_encaisse])
        
        req.flash('but', 'But Ajouté  ! ');
        res.redirect(`/match/${gestId}/${matchId}`);
        io.emit('score', { score1: new_score[0].score_eq1, score2: new_score[0].score_eq2 });

    } catch (error) {
        console.error('Error in match route:', error);
        res.status(500).send('Internal Server Error');
    }




};

exports.rouge = async (req, res) => {

    gestId = req.params.idgest;
    matchId = req.params.idmatch;
 

    try {
        const rouge = dbQuery('UPDATE `match` SET carton_r_ma = carton_r_ma + 1 WHERE id_ma = ?', [matchId]);
        const idequipe = await dbQuery('SELECT id_eq FROM equipe WHERE nom_eq=?', [req.body.equiperouge]);
        var maillot_joueur_rouge = parseInt(req.body.joueurrouge.split('.')[0].trim());
        console.log(maillot_joueur_rouge);
        const joueur_rouge = dbQuery('UPDATE joueur SET nbr_crt_rouge = nbr_crt_rouge + 1 WHERE num_mai_jo=? AND id_eq_jo=? ', [maillot_joueur_rouge, idequipe[0].id_eq]);
        text = req.body.joueurrouge;
        nom_joueur_rouge = text.match(/[a-zA-Z]+ [a-zA-Z]+/)[0];
        req.flash('rouge', `Carton ROUGE attribué  a ${nom_joueur_rouge} ! `);
        res.redirect(`/match/${gestId}/${matchId}`);
        io.emit('carton_rouge', { joueur: nom_joueur_rouge ,equipe:req.body.equiperouge});



    } catch (error) {
        console.error('Error in match route:', error);
        res.status(500).send('Internal Server Error');
    }




};
exports.jaune = async (req, res) => {

    gestId = req.params.idgest;
    matchId = req.params.idmatch;
    

    try {
        const jaune = dbQuery('UPDATE `match` SET carton_j_ma = carton_j_ma + 1 WHERE id_ma = ?', [matchId]);
        const idequipe = await dbQuery('SELECT id_eq FROM equipe WHERE nom_eq=?', [req.body.equipejaune]);
        var maillot_joueur_jaune = parseInt(req.body.joueurjaune.split('.')[0].trim());
        // console.log(maillot_joueur_jaune);
        const joueur_jaune = dbQuery('UPDATE joueur SET nbr_crt_jaune = nbr_crt_jaune + 1 WHERE num_mai_jo=? AND id_eq_jo=? ', [maillot_joueur_jaune, idequipe[0].id_eq]);
        text = req.body.joueurjaune;
        var nom_joueur_jaune = text.match(/[a-zA-Z]+ [a-zA-Z]+/)[0]; 

        req.flash('jaune', `Carton JAUNE attribué  a ${nom_joueur_jaune} ! `);
        res.redirect(`/match/${gestId}/${matchId}`);
        io.emit('carton_jaune', { joueur: nom_joueur_jaune , equipe:req.body.equipejaune});
        
    } catch (error) {
        console.error('Error in match route:', error);
        res.status(500).send('Internal Server Error');
    }




};


exports.voirAffectation = async (req, res) => {

    const gestId = req.params.idgest;


    const locals = {
        title: 'Voir Détails'
    };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    db.query('SELECT * FROM compte WHERE id_co=?', [gestId], (err, results) => {
        if (err) {
            console.log('err avoir pfp' + err);
        }


        db.query('SELECT * FROM `match` WHERE id_co_ge_ma=? AND date_ma > ?', [gestId, formattedDate], (err, result) => {
            if (err) {
                console.log('erreur avoir les donnes du match page affectaiotn' + err);

            }
            res.render('../views/Gestionnaire/affectation', { locals, gestId, results, result });
        });

    });
};




exports.penalty = async (req, res) => {
    gestId = req.params.idgest;
    matchId = req.params.idmatch;
    io.emit('penalty', { penalty: req.body.penalty});
    req.flash('penalty', `Penalty pour ${req.body.penalty} ! `);
    res.redirect(`/match/${gestId}/${matchId}`);
};

exports.fin = async (req, res) => {
     gestId = req.params.idgest;
     matchId = req.params.idmatch;

db.query("SELECT equipe_1 , equipe_2, score_eq1, score_eq2 FROM `match` WHERE id_ma=?",[matchId],(err,equipes) => {
    if(err){
        console.log('erreur avoir les donnes des equipes' + err);
    }
//    console.log(equipes);
   if(equipes[0].score_eq2>=equipes[0].score_eq1){
    db.query("UPDATE equipe SET m_gagner_eq=m_gagner_eq+1 WHERE nom_eq=?",[equipes[0].equipe_2],(err,result) => {
        if(err){
            console.log('erreur sql ajouter match gagné');
            
        }
        db.query("UPDATE equipe SET m_perdu_eq=m_perdu_eq+1 WHERE nom_eq=?",[equipes[0].equipe_1],(err,perdu)=>{
            if(err){
                console.log('erreur sql ajouter match perdu');
                
            }
        })
    })
   }if(equipes[0].score_eq1>=equipes[0].score_eq2){
    db.query("UPDATE equipe SET m_gagner_eq=m_gagner_eq+1 WHERE nom_eq=?",[equipes[0].equipe_1],(err,result) => {
        if(err){
            console.log('erreur sql ajouter match gagné');   
        }
        db.query("UPDATE equipe SET m_perdu_eq=m_perdu_eq+1 WHERE nom_eq=?",[equipes[0].equipe_2],(err,perdu)=>{
            if(err){
                console.log('erreur sql ajouter match perdu');
                
            }
        })
    })
   } 
})



     io.emit('fin');
     res.status(200); 
 
};


exports.changement = async (req, res) => {
    gestId = req.params.idgest;
    matchId = req.params.idmatch;

    io.emit('changement', { equipe: req.body.equipeChange,joueurIN:req.body.joueurIN,joueurOUT:req.body.joueurOUT});
    req.flash('Changement', `Changment pour ${req.body.equipeChange} !  `);
    res.redirect(`/match/${gestId}/${matchId}`);
  
    
};
































function dbQuery(sql, params) {
    return new Promise((resolve, reject) => {
        db.query(sql, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}
