module.exports = class Chaudiere {
    constructor(env) {
        this.temperature = 60;
        this.environement = env;
        this.Fallume = true;
        this.allume = false;
    }
    update() {
        if ( this.allume) {
            this.environement.heat(this.temperature);
        }
    }
    start() {
        if (this.Fallume) {
            console.log("Chaudiere -> Allumé");
            this.allume = true;
        }
    }
    stop() {
        console.log("Chaudiere -> Eteint");
        this.allume = false;
    }

    Fstart() {
        this.Fallume = true;
    }
    Fstop() {
        console.log("Chaudiere -> Eteint");
        this.Fallume = false;
        this.allume = false;
    }
    getStatus(){   
        return this.allume;
    }
    getFStatus(){
        return this.Fallume;
    }
}