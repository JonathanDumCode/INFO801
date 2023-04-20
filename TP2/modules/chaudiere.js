module.exports = class Chaudiere {
    constructor(env) {
        this.temperature = 60;
        this.environement = env;
        this.Fallume = false;
        this.allume = false;
        this.error = false;
        this.demarage = false;
    }
    update() {
        if ( this.allume) {
            this.environement.heat(this.temperature);
        }
        if (this.error) {
            this.allume = false;
            this.demarage = false;
            console.log("Chaudiere -> ERROR");
        }
        if (this.demarage) {
            if (this.couldown == 0) {
                this.allume = true;
                this.demarage = false;
                console.log("Chaudiere -> ON");
            } else {
                this.couldown--;
            }
        }
    }
    start() {
        if (this.Fallume && !this.demarage && !this.allume) {
            console.log("Chaudiere -> demarage");
            this.demarage = true;
            this.couldown = Math.floor(Math.random() * 5);
            //this.couldown = 3;
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
        if (this.error) {
            return "ERROR";
        }
        if (this.allume) {
            return "ON";
        }
        return "OFF";
    }
    getFStatus(){
        return this.Fallume;
    }
}