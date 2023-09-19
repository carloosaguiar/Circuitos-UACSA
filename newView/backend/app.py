import logging
import math
from flask import Flask, request, jsonify
import subprocess
from flask_cors import CORS
from utils.rcrlUtil import info_serie, info
from utils.formatUtil import format_equation_with_powers
import re
import sys


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
    # print('oysi')
    data = request.json

    # print("data",data.get('indutor'))
    hs, freq_corte = info_serie(
        data.get('resistor'), data.get('indutor'),  data.get('capacitor'), data.get('visual'))

    if (data.get('freq').upper() == 'HZ'):
        freq_corte = str(round((freq_corte/(2*math.pi)), 2)) + "Hz"
    else:
        freq_corte = str(round((freq_corte), 2)) + "Rad/seg"

    sys.stdout.flush()
    # Remover os espaços em branco no início e no final da string
    cleaned_result = str(hs).strip()

    # Extrair o valor numérico removendo os espaços antes de 's'
    numeric_value = cleaned_result.split('s')[0].strip() + 's'

    numeric_value = re.sub(r'[-\n]', '', numeric_value)

    # Extrair o polinômio após o primeiro 's' e remover espaços adicionais
    polynomial = cleaned_result.split('\n', 3)[-1].strip()

    # Criar o array com os dados no formato desejado
    result_array = [cleaned_result[0], polynomial]

    # print('formatSup', formatSup)
    # print('formatInf', formatInf)

    dataJson = {
        'polinomio':  result_array,
        'freqCorte: ': freq_corte,
    }
    return jsonify(dataJson)


if __name__ == '__main__':
    app.run(debug=True)
