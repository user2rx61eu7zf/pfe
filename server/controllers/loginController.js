const mysql = require('mysql');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
const db = require('../config/db');



class user {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;

    }
}
// get page login 
exports.loginPage = async (req, res) => {


    const messages = await req.flash('info');
    const locals = {
        title: "Se connecter "
    }
    res.cookie('jwt', '', { maxAge: 1 }) // pour la deconexxion

    res.render('../views/Login/login', { locals, layout: './layouts/login.ejs', messages })



}
exports.sinscrire = async (req, res) => {


  
    const locals = {
        title: "Se connecter "
    }


    res.render('../views/Login/sinscrire', { locals, layout: './layouts/login.ejs' })



}


exports.comptePage = async (req, res) => {
    const newuser = new user({
        email: req.body.email,
        password: req.body.password
    });

    
    db.query('SELECT * FROM compte WHERE email_co = ?', [newuser.email], async (err, results) => {
        if (err) {
            console.error("Error getting user data during login: ", err);
            return res.status(500).send("Error getting user data during login");
        }

        if (!results[0] || newuser.password != results[0].mot_de_passe) {
            await req.flash('info', "Email or password is incorrect!");
            return res.redirect('/login');
        } else {
            const idType = results[0].id_type;
            const userId = results[0].id_co;
            const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES,
            });

            // Set JWT token as a cookie
            res.cookie('jwt', token, {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: true
            });

            // Render specific page based on id_type
            switch (idType) {
                case 1:
                    res.redirect(`/compteAdmin/${userId}`);
                    break;
                case 6:
                    res.redirect(`/compteGestionnaire/${userId}`);
                    break;
                // Add more cases for different id_type values if needed
            }
        }
    });
};



exports.comptegestionnaire = (req, res) => {
    const gestId = req.params.idgest;
    const locals = {
        title: "Gestionnaire"
    };

    db.query('SELECT c.nom_utilisateur ,c.photo_profil, e.nom_eq FROM compte c JOIN equipe e ON c.id_co = e.id_co_ge_eq WHERE c.id_co = ?', [gestId], (err, results) => {
        if (err) {
            console.error("Erreur SQLL : " + err);
            return res.status(500).send("Erreur SQL");
        }



        res.render('../views/Gestionnaire/homepageGestionnaire', { locals, gestId, results });
    });


};
exports.compteadmin = async (req, res) => {
    const userId = req.params.id;
    // Render the compte page with the user's ID
    res.render('../views/Admin/homepageAdmin', { userId, layout: './layouts/mainAdmin.ejs' })
}




exports.creer = (req, res) => {
    db.query("INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co) VALUES (?,?,?,?)", [5, req.body.username, req.body.password, req.body.email], (err, result) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }

        // Create a JWT token
        const token = jwt.sign({ id: req.body.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        // Set JWT token as a cookie
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        
    });
};
