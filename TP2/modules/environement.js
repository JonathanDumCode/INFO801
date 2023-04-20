module.exports = class Environement {
    constructor(capt) {
        this.temperatureExt = Math.random() * 25-10;
        this.temperatureInt = this.temperatureExt;
        this.capteur = capt;
    }
    calculerTemperature(t1,t2) {
        return (t1 + t2) / 2;
    }
    update() {
        this.temperatureInt = this.calculerTemperature(this.temperatureInt,this.temperatureExt);
        this.capteur.setTemperature(this.temperatureInt);
    }
    heat(temp) {
        this.temperatureInt = this.calculerTemperature(this.temperatureInt,temp);
    }
    getTemperature() {
        return Math.floor(this.temperatureExt);
    }
}
