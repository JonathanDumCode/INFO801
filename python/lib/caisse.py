class caisse():
    def __init__(self, bdd):
        self.bdd = bdd


    def predictionCarburant(self,amount, carburant):
        return int(float(amount)/ (self.bdd.getCarburantPrice(carburant)))
    
    def addCoupon(self,amount, carburant):
        return self.bdd.addCoupon(amount, carburant)