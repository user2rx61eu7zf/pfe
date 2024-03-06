const mysql = require('mysql');
const db = require('../config/db');

exports.homepageAdmin = async (req, res) => {

    const locals = {
        title: "Admin"
    }

    res.render('../views/Admin/homepageAdmin', { locals, layout: './layouts/mainAdmin.ejs' })
}   