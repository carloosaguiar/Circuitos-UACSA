#Script para calculo do filtro de 1ª Ordem
import numpy as np
import matplotlib.pylab as plt
import control

def info(ganho: float, numerador: list, denominador: list):
    sys = ganho * control.tf(numerador, denominador)
    polos = str(np.round(control.pole(sys), 2).tolist())
    zeros = str(np.round(control.zero(sys), 2).tolist())

    return str(sys), zeros, polos

    
def plot_H(ganho: float, numerador: list, denominador: list, range: list):

    raio_freq = None

    if(range != None):
        raio_freq = np.logspace(range[0], range[1], range[2])
    
    sys = ganho * control.tf(numerador, denominador)
    control.bode(sys, raio_freq, dB=True)
    plt.show()

def generate_poly(options: int, zeros: list, polos: list, range):

    #Os zeros e polos vão ser recebidos com uma lista de strings de polares

    #Converter os zeros e polos em uma lista de numeros complexos

    zeros_complex = list(map(lambda num: complex(num), zeros))
    polos_complex = list(map(lambda num: complex(num), polos))

    print(zeros_complex)
    print(polos_complex)

    zero = np.poly(zeros_complex).tolist()
    polo = np.poly(polos_complex).tolist()

    if(options == 1):
        #Caso 1 Devolve um polinomio
        sys, p, z = info(1, zero, polo)
        return str(sys)
    elif(options == 2):
        #caso 2 gera um grafico
        plot_H(1, zero, polo, range)