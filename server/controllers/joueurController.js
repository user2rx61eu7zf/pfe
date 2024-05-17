const mysql = require("mysql");
const jwt = require("jsonwebtoken");
var cookieParser = require("cookie-parser");
const db = require("../config/db");


exports.profile = async (req, res) => {
    userId = req.params.id;
    const message_err = await req.flash("info");
    const message_scc = await req.flash("info1");
    const locals = {
      title: "Mon profile",
    };
    db.query(
      "SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("erreur sql page profile  " + err);
          return res.status(500).send("erreur sql page profile ");
        }
       
            res.render("../views/Joueur/profileJoueur", {
              userId,
              locals,
              results,
              message_err,
              message_scc,
              layout: "./layouts/mainJoueur.ejs",
            });
          }
        
      
    );
};

exports.profilepost = async (req, res) => {
    const userId = req.params.id;
    const mdpactuel = req.body.mdpactuel;
    const nvmdp = req.body.nvmdp;
  
    const locals = {
      title: "Mon profile",
    };
  
    const response = res;
  
    db.query(
      "SELECT mot_de_passe, photo_profil FROM compte WHERE id_co=?",
      [userId],
      (err, result) => {
        if (err) {
          console.error("erreur sql avoir mdp   " + err);
          return response.status(500).send("erreur sql avoir mdp ");
        }
  
        // Check if current password matches
        if (mdpactuel === result[0].mot_de_passe && !req.file) {
          // If current password matches and no file (profile picture) is uploaded
          photo_gest = result[0].photo_profil;
          // Update password
          db.query(
            "UPDATE compte SET mot_de_passe=?,photo_profil=? WHERE id_co=?",
            [nvmdp, photo_gest, userId],
            (err, results) => {
              if (err) {
                console.error("erreur sql changer mdp   " + err);
                return response.status(500).send("erreur sql changer mdp ");
              } else {
                req.flash("info1", "Mot de passe changé avec succès");
                return response.redirect(`/profileJoueur/${userId}`);
              }
            }
          );
        } else if (!req.body.mdpactuel && !req.file) {
          // If neither the current password nor the file (profile picture) is updated
  
          return response.redirect(`/monprofile/${userId}`);
        } else if (!req.body.mdpactuel && req.file) {
          // If only the profile picture is being changed
          photo_gest = req.file.filename;
          db.query(
            "UPDATE compte SET photo_profil=? WHERE id_co=?",
            [photo_gest, userId],
            (err, res) => {
              if (err) {
                console.error("erreur sql changer pfp   " + err);
                return response.status(500).send("erreur sql changer pfp ");
              }
              return response.redirect(`/profileJoueur/${userId}`);
            }
          );
        } else {
          // If the current password is incorrect
          req.flash("info", "Mot de passe actuel est faux");
          return response.redirect(`/profileJoueur/${userId}`);
        }
      }
    );
  };

  exports.entrainement = async (req, res) => {
   userId = req.params.id;
   const locals = {
    title: "Mes entrainements",
  };
   db.query(
    "SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?",
    [userId],
    (err, results) => {
      if (err) {
        console.error("erreur sql page profile  " + err);
        return res.status(500).send("erreur sql page profile ");
      }
      
     db.query("SELECT id_eq_jo FROM joueur WHERE id_co_jo=?" ,[userId],(err,id_eq)=>{
        if(err){
            console.log('erreur avoir les entrainement'+err);
            
        }
        db.query("SELECT id_co_ge_eq FROM equipe WHERE id_eq=?" ,[id_eq[0].id_eq_jo],(err,id_gest)=>{
        if(err){
            console.log('erreur avoir id gest'+err);
        }
        db.query("SELECT entrainement.*, stade.* FROM entrainement  JOIN stade ON entrainement.lieu_ent=stade.id_std WHERE  id_gest_ent=?",[id_gest[0].id_co_ge_eq],(err,ent)=>{
            if(err){
                console.log('erreur avoir entrainement'+err);
            }
        console.log(ent);
          res.render("../views/Joueur/entrainement", {
            userId,
            locals,
            results,
            ent,
            layout: "./layouts/mainJoueur.ejs",
          });
        })
        
        })
        
        
        
      
     })
       
        }
      
    
  );

};

exports.matchs = async (req, res) => {
    userId = req.params.id;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    const locals = {
      title: "Mes matchs",
    };
    db.query(
      "SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("erreur sql page profile  " + err);
          return res.status(500).send("erreur sql page profile ");
        }
        db.query("SELECT id_eq_jo FROM joueur WHERE id_co_jo=?",[userId],(err,id_eq)=>{
            if(err){
                console.log('erreur avoir id eq'+err);
            }
            
            db.query("SELECT nom_eq FROM `equipe` WHERE id_eq=?", [id_eq[0].id_eq_jo], (err, nom_eq) => {
                if (err) {
                    console.log("Erreur avoir nom de l'equipe: " + err);
                }
                
                
            db.query("SELECT * FROM `match`  JOIN stade ON stade.id_std = `match`.id_std_ma  WHERE equipe_1 = ? OR equipe_2 =? AND date_ma > ?", [nom_eq[0].nom_eq, nom_eq[0].nom_eq,formattedDate],(err,matchs)=>{
                    if(err){
                        console.log('erreur avoir match'+err)   
                    }
                 
                console.log(matchs);
                res.render("../views/Joueur/matchs", {
                    userId,
                    locals,
                    matchs,
                    results,
                    layout: "./layouts/mainJoueur.ejs",
                  });
                } )
                
            })
            
        })
       
           
          }
        
      
    );
};


exports.stats = async (req, res) => {
    userId = req.params.id;
    
    const locals = {
      title: "Mes statistiques",
    };
    db.query(
      "SELECT nom_utilisateur,email_co,photo_profil FROM compte WHERE id_co=?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("erreur sql page profile  " + err);
          return res.status(500).send("erreur sql page profile ");
        }
        db.query("select * from joueur where id_co_jo=?",[req.params.id],(err,stats)=> {
            if(err){
                console.log('erreur sql avoir les stats'+err);
                
            }
            console.log(stats);
            res.render("../views/Joueur/stats", {
                userId,
                locals,
                results,
                stats,
                layout: "./layouts/mainJoueur.ejs",
              });
            
        })
       
           
          }
        
      
    );
};