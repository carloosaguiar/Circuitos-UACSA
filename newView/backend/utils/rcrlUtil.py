import math
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

def CalculateFreqCorte(sys):

    mag, phase, omega = control.bode(sys, plot=False)

    #calcular a frequencia de corte
    mag_corte = max(mag)/(2**0.5)
    diference_array = np.absolute(mag - mag_corte)
    index = diference_array.argmin()

    return omega[index]

def info_serie(R,L,C, visual):
    # o parametro visual informa em qual dispositivo vamo ver a resposta em frequencia

        ganho = 0
        Hs = None
        freq_corte = 0
        
        #Estudo de caso

        match visual:
            case 'Vc':
                if(R == 0):
                    ganho = 1/(L*C)
                    Hs = ganho*control.tf([1],[1,0,ganho])

                elif(L == 0):
                    ganho = 1/(R*C)
                    Hs = ganho*control.tf([1],[1,ganho])
                    
                else:   
                    ganho = 1/(L*C)
                    Hs = ganho*control.tf([1],[1,(R/L),ganho])

            case 'Vl':
                ganho = 1

                if(R == 0):
                    Hs = ganho*control.tf([1,0,0],[1,0,(1/(C*L))])

                elif(C == 0):
                    Hs = ganho*control.tf([1,0],[1,(R/L)])
                    
                else:
                    Hs = ganho*control.tf([1,0,0],[1,(R/L),(1/(C*L))])
            
            case 'Vr':
                if(C == 0):
                    ganho = R/L
                    Hs = ganho*control.tf([1],[1,(1/(R/L))])

                elif(L == 0):
                    ganho = 1
                    Hs = ganho*control.tf([1,0],[1,(1/(R*C))])
                    
                else:
                    ganho = R/L
                    Hs = ganho*control.tf([1,0],[1,(R/L),(1/(C*L))])
            
            case 'Vlc':
                ganho = 1
                Hs = ganho*control.tf([1,0,(1/(C*L))], [1,(R/L),(1/(C*L))])

            case _:
                ganho = 1
                Hs = ganho*control.tf([1,0,(1/(C*L))], [1,(R/L),(1/(C*L))])

    

        freq_corte = CalculateFreqCorte(Hs)
        
        return Hs, freq_corte



#testes
def gera_rlcSerie(R,L,C, freq,visual) :
    hs, freq_corte = info_serie(R,L,C, visual)

    if(freq == 'hz') :
        freq_corte = str(round((freq_corte/(2*math.pi)),2))+ "Hz"
    else:
        freq_corte = str(round((freq_corte),2)) + "Rad/seg"
    dataJson = {
        'Polinomio H(s): ': str(hs),
        'Frequência de corte: ': freq_corte,        
    }
    return dataJson

print(gera_rlcSerie(5,40,0.5,'hz','Vr'))
