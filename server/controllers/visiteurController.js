const mysql = require('mysql');
const db = require('../config/db');




    exports.page_accueil = async (req, res) => {
        const locals = {
            title: "Accueil",
        };

        db.query("SELECT * FROM article", (err, article) => {
            if (err) {
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }

            
    console.log(res.locals.user);

                res.render('../views/Visiteur/page_accueil', {
                    user: res.locals.user, // Pass the logged-in user to the view
                    article,
                    locals,
                    layout: "./layouts/mainVisiteur.ejs"
                });
        
        });
    };



exports.equipes = async (req, res) => {
   const locals = {
       title: "Clubs",
   };

   db.query("SELECT * FROM equipe WHERE id_dev_eq=?",[1], (err, club) => {
       if (err) {
           console.error("Erreur SQL : " + err);
           return res.status(500).send("Erreur SQL");
       }
      
       
       res.render('../views/Visiteur/equipes', {  user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
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
                                    db.query("SELECT classement.rank AS position FROM (SELECT id_eq, points_eq, ROW_NUMBER() OVER (ORDER BY points_eq DESC) AS rank FROM equipe WHERE id_dev_eq = ?) AS classement WHERE id_eq = ?;",[1,req.params.id],(err,placesenior)=>{
                                        if(err){
                                             console.error("Erreur SQL : " + err);
                                            return res.status(500).send("Erreur SQL");
                                        }
                                        console.log(placesenior);
                                        
                                        
                                        
                                        res.render('../views/Visiteur/club', { user: res.locals.user, placesenior,club, ent, std, locals, classement,gardien, buteurs, passeurs,millieu, attaquant, layout: "./layouts/mainVisiteur.ejs" });
                                    })

                                  
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
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_nul_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [1],(err, classement) => {
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
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_nul_eq,m_nul_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [2],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu19', {  user: res.locals.user,classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.classementu17 = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_nul_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [3],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu17', {  user: res.locals.user,classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.classementu15 = async (req, res) => {
    
    const locals = {
       title: "Classement",
   };
    db.query("SELECT nom_eq,logo_eq,m_gagner_eq,m_nul_eq,m_perdu_eq,nbr_but_c_eq,nbr_but_p_eq,points_eq FROM equipe WHERE id_dev_eq=? ORDER BY points_eq DESC", [4],(err, classement) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        res.render('../views/Visiteur/classementu15', { user: res.locals.user, classement , locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 
 exports.calendrier = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ?; ",[1], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        console.log(match);
        
        
     
       
        res.render('../views/Visiteur/calendrier', { match, user: res.locals.user, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.match = async (req, res) => {
    
    const locals = {
       title: "match",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2  FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2   WHERE `match`.id_ma = ?;",[req.params.id], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        console.log(match);
        
        
     
       
        res.render('../views/Visiteur/match', {  user: res.locals.user, match,locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 
 exports.actualite = async (req, res) => {
    
    const locals = {
       title: "actualite",
   };
    db.query("SELECT * FROM article ", (err, article) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        
     
       
       
        res.render('../views/Visiteur/actualite', {  article,user: res.locals.user, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 
 exports.article = async (req, res) => {
    
    const locals = {
       title: "article",
   };
    db.query("SELECT * FROM article where id_art=?",[req.params.id], (err, article) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        
     
       
        res.render('../views/Visiteur/article', {   user: res.locals.user,article,locals, layout: "./layouts/mainVisiteur.ejs" });
    });
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
     
        
        
     
       
        res.render('../views/Visiteur/joueur', {  user: res.locals.user,joueur, locals, layout: "./layouts/mainVisiteur.ejs" });
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
        
        res.render('../views/Visiteur/equipes', {  user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
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
        
        res.render('../views/Visiteur/equipes', {  user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
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
        
        res.render('../views/Visiteur/equipes', {  user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
    });

        
   
 };
 exports.stats = async (req, res) => {
   
    
    const locals = {
        title: "Statistiques",
    };
    
        db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[1],(err,senior)=>{
        if(err){
            console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
            }
            db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[2],(err,u19)=>{
                if (err)
                {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
                db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[3],(err,u17)=>
                { 
                    if(err){
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }
                    db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[4],(err,u15)=>{
                        if(err){
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }
                        res.render("../views/Visiteur/stats",{ user: res.locals.user,u19,u17,u15,locals,senior, layout: "./layouts/mainVisiteur.ejs" })
                    })
                    
                })
                
                
                
            })
            
           
        }
        
        
        
        )
         }

 exports.assists = async (req, res) => {
   
    const locals = {
        title: "Statistiques",
    };
    
        db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[1],(err,senior)=>{
        if(err){
            console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
            }
            console.log(senior);
            
            db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[2],(err,u19)=>{
                if (err)
                {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
                db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[3],(err,u17)=>
                { 
                    if(err){
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }
                    db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[4],(err,u15)=>{
                        if(err){
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }
                        res.render("../views/Visiteur/assists",{ user: res.locals.user,u19,u17,u15,locals,senior, layout: "./layouts/mainVisiteur.ejs" })
                    })
                    
                })
                
                
                
            })
            
           
        }
        
        
        
        )
    

        
   
 };

 exports.recherche = async (req, res) => {
    recherche=req.body.recherche;
    
    const locals = {
        title: "Clubs",
    };
    db.query('SELECT joueur.id_jo, joueur.nom_jo,nom_eq,logo_eq, joueur.prenom_jo,joueur.photo_jo FROM joueur JOIN equipe ON joueur.id_eq_jo = equipe.id_eq  WHERE (joueur.nom_jo LIKE ? OR joueur.prenom_jo LIKE ?) '
    , [`%${recherche}%`, `%${recherche}%`], (err, result) => {
        if (err) {
            console.error('erreur sql recherche  ' + err);
            return res.status(500).send('erreur sql recherche');
        }
        db.query('SELECT nom_eq, logo_eq, id_eq, abre_eq FROM equipe WHERE (nom_eq LIKE ? OR abre_eq LIKE ?)',[`%${recherche}%`,`%${recherche}%`],(err, resulteq) => {
            if(err)
            {
                console.error('erreur sql recherche  ' + err);
                return res.status(500).send('erreur sql recherche');
            }
           
            
            res.render('../views/Visiteur/recherche', {  user: res.locals.user,resulteq,result,recherche,locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
        
       
         })
 
  
       
    

        
   
 };
 exports.calendrieru19 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ?; ",[2], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        console.log(match);
        
        
     
       
        res.render('../views/Visiteur/calendrieru19', {  user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 exports.calendrieru17 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ?; ",[3], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        console.log(match);
        
        
     
       
        res.render('../views/Visiteur/calendrieru17', {  user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };


 exports.calendrieru15 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ?; ",[4], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        console.log(match);
        
        
     
       
        res.render('../views/Visiteur/calendrieru15', { user: res.locals.user, match, locals, layout: "./layouts/mainVisiteur.ejs" });
    });
 };
 