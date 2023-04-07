//Importation des modules
const express = require('express');


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

//Définition des constantes
const PORT = 3000;

//Définition des routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/www/index.html');
});


//lancement de l'application
app.listen(PORT, () => {
    console.log(`Example app listening at http://127.0.0.1:${PORT}`);
});

//lancement de la couroutine
setInterval(() => {
    chaudiere.update();
    environement.update();
    controleur.update();
}, 1000);