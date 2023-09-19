import math
import numpy as np
import matplotlib.pylab as plt
import control
import re
from utils.formatUtil import format_equation_with_powers
from scipy.signal import tf2zpk
import sys


def info(ganho: float, numerador: list, denominador: list):
    sys = ganho * control.tf(numerador, denominador)

    zeros = np.round(control.zero(sys), 2).tolist()
    # Se a lista for vazia, retorna zero
    resultadoZeros = str(zeros[0]) if len(zeros) != 0 else '0'

    polos = np.round(control.pole(sys), 2).tolist()
    # Se a lista for vazia, retorna zero
    resultadoPolo = str(polos[0]) if len(polos) != 0 else '0'

    return str(sys), resultadoPolo, resultadoZeros


def CalculateFreqCorte(sys):

    mag, phase, omega = control.bode(sys, plot=False)

    # calcular a frequencia de corte
    mag_corte = max(mag)/(2**0.5)
    diference_array = np.absolute(mag - mag_corte)
    index = diference_array.argmin()

    return omega[index]


def info_serie(R, L, C, visual):
    # o parametro visual informa em qual dispositivo vamo ver a resposta em frequencia
    print('R,L,C,VISUAL', R, L, C, visual)
    sys.stdout.flush()
    ganho = 0
    Hs = None
    freq_corte = 0

    # Estudo de caso

    match visual:
        case 'Vc':

            if (R == 0):
                ganho = 1/(L*C)
                Hs = control.tf([1], [1, 0, ganho])

            elif (L == 0):
                ganho = 1/(R*C)
                Hs = control.tf([1], [1, ganho])

            else:
                ganho = 1/(L*C)
                Hs = control.tf([1], [1, (R/L), ganho])

        case 'Vl':
            ganho = 1

            if (R == 0):
                Hs = control.tf([1, 0, 0], [1, 0, (1/(C*L))])

            elif (C == 0):
                Hs = control.tf([1, 0], [1, (R/L)])

            else:
                Hs = control.tf([1, 0, 0], [1, (R/L), (1/(C*L))])

        case 'Vr':

            if (C == 0):
                print("C", C)
                sys.stdout.flush()
                ganho = R/L

                Hs = ganho*control.tf([1], [1, (1/(R/L))])
                print('Hs', Hs)
                sys.stdout.flush()
                # Convert the TransferFunction to a string representation
                tf_str = str(Hs)

                # Split the string representation by '\n' and '-----'
                tf_parts = tf_str.split('\n-----\n')

                # Remove any leading/trailing whitespaces from each part
                tf_parts = [part.strip() for part in tf_parts]

                # Remove all the newlines and dashes ('-', '-----') from the parts
                tf_parts = [part.replace('\n', '').replace('-', '')
                            for part in tf_parts]

                # Separate numerator and denominator strings
                numerador, denominador = tf_parts
                print('noi, ',  denominador)
                sys.stdout.flush()

            elif (L == 0):
                ganho = 1
                Hs = control.tf([1, 0], [1, (1/(R*C))])
                print('Hs', Hs)
                sys.stdout.flush()
            else:
                ganho = R/L
                Hs = control.tf([1, 0], [1, (R/L), (1/(C*L))])
                print('hs', Hs)
                # ganho = R/L
                # Hs = ganho*control.tf([1, 0], [1, (R/L), (1/(C*L))])
                # Hs = ganho*control.tf([1], [1, (1/(R/L))])
                # Convert the TransferFunction to a string representation
                tf_str = str(Hs)
                print(' tf_str',  tf_str)
                # Split the string representation by '\n' and '-----'
                # Remove todas as quebras de linha e traços da representação em string
                tf_str = re.sub(r'[\n-]', '', tf_str)

                # Divide a string na ocorrência de '\n-----\n' (com ou sem quebras de linha adicionais)
                tf_parts = re.split(r'\n?-----\n', tf_str)

                # Separa as strings do numerador e denominador (assume strings vazias caso estejam ausentes)
                numerador = tf_parts[0] if tf_parts else ''
                denominador = tf_parts[1] if len(tf_parts) > 1 else ''
                print('n, ',  numerador)
                sys.stdout.flush()

        case 'Vlc':
            ganho = 1
            Hs = control.tf([1, 0, (1/(C*L))], [1, (R/L), (1/(C*L))])

        case _:
            ganho = 1
            Hs = ganho*control.tf([1, 0, (1/(C*L))], [1, (R/L), (1/(C*L))])
    freq_corte = CalculateFreqCorte(Hs)
    # print('HS',teste1)
    return Hs, freq_corte


# testes
def gera_rlcSerie(R, L, C, freq, visual):
    hs, freq_corte = info_serie(R, L, C, visual)

    if (freq == 'hz'):
        freq_corte = str(round((freq_corte/(2*math.pi)), 2)) + "Hz"
    else:
        freq_corte = str(round((freq_corte), 2)) + "Rad/seg"

    # # Remover os espaços em branco no início e no final da string
    # cleaned_result = str(hs).strip()

    # # Extrair o valor numérico removendo os espaços antes de 's'
    # numeric_value = cleaned_result.split('s')[0].strip() + 's'
    # numeric_value = re.sub(r'[-\n]', '', numeric_value)
    # # Extrair o polinômio após o primeiro 's' e remover espaços adicionais
    # polynomial = cleaned_result.split('\n', 3)[-1].strip()

    # # Criar o array com os dados no formato desejado
    # result_array = [numeric_value, polynomial]

      # Substituir a combinação de \n e - por vírgula
    # resposta_formatada = re.sub(r'[\n\s]*-[\n\s]*', ',', str(hs))
    # #print("exp1", resposta_formatada)
    # resposta_formatada = str(hs).replace('-', '').replace('\n', '')
    # #print("exp2", resposta_formatada)
    # resposta_formatada = re.sub(r'\s+(?=\s*[\w.]+\s*[\d./*+-]*\s*s)', '', resposta_formatada)
    # #print("experssao", resposta_formatada)
    # # Expressão regular para encontrar os coeficientes e as expressões
    # padrao = r'([\d.]+(?:\s*[\w+\-*\/*\s*]+)?)'
    # matches = re.findall(padrao, resposta_formatada)
    # #print('matches',matches)

    # # Formatar o resultado
    # resultado = [match.strip() for match in matches if any(c.isdigit() for c in match.strip())]
    # print("result_array", resultado)
    dataJson = {
        'Polinomio H(s): ': str(hs),
        'Frequência de corte: ': freq_corte,
    }
    return dataJson


# print(gera_rlcSerie(1, 0, 1, 'hz', 'Vr'))
