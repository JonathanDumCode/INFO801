

class pump():
    def __init__(self, bdd):
        self.bdd = bdd

    def verificationCode(self, code):
        return self.bdd.findCoupon(code) != -1
    
    def getCode(self, code):
        return self.bdd.findCoupon(code)

    def pumpGas(self, nblitre , code):
        carburant = self.bdd.getCarburant(code)
        if carburant == -1:
            return False
        else:
            price = self.bdd.getCarburantPrice(carburant)
            amount = float(price) * float(nblitre)
            coupon = self.bdd.findCoupon(code)
            if (float(coupon['amount']) < amount):
                return False
            else:
                self.bdd.bebitCoupon(code, amount)
                return True

    def predictionCarburant(self, amount, code):
        carburant = self.bdd.getCarburant(code)
        if carburant == -1:
            return -1
        else:
            price = self.bdd.getCarburantPrice(carburant)
            budget = self.bdd.getBudget(code)
            return int(float(budget) - float(amount)* (price))