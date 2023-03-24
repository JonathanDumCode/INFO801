from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_restful import Api, Resource


app = Flask(__name__)
api = Api(app)

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
    return render_template('payment.html')


# Page for pump
@app.route('/pump')
def pump():
    return render_template('pump.html')


if __name__ == '__main__':
    app.run(debug=True)
