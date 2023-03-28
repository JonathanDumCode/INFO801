class CheckoutRegister():
    def __init__(self,pumps, prices):
        self.pumps = pumps
        self.prices = prices # key[Fuel] value[price] should be int 

    #Calculate how many liters can be filled with the given fuel and amount
    def makePayment(self, fuel, montant ):
        #The price of one liter of fuel
        fuel_price = int(self.prices[fuel])
        liters = montant/fuel_price
        return liters


    # def getCreditFromVolume(self, fuel, liters):
    #     #The price of one liter of fuel
    #     fuel_price = int(self.prices[fuel])
    #     return liters*fuel_price
        

