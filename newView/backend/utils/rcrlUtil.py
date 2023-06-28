import numpy as np
import matplotlib.pylab as plt
import control

def info(ganho: float, numerador: list, denominador: list):
    sys = ganho * control.tf(numerador, denominador)
    
    zeros = np.round(control.zero(sys), 2).tolist()
    resultadoZeros = str(zeros[0]) if len(zeros) != 0 else '0' # Se a lista for vazia, retorna zero

    polos = np.round(control.pole(sys), 2).tolist()
    resultadoPolo = str(polos[0]) if len(polos) != 0 else '0' # Se a lista for vazia, retorna zero

    return   str(sys), resultadoPolo, resultadoZeros

# def info_sys(ganho, num, den):
#     sys, zeros, polos = info(ganho, num, den)
#     dataJson = {
#         'funcaoTranferencia': sys,
#         'zeros':zeros,
#         'polos':polos

#     }
#     return dataJson
