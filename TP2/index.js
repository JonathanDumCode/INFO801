//Importation des modules
const express = require('express');
const path = require('path');

//import des modules
const Environement = require('./modules/environement');
const Capteur = require('./modules/capteur');
const Chaudiere = require('./modules/chaudiere');
const Controleur = require('./modules/controleur');

//initialisation des modules

let capteur = new Capteur();
let environement = new Environement(capteur);
let chaudiere = new Chaudiere(environement);
let controleur = new Controleur(capteur, chaudiere);


//Création de l'application
const app = express();

app.use(express.static('www'));
app.use(express.json());

//Définition des constantes
const PORT = 8080;

//Définition des routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/www/index.html'));
});

app.get('/api/temp/cap', (req, res) => {
    res.json({temperature: capteur.getTemperature()});
});
app.get('/api/temp/env', (req, res) => {
    res.json({temperature: environement.getTemperature()});
});


app.get('/api/chaudiere/status', (req, res) => {
    res.json({status: chaudiere.getStatus()});
});
app.get('/api/chaudiere/Fstatus', (req, res) => {
    res.json({status: chaudiere.getFStatus()});
});
app.get('/api/chaudiere/ON', (req, res) => {
    controleur.chaudiere_Fstart();
    res.json({status: "ok"});
});
app.get('/api/chaudiere/OFF', (req, res) => {
    controleur.chaudiere_Fstop();
    res.json({status: "ok"});
});


app.get('/api/set/temp/:temp', (req, res) => {
    controleur.setTemperature(req.params.temp);
    res.json({status: "ok"});
});


app.get('/api/controleur/programer', (req, res) => {
    res.json({status: !controleur.estAutonome()});
});

app.get('/api/programer/ON', (req, res) => {
    controleur.autonomeOn();
    res.json({status: "ok"});
});
app.get('/api/programer/OFF', (req, res) => {
    controleur.autonomeOff();
    res.json({status: "ok"});
});
app.get('/api/horaire/:min/:max', (req, res) => {
    controleur.setHoraire(req.params.min,req.params.max);
    res.json({status: "ok"});
});



//lancement de l'application
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//lancement de la couroutine
setInterval(() => {
    chaudiere.update();
    environement.update();
    controleur.update();

    console.log("Chaudiere: " + chaudiere.getStatus()+ " | Environement: " + environement.getTemperature() + " | Capteur: " + capteur.getTemperature());
}, 1000);