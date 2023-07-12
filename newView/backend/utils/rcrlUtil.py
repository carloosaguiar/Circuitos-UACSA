import numpy as np
import matplotlib.pylab as plt
import control
import re

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
chamada = info(8,[8,6],[9,9])
resulSys = re.sub(r"[-\n]", " ", chamada[0])
# Dividir a string1 em uma lista
lista1 = re.split(r'\s{2,}', resulSys)
# Remover elementos vazios da lista1
lista1 = [item.strip() for item in lista1 if item]
#formatRe = re.findall(padrao, resulSys),
print(lista1)
