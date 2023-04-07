module.exports = class Capteur {
    constructor() {
        this.temperature = null;
    }
    setTemperature(temp) {
        this.temperature = Math.floor(temp);
    }
    getTemperature() {
        return this.temperature;
    }
}