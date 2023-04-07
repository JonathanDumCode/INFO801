module.exports = class Chaudiere {
    constructor(env) {
        this.temperature = 60;
        this.environement = env;
        this.allume = false;
    }
    update() {
        if ( this.allume) {
            this.environement.heat(this.temperature);
        }
    }
    start() {
        console.log("Chaudiere -> Allumé");
        this.allume = true;
    }
    stop() {
        console.log("Chaudiere -> Eteint");
        this.allume = false;
    }
}