from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
from utils.rcrlUtil import info
import re



app = Flask(__name__)
CORS(app)

@app.route('/api/endpoint', methods=['GET'])
def get_data():
    # Aqui você pode implementar a lógica para buscar os dados desejados
    data = {
        'message': 'Dados retornados da API Flask',
        'data': [1, 2, 3, 4, 5]
    }
    return jsonify(data)

@app.route('/api/gerarPolinomio', methods=['GET'])
def gera_polinomio() :
    ganho = [int(num) for num in request.args.get('ganho')]
    numerador = [int(num) for num in request.args.getlist('numerador[]')]
    denominador = [int(num) for num in request.args.getlist('denominador[]')]

    sys, resultadoPolo, resultadoZeros = info(ganho, numerador, denominador)
    resulSys = re.sub(r"[-\n]", " ", sys)
    dataJson = {
        'funcaoTranferencia': re.findall(r"\d+\s*s\s*\+\s*\d+", resulSys),
        'zeros': resultadoZeros,
        'polos':resultadoPolo
        
    }
    
    return jsonify(dataJson)


if __name__ == '__main__':
    app.run()