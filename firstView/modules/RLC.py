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
        ganho = 1/(L*C)

        if(R == 0):
            Hs = control.tf([1],[1,0,ganho])

        elif(L == 0):
            ganho = 1/(R*C)
            Hs = control.tf([1],[1,ganho])
            
        else:   
            Hs = control.tf([1],[1,(R/L),ganho])

    if(visual == 'Vl'):
        ganho = 1

        if(R == 0):
            Hs = control.tf([1,0,0],[1,0,(1/(C*L))])

        elif(C == 0):
            Hs = control.tf([1,0],[1,(R/L)])
            
        else:
            Hs = control.tf([1,0,0],[1,(R/L),(1/(C*L))])

    if(visual == 'Vr'):
        ganho = R/L

        if(C == 0):
            Hs = control.tf([1],[1,(1/(R/L))])

        elif(L == 0):
            ganho = 1
            Hs = control.tf([1,0],[1,(1/(R*C))])
            
        else:
            Hs = control.tf([1,0],[1,(R/L),(1/(C*L))])
    
    if(visual == 'Vlc'):
        ganho = 1
        Hs = control.tf([1,0,(1/(C*L))], [1,(R/L),(1/(C*L))])

    freq_corte = CalculateFreqCorte(Hs)
    
    return ganho, str(Hs), freq_corte

def info_RLC_paralelo(R1,R2,L,C):

    ganho = 1/(C*R1)

    Hs = control.tf([1, 0],[1, (R1+R2)/(C*R1*R2), 1/(C*L)])

    return ganho, str(Hs)