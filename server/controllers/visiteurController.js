const mysql = require('mysql');
const db = require('../config/db');




exports.page_accueil = async (req, res) => {
   const locals = {
    title: "Accueil",
    
 }
   res.render('../views/Visiteur/page_accueil',{ locals ,layout: "./layouts/mainVisiteur.ejs"})
}



exports.equipes = async (req, res) => {
   const locals = {
       title: "Clubs",
   };

   db.query("SELECT * FROM equipe", (err, club) => {
       if (err) {
           console.error("Erreur SQL : " + err);
           return res.status(500).send("Erreur SQL");
       }
       
       res.render('../views/Visiteur/equipes', { club, locals, layout: "./layouts/mainVisiteur.ejs" });
   });
};

exports.club = async (req, res) => {
    idequipe = req.params.id;
    const locals = {
        title: "equipe",
    };

    db.query("SELECT * FROM equipe WHERE id_eq=?", [idequipe], (err, club) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }

        db.query("SELECT * FROM entraineur WHERE id_eq_ent=?", [idequipe], (err, ent) => {
            if (err) {
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }

            db.query("SELECT * FROM stade WHERE id_eq_std=?", [idequipe], (err, std) => {
                if (err) {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }

                db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe,"gardien"],(err, gardien) => {
                    if(err) {
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }

                    db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe,"milieu de terrain"],(err, millieu) => {
                        if(err) {
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }

                        db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe,"attaquant"],(err, attaquant) => {
                            if(err) {
                                console.error("Erreur SQL : " + err);
                                return res.status(500).send("Erreur SQL");
                            }

                            db.query("SELECT nom_jo, prenom_jo, nbr_buts_jo FROM joueur WHERE id_eq_jo = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC ", [idequipe], (err, buteurs) => {
                                if(err) {
                                    console.error("Erreur SQL : " + err);
                                    return res.status(500).send("Erreur SQL");
                                }
                              db.query("SELECT nom_jo, prenom_jo, nbr_passe_jo FROM joueur WHERE id_eq_jo = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC" ,[idequipe],(err,passeurs)=>{
                                if(err){
                                     console.error("Erreur SQL : " + err);
                                    return res.status(500).send("Erreur SQL");
                                }
                                db.query("SELECT * FROM equipe WHERE id_eq=?",[idequipe],(err,classement)=>{
                                    if(err){
                                        console.error("Erreur SQL : " + err);
                                        return res.status(500).send("Erreur SQL");
                                    }
                                    res.render('../views/Visiteur/club', { club, ent, std, locals, classement,gardien, buteurs, passeurs,millieu, attaquant, layout: "./layouts/mainVisiteur.ejs" });
                                } )
                                
                              })

                                
                            });
                        });
                    });
                });
            });
        });
    });
};




exports.classement = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [1],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classement', { classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 
 exports.classementu19 = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [2],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu19', { classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.classementu17 = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [3],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu17', { classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.classementu15 = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [4],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu15', { classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 
 exports.calendrier = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
    // db.query("SELECT * FROM equipe where id_eq=?",[idequipe], (err, club) => {
    //     if (err) {
    //         console.error("Erreur SQL : " + err);
    //         return res.status(500).send("Erreur SQL");
    //     }
        
        
     
       
        res.render('../views/Visiteur/calendrier', {  locals, layout: "./layouts/mainVisiteur.ejs" });
    // });
 };
 exports.match = async (req, res) => {
    
    const locals = {
       title: "match",
   };
    // db.query("SELECT * FROM equipe where id_eq=?",[idequipe], (err, club) => {
    //     if (err) {
    //         console.error("Erreur SQL : " + err);
    //         return res.status(500).send("Erreur SQL");
    //     }
        
        
     
       
        res.render('../views/Visiteur/match', {  locals, layout: "./layouts/mainVisiteur.ejs" });
    // });
 };
 
 exports.actualite = async (req, res) => {
    
    const locals = {
       title: "actualite",
   };
    // db.query("SELECT * FROM equipe where id_eq=?",[idequipe], (err, club) => {
    //     if (err) {
    //         console.error("Erreur SQL : " + err);
    //         return res.status(500).send("Erreur SQL");
    //     }
        
        
     
       
        res.render('../views/Visiteur/actualite', {  locals, layout: "./layouts/mainVisiteur.ejs" });
    // });
 };
 
 exports.article = async (req, res) => {
    
    const locals = {
       title: "article",
   };
    // db.query("SELECT * FROM equipe where id_eq=?",[idequipe], (err, club) => {
    //     if (err) {
    //         console.error("Erreur SQL : " + err);
    //         return res.status(500).send("Erreur SQL");
    //     }
        
        
     
       
        res.render('../views/Visiteur/article', {  locals, layout: "./layouts/mainVisiteur.ejs" });
    // });
 };
 
 exports.joueur = async (req, res) => {
    idjoueur=req.params.id;
    
    const locals = {
       title: "joueur",
   };
    db.query("SELECT * FROM joueur where id_jo=?",[idjoueur], (err, joueur) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
     
        
        
     
       
        res.render('../views/Visiteur/joueur', { joueur, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.u19 = async (req, res) => {
    idjoueur=req.params.id;
    
    const locals = {
        title: "Clubs",
    };
 
    db.query("SELECT * FROM equipe WHERE id_dev_eq=?",[2], (err, club) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        res.render('../views/Visiteur/equipes', { club, locals, layout: "./layouts/mainVisiteur.ejs" });
    });

        
   
 };
 exports.u17 = async (req, res) => {
    idjoueur=req.params.id;
    
    const locals = {
        title: "Clubs",
    };
 
    db.query("SELECT * FROM equipe where id_dev_eq=?",[3], (err, club) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        res.render('../views/Visiteur/equipes', { club, locals, layout: "./layouts/mainVisiteur.ejs" });
    });

        
   
 };
 exports.u15 = async (req, res) => {
    idjoueur=req.params.id;
    
    const locals = {
        title: "Clubs",
    };
 
    db.query("SELECT * FROM equipe where id_dev_eq=?",[4], (err, club) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        res.render('../views/Visiteur/equipes', { club, locals, layout: "./layouts/mainVisiteur.ejs" });
    });

        
   
 };
 
 
 
 