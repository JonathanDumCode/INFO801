module.exports = class Controleur {
    constructor(capteur, chaudiere) {
        this.capteur = capteur;
        this.chaudiere = chaudiere;
        this.temperatureCible = 20;
    }
    update() {
        console.log("Controlleur -> Temperature : " + this.capteur.getTemperature());
        if (this.capteur.getTemperature() < this.temperatureCible) {
            this.chaudiere.start();
        } else {
            this.chaudiere.stop();
        }
    }
    setTemperature(temp) {
        this.temperatureCible = temp;
    }
}