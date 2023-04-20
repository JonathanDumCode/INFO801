module.exports = class Controleur {
    constructor(capteur, chaudiere) {
        this.capteur = capteur;
        this.chaudiere = chaudiere;

        this.autonome = true;
        this.horaireMin = -1;
        this.horaireMax = -1;
        
        this.chaudiereShutdown = false;
        this.temperatureCible = 20;
        this.chaudiereError = false;

        this.chaudiereLancement = -1;
        this.chaudiereCouldown = 0;

    }
    update() {
        if (this.autonome) {
            if (this.capteur.getTemperature() < this.temperatureCible) {
                if (!this.chaudiereError && !this.chaudiereShutdown && this.chaudiereLancement == -1) {
                    this.chaudiere.Fstart();
                    this.chaudiere.start();
                    this.chaudiereLancement = 5;
                }
                
            } else {
                this.chaudiere.stop();
                if (this.chaudiereLancement != -1) {
                    this.chaudiereLancement = -1;
                }

            }
        }else{
            if(this.horaireMin != -1 && this.horaireMax != -1){
                let date = new Date();
                let heure = date.getHours();
                let minute = date.getMinutes();
                if (heure >= this.horaireMin[0] && heure <= this.horaireMax[0]) {
                    if (heure == this.horaireMin[0] && minute < this.horaireMin[1]) {
                        this.chaudiere.stop();
                    }else if (heure == this.horaireMax[0] && minute > this.horaireMax[1]) {
                        this.chaudiere.stop();
                    }else{
                        if (!this.chaudiereError && !this.chaudiereShutdown && this.chaudiereLancement == -1) {
                            this.chaudiere.Fstart();
                            this.chaudiere.start();
                            this.chaudiereLancement = 5;
                        }
                    }
                }else{
                    this.chaudiere.stop();
                }
            }
        }
        if (this.chaudiereLancement > 0) {
            this.chaudiereLancement--;
        }
        if (this.chaudiereLancement == 0) {
            this.chaudiereLancement = -1;
            if (this.chaudiere.allume) {
                this.chaudiereError = false; 
                this.chaudiere.error = false;  
            }else{
                this.chaudiereError = true;
                this.chaudiere.error = true;
                this.chaudiere.stop();
                this.chaudiereCouldown = 10;
            }
        }
        if (this.chaudiereError) {
            if(this.chaudiereCouldown > 0){
                this.chaudiereCouldown--;
            }else{
                this.chaudiereError = false;
                this.chaudiere.error = false;
            }
        }
        
    }
    setTemperature(temp) {
        this.temperatureCible = temp;
    }
    chaudiere_Fstart() {
        if (this.chaudiereError == false) {
            this.chaudiereShutdown = false;
        }
        
    }
    chaudiere_Fstop() {
        this.chaudiereShutdown = true;
        this.chaudiere.Fstop();
    }
    
    estAutonome() {
        return this.autonome;
    }

    autonomeOn() {
        this.autonome = true;
    }
    autonomeOff() {
        this.autonome = false;
    }

    setHoraire(min, max) {
        this.horaireMin = min.split(":");
        this.horaireMin[0] = parseInt(this.horaireMin[0]);
        this.horaireMin[1] = parseInt(this.horaireMin[1]);
        this.horaireMax = max.split(":");
        this.horaireMax[0] = parseInt(this.horaireMax[0]);
        this.horaireMax[1] = parseInt(this.horaireMax[1]);
    }

}