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


//lancement de l'application
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

//lancement de la couroutine
setInterval(() => {
    chaudiere.update();
    environement.update();
    controleur.update();
}, 1000);