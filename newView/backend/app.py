import logging
import math
from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
from utils.rcrlUtil import info_serie
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
def gera_polinomio():
    ganho = [int(num) for num in request.args.get('ganho')]
    numerador = [int(num) for num in request.args.getlist('numerador[]')]
    denominador = [int(num) for num in request.args.getlist('denominador[]')]

    sys, resultadoPolo, resultadoZeros = info(ganho, numerador, denominador)
    resulSys = re.sub(r"[-\n]", " ", sys)
    # Dividir a string1 em uma lista
    lista1 = re.split(r'\s{2,}', resulSys)
    # Remover elementos vazios da lista1
    lista1 = [item.strip() for item in lista1 if item]
    dataJson = {
        'funcaoTranferencia': lista1,
        'zeros': resultadoZeros,
        'polos': resultadoPolo

    }

    return jsonify(dataJson)

# RLC SÉRIE


@app.route('/api/gerarRlcSerie', methods=['POST'])
def gera_rlcSerie():

    data = request.get_json()
    print('oysi', data)
    hs, freq_corte = info_serie(
        data.get('resistor'), data.get('indutor'),  data.get('capacitor'), data.get('visual'))

    if (data.get('freq').upper() == 'HZ'):
        freq_corte = str(round((freq_corte/(2*math.pi)), 2)) + "Hz"
    else:
        freq_corte = str(round((freq_corte), 2)) + "Rad/seg"
    dataJson = {
        'Polisssnomio H(s): ': str(hs),
        'Frequência de corte: ': freq_corte,
    }
    return jsonify(dataJson)


if __name__ == '__main__':
    app.run(debug=True)
