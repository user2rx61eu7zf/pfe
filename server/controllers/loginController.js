const mysql = require('mysql');
const db = require('../config/db');
const jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')



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

exports.comptePage = async (req, res) => {
    const newuser = new user({
        email: req.body.email,
        password: req.body.password
    });

    // Query the database to get the user with the provided email
    db.query('SELECT * FROM compte WHERE email_co = ?', [newuser.email], async (err, result) => {
        if (err) {
            console.error("Error getting user data during login: ", err);
            return res.status(500).send("Error getting user data during login");
        }

        if (!result[0] || newuser.password != result[0].mot_de_passe) {
            await req.flash('info', "Email or password is incorrect!");
            return res.redirect('/login');
        } else {
            const idType = result[0].id_type;
            const userId = result[0].id_co;
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
    const userId = req.params.id;
    const locals = {
        title: "Gestionnaire"
    };

    db.query('SELECT c.nom_utilisateur, e.nom_eq FROM compte c JOIN equipe e ON c.id_co = e.id_co_ge_eq WHERE c.id_co = ?', [userId], (err, results) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }



        res.render('../views/Gestionnaire/homepageGestionnaire', { locals, userId, results });
    });


};
exports.compteadmin = async (req, res) => {
    const userId = req.params.id;
    // Render the compte page with the user's ID
    res.render('../views/Admin/homepageAdmin', { userId: userId, layout: './layouts/mainAdmin.ejs' })
}

