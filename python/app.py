from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_restful import Api, Resource


app = Flask(__name__)
api = Api(app)

carburantPrice = {
    "SP95": 1.5,
    "SP98": 1.6,
    "SP95-E10": 1.4,
    "E85": 1.2,
    "Gazole": 1.3,
    "GPL": 0.8
}

coupon = []

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
    return True


@app.route('/payment/action', methods=['POST'])
def payment_action():
    if request.method == 'POST':
        print(request.form)
        # if key doesn't exist, returns None
        carburant = request.form.get('inlineRadioOptions')

        # if key doesn't exist, returns None
        amount = request.form.get('amount')


        return render_template('payment.html', message='Payment succes!')
                
    else:
        return render_template('payment.html', message='Payment failed!')

# Page for pump


@app.route('/pump')
def pump():
    return render_template('pump.html')


if __name__ == '__main__':
    app.run(debug=True)
