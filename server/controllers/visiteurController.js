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

            
    // console.log(res.locals.user);
    
    
db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
    if(err){
        console.log('erreur avoir pfp page acceuil ');
    }
    //  console.log(pp);
    
    res.render('../views/Visiteur/page_accueil', {
        user: res.locals.user, // Pass the logged-in user to the view
        article,
        pp,
        locals,
        layout: "./layouts/mainVisiteur.ejs"
    });
})

              
        
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
       db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
        if(err){
            console.log('erreur avoir pfp page acceuil ');
        }
       
        
        res.render('../views/Visiteur/equipes', {
            user: res.locals.user, // Pass the logged-in user to the view
            club,
            pp,
            locals,
            layout: "./layouts/mainVisiteur.ejs"
        });
       })
      
       
       
   });
};

exports.club = async (req, res) => {
    idequipe = req.params.id;
    const locals = {
        title: "equipe",
    };
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

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
                db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe, "gardien"], (err, gardien) => {
                    if (err) {
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }
                    db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe, "milieu de terrain"], (err, millieu) => {
                        if (err) {
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }
                        db.query("SELECT * FROM joueur WHERE id_eq_jo=? AND poste_jo=?", [idequipe, "attaquant"], (err, attaquant) => {
                            if (err) {
                                console.error("Erreur SQL : " + err);
                                return res.status(500).send("Erreur SQL");
                            }
                            db.query("SELECT nom_jo, prenom_jo, nbr_buts_jo FROM joueur WHERE id_eq_jo = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC ", [idequipe], (err, buteurs) => {
                                if (err) {
                                    console.error("Erreur SQL : " + err);
                                    return res.status(500).send("Erreur SQL");
                                }
                                db.query("SELECT nom_jo, prenom_jo, nbr_passe_jo FROM joueur WHERE id_eq_jo = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC", [idequipe], (err, passeurs) => {
                                    if (err) {
                                        console.error("Erreur SQL : " + err);
                                        return res.status(500).send("Erreur SQL");
                                    }
                                    db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user], (err, pp) => {
                                        if (err) {
                                            console.log("erreur pp" + err)
                                        }
                                        db.query("SELECT * FROM equipe WHERE id_eq=?", [idequipe], (err, classement) => {
                                            if (err) {
                                                console.error("Erreur SQL : " + err);
                                                return res.status(500).send("Erreur SQL");
                                            }
                                            db.query("SELECT classement.rank AS position FROM (SELECT id_eq, points_eq, ROW_NUMBER() OVER (ORDER BY points_eq DESC) AS rank FROM equipe WHERE id_dev_eq = ?) AS classement WHERE id_eq = ?;", [1, req.params.id], (err, placesenior) => {
                                                if (err) {
                                                    console.error("Erreur SQL : " + err);
                                                    return res.status(500).send("Erreur SQL");
                                                }
                                                db.query("SELECT date_ma,horaire_ma ,equipe_1,equipe_2 FROM `match` WHERE equipe_1=?OR equipe_2=? AND date_ma >? ", [club[0].nom_eq, club[0].nom_eq, formattedDate], (err, prochmatch) => {
                                                    if (err) {
                                                        console.error("Erreur SQL : " + err);
                                                        return res.status(500).send("Erreur SQL");
                                                    }
                                                    console.log(prochmatch.length);
                                                    let matchData = [];
                                                    let logoData = [];
                                                    for (let index = 0; index < prochmatch.length; index++) {
                                                        db.query("SELECT logo_eq FROM equipe WHERE nom_eq IN (?,?) ", [prochmatch[index].equipe_1, prochmatch[index].equipe_2], (err, logo) => {
                                                            if (err) {
                                                                console.error("Erreur SQL : " + err);
                                                                return res.status(500).send("Erreur SQL");
                                                            }
                                                            logoData.push(logo);
                                                            matchData.push(prochmatch[index]);
                                                            console.log(prochmatch);
                                                            
                                                            
                                                            
                                                            if (index === prochmatch.length - 1) {
                                                                res.render('../views/Visiteur/club', {
                                                                    logo: logoData,
                                                                    prochmatch: matchData,
                                                                    pp,
                                                                    user: res.locals.user,
                                                                    placesenior,
                                                                    club,
                                                                    ent,
                                                                    std,
                                                                    locals,
                                                                    classement,
                                                                    gardien,
                                                                    buteurs,
                                                                    passeurs,
                                                                    millieu,
                                                                    attaquant,
                                                                    layout: "./layouts/mainVisiteur.ejs"
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        });
                                    });
                                });
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=> {
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            res.render('../views/Visiteur/classement', {pp, user:res.locals.user,classement , locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            res.render('../views/Visiteur/classementu19', {  pp,user: res.locals.user,classement , locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
       
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
if (err) {
    console.error("Erreur SQL : " + err);
         }
         res.render('../views/Visiteur/classementu17', { pp, user: res.locals.user,classement , locals, layout: "./layouts/mainVisiteur.ejs" });
        })
      
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            res.render('../views/Visiteur/classementu15', { pp,user: res.locals.user, classement , locals, layout: "./layouts/mainVisiteur.ejs" });
        })
      
    });
 };
 
 exports.calendrier = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma > ?; ",[1,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        // console.log(match);
        
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
          
            
            res.render('../views/Visiteur/calendrier', { pp,match, user: res.locals.user, locals, layout: "./layouts/mainVisiteur.ejs" });
        
        
        
     
       
       
    });
     })
 };


 exports.calendrier_precedent = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma < ?; ",[1,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        
        
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
          
            
            res.render('../views/Visiteur/calendrier_precedent', { pp,match, user: res.locals.user, locals, layout: "./layouts/mainVisiteur.ejs" });
        
        
        
     
       
       
    });
     })
 };
 exports.match = async (req, res) => {
    
    const locals = {
       title: "match",
   };
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2  FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2   WHERE `match`.id_ma = ?;",[req.params.id], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        } db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
                if(err) {
                        console.log("erreur pfp"+err);
                        
                    }
                    db.query("select date_ma,horaire_ma FROM `match` WHERE id_ma=?",[req.params.id],(err,result)=>{
                        if(err){
                            console.log(err);
                        }
                       
                        res.render('../views/Visiteur/match', { result,pp, user: res.locals.user, match,locals, layout: "./layouts/mainVisiteur.ejs" });
                        
                    })
                    
        })
        
        
     
       
      
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            res.render('../views/Visiteur/actualite', { pp, article,user: res.locals.user, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
        
     
       
       
       
    });
 };
 
 exports.article = async (req, res) => {
    const connexion = await req.flash('cnx');
    idArticle = req.params.id;
    const locals = {
       title: "article",
   };
    db.query("SELECT * FROM article where id_art=?",[req.params.id], (err, article) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            db.query("SELECT COUNT (id_art_com) FROM  commentaire WHERE id_art_com=?",[req.params.id],(err,nbrarticle)=>{
                if(err){
                    console.log('erreur sql avoir nombre de commentaire '+err);
                }
                db.query("SELECT commentaire.description_com,date_com, commentaire.id_vis_com, compte.nom_utilisateur,compte.photo_profil FROM commentaire JOIN visiteur ON commentaire.id_vis_com = visiteur.id_vis  JOIN compte ON visiteur.id_compte_vis = compte.id_co WHERE commentaire.id_art_com = ?;  ",[req.params.id],(err,description)=>{
                    if(err){
                        console.log('erreur sql avoir description de commentaire '+err);
                    } 
                    console.log(description);
                    res.render('../views/Visiteur/article', {  connexion, description,nbrarticle,idArticle,pp,user: res.locals.user,article,locals, layout: "./layouts/mainVisiteur.ejs" });
                })
               
            })
           
        })
        
        
     
       
       
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            res.render('../views/Visiteur/joueur', {  pp,user: res.locals.user,joueur, locals, layout: "./layouts/mainVisiteur.ejs" });
            
        })
        
        
     
        
        
     
       
       
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            
        res.render('../views/Visiteur/equipes', {  pp,user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
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
        } db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            
        res.render('../views/Visiteur/equipes', {  pp,user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
        
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.log('erreur avoir pfp page acceuil ');
            }
            
        res.render('../views/Visiteur/equipes', {  pp,user: res.locals.user,club, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
        
        
    });

        
   
 };
 exports.stats = async (req, res) => {
   
    
    const locals = {
        title: "Statistiques",
    };
    
        db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo ,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[1],(err,senior)=>{
        if(err){
            console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
            }
            db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[2],(err,u19)=>{
                if (err)
                {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
                db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[3],(err,u17)=>
                { 
                    if(err){
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }
                    db.query("SELECT joueur.nbr_buts_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_buts_jo IS NOT NULL ORDER BY nbr_buts_jo DESC",[4],(err,u15)=>{
                        if(err){
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }
                        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
                            if(err)
                            {
                                console.error("Erreur SQL : " + err);
                                return res.status(500).send("Erreur SQL");
                            }
                            res.render("../views/Visiteur/stats",{ pp,user: res.locals.user,u19,u17,u15,locals,senior, layout: "./layouts/mainVisiteur.ejs" })
                        })
                     
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
    
        db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[1],(err,senior)=>{
        if(err){
            console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
            }
    
            
            db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[2],(err,u19)=>{
                if (err)
                {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
                db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[3],(err,u17)=>
                { 
                    if(err){
                        console.error("Erreur SQL : " + err);
                        return res.status(500).send("Erreur SQL");
                    }
                    db.query("SELECT joueur.nbr_passe_jo ,joueur.nom_jo,joueur.prenom_jo,logo_eq FROM joueur JOIN equipe ON equipe.id_eq = joueur.id_eq_jo WHERE equipe.id_dev_eq = ? AND nbr_passe_jo IS NOT NULL ORDER BY nbr_passe_jo DESC",[4],(err,u15)=>{
                        if(err){
                            console.error("Erreur SQL : " + err);
                            return res.status(500).send("Erreur SQL");
                        }
                        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
                            if(err)
                            {
                                console.error("Erreur SQL : " + err);
                                return res.status(500).send("Erreur SQL");
                            }
                            res.render("../views/Visiteur/assists",{ pp,user: res.locals.user,u19,u17,u15,locals,senior, layout: "./layouts/mainVisiteur.ejs" })
                        })
                       
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
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma > ?; ",[2,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            console.log(pp);
            
            res.render('../views/Visiteur/calendrieru19', { pp,user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
    
        
        
     
       
       
    });
 };

 exports.calendrier_precedent_u19 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma < ?; ",[2,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            console.log(pp);
            
            res.render('../views/Visiteur/calendrier_precedent_u19', { pp,user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
    
        
        
     
       
       
    });
 };
 exports.calendrier_precedent_u17 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma < ?; ",[3,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            console.log(pp);
            
            res.render('../views/Visiteur/calendrier_precedent_u17', { pp,user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
    
        
        
     
       
       
    });
 };
 exports.calendrier_precedent_u15 = async (req, res) => {
    
    const locals = {
       title: "Calendrier",
   };
   const currentDate = new Date();
   const formattedDate = currentDate.toISOString().split('T')[0];
    db.query("SELECT `match`.*, equipe1.logo_eq AS logo_eq_1, equipe2.logo_eq AS logo_eq_2, stade.nom_std FROM `match` JOIN equipe AS equipe1 ON equipe1.nom_eq = `match`.equipe_1 JOIN equipe AS equipe2 ON equipe2.nom_eq = `match`.equipe_2 JOIN stade ON stade.id_std = `match`.id_std_ma WHERE `match`.id_div_ma = ? AND date_ma < ?; ",[4,formattedDate], (err, match) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            console.log(pp);
            
            res.render('../views/Visiteur/calendrier_precedent_u15', { pp,user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
    
        
        
     
       
       
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err){
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            res.render('../views/Visiteur/calendrieru17', { pp, user: res.locals.user,match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })

        
        
     
       
      
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
        db.query("SELECT photo_profil FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
            if(err)
            {
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            res.render('../views/Visiteur/calendrieru15', { pp,user: res.locals.user, match, locals, layout: "./layouts/mainVisiteur.ejs" });
        })
       
        
        
     
       
       
    });
 };
 

 exports.profil = async (req, res) => {
    const message_err = await req.flash('info');
    const message_scc = await req.flash('info1');
    const locals = {
        title: "Mon profile",
    };
    db.query("SELECT * FROM compte WHERE nom_utilisateur=? OR id_co=?",[res.locals.user,res.locals.user],(err,pp)=>{
        if(err){
            console.log('erreur avoir pfp page acceuil ');
        }
        
        
        res.render('../views/Visiteur/profil', {
            user: res.locals.user, // Pass the logged-in user to the view
            pp,
            locals,
            layout: "./layouts/mainVisiteur.ejs",
            message_err,
            message_scc
        });
    })
    
        
      
    
 };
 exports.profilpost = async (req, res) => {
    
    const mdpactuel = req.body.mdpactuel;
    const nvmdp = req.body.nvmdp;


    const locals = {
        title: 'Mon profile'
    };


    const response = res;

    db.query('SELECT mot_de_passe, photo_profil FROM compte WHERE nom_utilisateur=?', [res.locals.user], (err, result) => {
        if (err) {
            console.error('erreur sql avoir mdp   ' + err);
            return response.status(500).send('erreur sql avoir mdp ');
        }

        
        if (mdpactuel === result[0].mot_de_passe && !req.file) {
            
            photo_gest = result[0].photo_profil;
           
            db.query('UPDATE compte SET mot_de_passe=?,photo_profil=? WHERE nom_utilisateur=?', [nvmdp, photo_gest, res.locals.user], (err, results) => {
                if (err) {
                    console.error('erreur sql changer mdp   ' + err);
                    return response.status(500).send('erreur sql changer mdp ');
                } else {

                    req.flash('info1', 'Mot de passe changé avec succès');
                    return response.redirect(`/profil`);
                }
            });
        } else if (!req.body.mdpactuel && !req.file) {
           

            return response.redirect(`/profil`);
        } else if (!req.body.mdpactuel && req.file) {
            
            photo_gest = req.file.filename;
            db.query('UPDATE compte SET photo_profil=? WHERE nom_utilisateur=? ', [photo_gest, res.locals.user], (err, res) => {
                if (err) {
                    console.error('erreur sql changer pfp   ' + err);
                    return response.status(500).send('erreur sql changer pfp ');
                }
                return response.redirect(`/profil`);
            });
        } else {
         
            req.flash('info', 'Mot de passe actuel est faux');
            return response.redirect(`/profil`);
        }
    });

};

exports.commentaire = async (req, res) => {
console.log(res.locals.user);

    const currentDate = new Date();
   db.query("SELECT id_co FROM compte WHERE nom_utilisateur = ?",[res.locals.user],(err, result)=>{
    if(err){
        console.error('erreur sql  ' + err);
        return res.status(500).send('erreur sql  ');
    }
    
    
    if(result.length > 0){
        db.query("SELECT id_vis FROM visiteur WHERE id_compte_vis=?",[result[0].id_co],(err, results)=>{
            if(err){
                console.error('erreur sql  ' + err);
                return res.status(500).send('erreur sql  ');
            }
            db.query("INSERT INTO commentaire (id_art_com,id_vis_com,description_com,date_com) VALUES(?,?,?,?) ",[req.params.id,results[0].id_vis,req.body.commentaire,currentDate],(err,com)=>{
                if(err){
                    console.error('erreur sql  ' + err);
                    return res.status(500).send('erreur sql  ');
                }
            })
            
            console.log(results);
            res.redirect(`/article/${req.params.id}`)
        })
    }else{
        req.flash('cnx', 'Veuillez vous connectez pour ecrire un commentaire');
                    return res.redirect(`/article/${req.params.id}`);
    }

    
   
    
    
   })
    
    
}