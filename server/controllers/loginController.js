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

exports.logout = async (req, res) => {


   
  
    res.cookie('jwt', '', { maxAge: 1 }) // pour la deconexxion

    res.redirect(`/`)


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

        if (!results[0] || newuser.password !== results[0].mot_de_passe) {
            await req.flash('info', "Email or password is incorrect!");
            return res.redirect('/login');
        } else {
            const idType = results[0].id_type;
            const userId = results[0].id_co;
            const userName = results[0].nom_utilisatuer;

            // Common options for JWT token
            const jwtOptions = {
                expiresIn: process.env.JWT_EXPIRES,
            };

            // Create JWT token based on idType
           // Create JWT token based on idType
let token;
switch (idType) {
    case 1:
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET, jwtOptions);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
        res.redirect(`/compteAdmin/${userId}`);
        break;
    case 6:
        token = jwt.sign({ id: userId }, process.env.JWT_SECRET, jwtOptions);
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
        res.redirect(`/compteGestionnaire/${userId}`);
        break;
    case 5:
        const userName = results[0].nom_utilisateur; 
        token = jwt.sign({ id: userName }, process.env.JWT_SECRET, jwtOptions); // Use userId instead of username
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        });
        res.redirect(`/`);
        break;
    default:
        res.redirect('/');
        break;
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
    res.render('../views/Admin/homepageAdmin', { userId, layout: './layouts/mainAdmin.ejs' })
}




exports.creer = (req, res) => {
    db.query("INSERT INTO compte (id_type, nom_utilisateur, mot_de_passe, email_co, photo_profil) VALUES (?,?,?,?,?)", [5, req.body.username, req.body.password, req.body.email,req.file.filename], (err, result) => {
        if (err) {
            console.error("Erreur SQL : " + err);
            return res.status(500).send("Erreur SQL");
        }
        db.query("SELECT id_co FROM compte WHERE email_co = ?",[req.body.email], (err, result)=> {
            if (err) {
                console.error("Erreur SQL : " + err);
                return res.status(500).send("Erreur SQL");
            }
            db.query("INSERT INTO visiteur (id_compte_vis) VALUES (?) " ,[result[0].id_co],(err,results)=> {
                if(err){
                    console.error("Erreur SQL : " + err);
                    return res.status(500).send("Erreur SQL");
                }
            })
        })
        

        const token = jwt.sign({ id: req.body.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES,
        });

        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        });

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) { 
                console.log(err.message);
                res.locals.user = null;
            } else {
                res.locals.user = decodedToken.id; 
            }
            console.log(res.locals.user);
            res.redirect(`/?user=${encodeURIComponent(user)}`);

        });
    });
};
