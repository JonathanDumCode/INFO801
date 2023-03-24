from flask import Flask, jsonify, request, render_template
from flask_restful import Api, Resource


app = Flask(__name__)
api = Api(app)

print('hi')

class Input(Resource):
    def post(self):
        data = request.get_json()
        return jsonify(data)

api.add_resource(Input, '/input')

# first page for payment
@app.route('/')
def payment():
    return render_template('payment.html')

# second page for pump
@app.route('/pump')
def pump():
    return render_template('pump.html')

if __name__ == '__main__':
    app.run(debug=True)
