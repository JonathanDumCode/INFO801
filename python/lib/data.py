import random
import string






class data():
    def __init__(self):
        #self = self
        self.carburantPrice = {
            "SP95": 1.5,
            "SP98": 1.6,
            "SP95-E10": 1.4,
            "E85": 1.2,
            "Gazole": 1.3,
            "GPL": 0.8
        }
        self.coupon_ls = [{"amount":"50","carburant":"SP95","token":"RNHLE"}]

    def getCarburantPrice(self,carburant):
        return self.carburantPrice[carburant]

    def newToken(self):
        # Generate a 5-character random string
        random_string = ''.join(random.choice(
            string.ascii_uppercase) for i in range(5))
        return random_string


    def findCoupon(self,token):
        res = -1
        for i in range(len(self.coupon_ls)):
            if (self.coupon_ls[i]['token'] == token):
                res = self.coupon_ls[i]
        return res


    def addCoupon(self,amount, carburant):
        token = self.newToken()

        while (self.findCoupon(token) != -1):
            token = self.newToken()
        coupon = {"token": token, "amount": amount, "carburant": carburant}
        self.coupon_ls.append(coupon)
        return token
