import random
import string

# Data base part
coupon_ls = []

# can be data base part as well
def genToken():
    # Generate a 5-character random string
    random_string = ''.join(random.choice(string.ascii_letters) for i in range(5))
    return random_string

def findCoupon(token):
    res = -1
    for i in range(len(coupon_ls)):
        if(coupon_ls[i]['token'] == token):
            res = coupon_ls[i]
    return res

def addCoupon(amount,carburant):
    token = genToken()

    while(findCoupon(token) != -1):
        token = genToken()
    coupon = {"token": token, "amount": amount, "carburant": carburant}
    coupon_ls.append(coupon)
    return token

def calculate_payment_prediction(amount, carburant):
    return amount*carburant

