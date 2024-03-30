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
            db.query("SELECT * FROM joueur WHERE id_eq_jo=?", [idequipe],(err, joueur) => {
                if(err) {
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
                
                
                res.render('../views/Visiteur/club', { club, ent, std, locals,joueur, layout: "./layouts/mainVisiteur.ejs" });
            })
                
        });
        });
    });
};



exports.classement = async (req, res) => {
    
    const locals = {
       title: "classement",
   };
    // db.query("SELECT * FROM equipe where id_eq=?",[idequipe], (err, club) => {
    //     if (err) {
    //         console.error("Erreur SQL : " + err);
    //         return res.status(500).send("Erreur SQL");
    //     }
        
        
     
       
        res.render('../views/Visiteur/classement', {  locals, layout: "./layouts/mainVisiteur.ejs" });
    // });
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
 