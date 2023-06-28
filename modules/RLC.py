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

#uma função analoga a uma API para circuitos RLC's série
def info_serie(R,L,C, visual):
    # o parametro visual informa em qual dispositivo vamo ver a resposta em frequencia

    ganho = 0
    Hs = None
    freq_corte = 0

    #Estudo de caso
    if(visual == 'Vc'):
        if(R == 0):
            ganho = 1/(L*C)
            Hs = control.tf([1],[1,0,ganho])
            freq_corte = CalculateFreqCorte(Hs)

        elif(L == 0):
            ganho = 1/(R*C)
            Hs = control.tf([1],[1,ganho])
            freq_corte = CalculateFreqCorte(Hs)
            
        else:
            ganho = 1/(L*C)   
            Hs = control.tf([1],[1,(R/L),ganho])
            freq_corte = CalculateFreqCorte(Hs)
        

    elif(visual == 'Vl'):
        ganho
        Hs
        freq_corte

    elif(visual == 'Vr'):
        ganho
        Hs
        freq_corte
    
    elif(visual == 'Vlc'):
        ganho
        Hs
        freq_corte
    
    return ganho, str(Hs), freq_corte

def info_RLC_paralelo(R,L,C, visual):

    match visual:
        case "Vr":
            ganho = R/L
            dem = 0

            Hs = control.tf([1],dem)

            freq_corte = CalculateFreqCorte(Hs)

        case "Vl":
            ganho = 1
            dem = 0

            Hs = control.tf([1,0,0],dem)

            freq_corte = CalculateFreqCorte(Hs)

        case "Vc":
            ganho = 1/(C*L)
            dem = 0

            Hs = control.tf([1],dem)

            freq_corte = CalculateFreqCorte(Hs)

    return 0