import numpy as np
import matplotlib.pylab as plt
import control

class rcrlFunctions():

    def info(ganho: float, numerador: list, denominador: list):
        sys = ganho * control.tf(numerador, denominador)
        polos = str(np.round(control.pole(sys), 2).tolist())
        zeros = str(np.round(control.zero(sys), 2).tolist())

        return str(sys), zeros, polos