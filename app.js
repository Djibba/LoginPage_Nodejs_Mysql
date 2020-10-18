//Export modules
let express = require("express");
let session = require("express-session");
let bodyP = require("body-parser");

let app = express();

//Moteur de template
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'))
app.use(bodyP.urlencoded({ extended: false }))
app.use(bodyP.json())
app.use(session({
    secret: 'crudnodejs',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
app.use(require('./middlewares/middle'))

//Routes
app.get('/', function(request, response) {
    response.render('accueil')
})

//Routes CREATE
app.get('/create', function(request, response) {
    response.render('create');
})


app.get('/success', function(request, response) {
    response.render('success');
})

app.post('/create', function(request, response) {
    if ((request.body.nom === undefined || request.body.nom === '') && (request.body.prenom === undefined || request.body.prenom === '') && (request.body.numero === undefined || request.body.numero === '')) {
        request.middle('error', 'Les champs nom, prenom et numero ne doivent pas être vides')
        response.redirect('/create')
    } else if (request.body.nom === undefined || request.body.nom === '') {
        request.middle('error', 'Le champ nom ne doit pas être vide')
        response.redirect('/create')
    } else if (request.body.prenom === undefined || request.body.prenom === '') {
        request.middle('error', 'Le champ prenom ne doit pas être vide')
        response.redirect('/create')
    } else if (request.body.numero === undefined || request.body.numero === '') {
        request.middle('error', 'Le champ numero ne doit pas être vide')
        response.redirect('/create')
    } else {
        let req_sql = require('./moduls/request_sql');
        req_sql.create(request.body.nom, request.body.prenom, request.body.numero, request.body.email, request.body.adresse, function() {
            request.middle('success', 'Contact ' + request.body.prenom + ' ' + request.body.nom + ' enregstré avec succés !')
            response.redirect('/success')
        })
    }
})

//Routes READ
app.get('/read', function(request, response) {
    let req_sql = require('./moduls/request_sql');

    req_sql.show(function(contact) {
        response.render('read', { contact: contact })
    })
})

app.post('/read', function(request, response) {
    response.redirect('/read')
})

//Routes UPDATE

app.get('/update', function(request, response) {
    let req_sql = require('./moduls/request_sql');
    req_sql.showContact(request.params.id, function(contact) {
        response.render('updateAccueil', { contact: contact })
    })
})

app.get('/update/:id', function(request, response) {
    let req_sql = require('./moduls/request_sql');
    req_sql.showContact(request.params.id, function(contact) {
        response.render('update', { contact: contact })
    })
})

app.post('/update/:id', function(request, response) {
    let req_sql = require('./moduls/request_sql');
    if ((request.body.nom === undefined || request.body.nom === '') && (request.body.prenom === undefined || request.body.prenom === '') && (request.body.numero === undefined || request.body.numero === '')) {
        request.middle('error', 'Les champs nom, prenom et numero ne doivent pas être vides')
        response.redirect('/update/' + request.params.id)
    } else if (request.body.nom === undefined || request.body.nom === '') {
        request.middle('error', 'Le champ nom ne doit pas être vide')
        response.redirect('/update/' + request.params.id)
    } else if (request.body.prenom === undefined || request.body.prenom === '') {
        request.middle('error', 'Le champ prenom ne doit pas être vide')
        response.redirect('/update/' + request.params.id)
    } else if (request.body.numero === undefined || request.body.numero === '') {
        request.middle('error', 'Le champ numero ne doit pas être vide')
        response.redirect('/update/' + request.params.id)
    } else {
        req_sql.update(request.params.id, request.body.nom, request.body.prenom, request.body.numero, request.body.email, request.body.adresse, function() {
            request.middle('success', 'Contact n° ' + request.params.id + ' modifié avec succés')
            response.redirect('/success')
        })
    }
})

//Routes Delete
app.get('/delete/:id', function(request, response) {
    let req_sql = require('./moduls/request_sql');
    req_sql.show(function(contact) {
        response.render('update', { contact: contact })
    })
})

app.post('/delete/:id', function(request, response) {
    let req_sql = require('./moduls/request_sql');
    req_sql.delete(request.params.id, function() {
        request.middle('success', 'Contact n° ' + request.params.id + ' a été supprimé')
        response.redirect('/delete/' + request.params.id)
    })
})

module.exports = app;