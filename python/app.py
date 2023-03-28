from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_restful import Api, Resource
import random
import string
import tools as tools

app = Flask(__name__)
api = Api(app)

# Data base part
carburantPrice = {
    "SP95": 1.5,
    "SP98": 1.6,
    "SP95-E10": 1.4,
    "E85": 1.2,
    "Gazole": 1.3,
    "GPL": 0.8
}

# coupon_ls = []
# def genToken(x):
    # alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    # res = []
    # for i in range(x):
    #     res.append(alphabet[random.randint(0,len(alphabet)-1)])
    # return ''.join(res)

# def findCoupon(token):
#     res = -1
#     for i in range(len(coupon_ls)):
#         if(coupon_ls[i]['token'] == token):
#             res = coupon_ls[i]
#     return res

# def addCoupon(amount,carburant):
#     token = tools.genToken()

#     while(findCoupon(token) != -1):
#         token = tools.genToken()
#     coupon = {"token": token, "amount": amount, "carburant": carburant}
#     coupon_ls.append(coupon)
#     return token

print('hi')


class Input(Resource):
    def post(self):
        data = request.get_json()
        return jsonify(data)


api.add_resource(Input, '/input')


# Images
@app.route('/images/<path:path>')
def images(path):
    return send_from_directory('static/img', path)


# Main page
@app.route('/')
def index():
    return render_template('index.html')


# Page for payment
@app.route('/payment')
def payment():
    return render_template('payment.html', message='')


@app.route('/payment/prediction')
def payment_prediction():
    amount = request.args.get('amount')  
    carburant = request.args.get('carburant')
    value = tools.calculate_payment_prediction(amount,carburant)
    return jsonify(value=value)

@app.route('/coupon/list')
def coupon_list():
    return jsonify(coupon=tools.coupon_ls)

@app.route('/payment/action', methods=['POST'])
def payment_action():
    if request.method == 'POST':
        print(request.form)
        # if key doesn't exist, returns None
        carburant = request.form.get('inlineRadioOptions')
        # if key doesn't exist, returns None
        amount = request.form.get('amount')
        token = tools.addCoupon(amount, carburant)
        return render_template('payment.html', message='Payment succes voici votre coupon : ' + token + ' !')
    return render_template('payment.html', message='Payment failed!')

# Page for pump


@app.route('/pump')
def pump():
    return render_template('pump.html')


if __name__ == '__main__':
    app.run(debug=True)
