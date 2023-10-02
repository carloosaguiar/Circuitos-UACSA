#Script para calculo do filtro de 1ª Ordem
import numpy as np
import matplotlib.pylab as plt
import control

def CalculateFreqCorte(sys):

    mag, phase, omega = control.bode(sys, plot=False)

    #calcular a frequencia de corte
    mag_corte = max(mag)/(2**0.5)
    diference_array = np.absolute(mag - mag_corte)
    index = diference_array.argmin()

    return omega[index]

def info(ganho: float, numerador: list, denominador: list):
    sys = ganho * control.tf(numerador, denominador)
    polos = str(np.round(control.pole(sys), 2).tolist())
    zeros = str(np.round(control.zero(sys), 2).tolist())

    freq_corte = CalculateFreqCorte(sys)

    return str(sys), zeros, polos, freq_corte

    
def plot_H(ganho: float, numerador: list, denominador: list, range: list):

    hz = None
    raio_freq = None

    raio_freq = np.logspace(range[0], range[1], range[2])

    if range[3] == 'Hz':
       hz = True
    
    sys = ganho * control.tf(numerador, denominador)
    control.bode(sys, raio_freq, dB=True, Hz=hz)
    plt.show()

def generate_poly(options: int, zeros: list, polos: list, range):

    #Os zeros e polos vão ser recebidos com uma lista de strings de polares

    #Converter os zeros e polos em uma lista de numeros complexos

    zeros_complex = list(map(lambda num: complex(num), zeros))
    polos_complex = list(map(lambda num: complex(num), polos))

    num = np.poly(zeros_complex).tolist()
    den = np.poly(polos_complex).tolist() 

    if(options == 1):
        #Caso 1 Devolve um polinomio
        sys, p, z, freq = info(1, num, den)
        return str(sys)
    
    elif(options == 2):
        #caso 2 gera um grafico
        plot_H(1, num, den, range)