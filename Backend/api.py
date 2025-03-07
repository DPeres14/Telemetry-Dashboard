from flask import Flask, jsonify
from flask_cors import CORS  # Importe o CORS
import random
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Habilite o CORS para todas as rotas

@app.route('/telemetry', methods=['GET'])
def get_telemetry():
    telemetry_data = {
        "speed": random.randint(100, 350),
        "rpm": random.randint(8000, 12000),
        "temperature": random.randint(80, 110),
        "fuel_level": random.randint(10, 100),
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }
    return jsonify(telemetry_data)

if __name__ == '__main__':
    app.run(debug=True)