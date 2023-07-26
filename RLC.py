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
            Hs = ganho*control.tf([1],[1,0,ganho])

        elif(L == 0):
            ganho = 1/(R*C)
            Hs = ganho*control.tf([1],[1,ganho])
            
        else:   
            ganho = 1/(L*C)
            Hs = ganho*control.tf([1],[1,(R/L),ganho])

    if(visual == 'Vl'):
        ganho = 1

        if(R == 0):
            Hs = ganho*control.tf([1,0,0],[1,0,(1/(C*L))])

        elif(C == 0):
            Hs = ganho*control.tf([1,0],[1,(R/L)])
            
        else:
            Hs = ganho*control.tf([1,0,0],[1,(R/L),(1/(C*L))])

    if(visual == 'Vr'):

        if(C == 0):
            ganho = R/L
            Hs = ganho*control.tf([1],[1,(1/(R/L))])

        elif(L == 0):
            ganho = 1
            Hs = ganho*control.tf([1,0],[1,(1/(R*C))])
            
        else:
            ganho = R/L
            Hs = ganho*control.tf([1,0],[1,(R/L),(1/(C*L))])
    
    if(visual == 'Vlc'):
        ganho = 1
        Hs = ganho*control.tf([1,0,(1/(C*L))], [1,(R/L),(1/(C*L))])

    freq_corte = CalculateFreqCorte(Hs)
    
    return Hs, freq_corte

def info_RLC_paralelo(Rg,R,L,C): 

    ganho = 1/(C*Rg)

    Hs = ganho*control.tf([1, 0],[1, (Rg+R)/(C*Rg*R), 1/(C*L)])

    return Hs

def plotSYS(sys, freq):

    hz = None

    if freq == 'hz':
       hz = True

    control.bode(sys, dB=True, Hz=hz)
    plt.show()