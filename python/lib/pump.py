

class pump():
    def __init__(self, bdd):
        self.bdd = bdd

    def verificationCode(self, code):
        return self.bdd.findCoupon(code) != -1
    
    def getCode(self, code):
        return self.bdd.findCoupon(code)

    def pumpGas(self, code):
        pass
