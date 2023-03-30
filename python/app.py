from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_restful import Api, Resource
import json
from lib import data as data
from lib import caisse as caisse
from lib import pump as pump


BDD = data.data()
Caisse = caisse.caisse(BDD)
Pump = pump.pump(BDD)

app = Flask(__name__)
api = Api(app)

# Data base part



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
    value = Caisse.predictionCarburant(amount,carburant)
    return jsonify(value=value)

@app.route('/coupon/list')
def coupon_list():
    return jsonify(coupon=BDD.coupon_ls)

@app.route('/payment/action', methods=['POST'])
def payment_action():
    if request.method == 'POST':
        print(request.form)
        # if key doesn't exist, returns None
        carburant = request.form.get('inlineRadioOptions')
        # if key doesn't exist, returns None
        amount = request.form.get('amount')
        token = Caisse.addCoupon(amount, carburant)
        return render_template('payment.html', message='Payment succes voici votre coupon : ' + token + ' !')
    return render_template('payment.html', message='Payment failed!')



# Page for pump
@app.route('/pump')
def pump():
    return render_template('pump.html',code='',msg='')

@app.route('/pump/action', methods=['POST'])
def pump_action():
    if request.method == 'POST':
        code = request.form.get('code')
        valide = Pump.verificationCode(code)
        if valide:
            nblitre = request.form.get('tank-size')
            pumpOk = False
            if(nblitre != ''):
                pumpOk = Pump.pumpGas(nblitre,code)
            
            coupon = Pump.getCode(code)
            res = '{ "token": "' + coupon['token'] + '", "amount": "' + coupon['amount'] + '", "carburant": "' + coupon['carburant'] + '"}'
            if nblitre != '':
                if pumpOk:
                    return render_template('pump.html',code=res, msg='Carburant pompé')
                else:
                    return render_template('pump.html',code=res, msg='Crédit insuffisant')
            else:
                return render_template('pump.html',code=res, msg='Code valide')
        else:
            return render_template('pump.html',code='', msg='Code Invalide')

        
    return render_template('pump.html',code='', msg='Code Error')

@app.route('/pump/prediction')
def pump_prediction():
    amount = request.args.get('amount')  
    code = request.args.get('code')
    value = Pump.predictionCarburant(amount,code)
    return jsonify(value=value)

if __name__ == '__main__':
    app.run(debug=True)
