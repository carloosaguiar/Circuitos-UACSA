#Script para calculo do filtro de 1ª Ordem
import numpy as np
import matplotlib.pylab as plt
import control

class H_s:
    def __init__(self):
        self

    def info(self, ganho: float, numerador: list, denominador: list):
        sys = ganho * control.tf(numerador, denominador)
        polos = str(np.round(control.pole(sys), 2).tolist())
        zeros = str(np.round(control.zero(sys), 2).tolist())

        return str(sys), zeros, polos

    
    def plot_H(self, ganho: float, numerador: list, denominador: list):
        sys = ganho * control.tf(numerador, denominador)
        control.bode(sys, dB=True)
        plt.show()