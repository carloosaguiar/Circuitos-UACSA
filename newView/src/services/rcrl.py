import numpy as np
import matplotlib.pylab as plt
import control

class rlcFunctions():

    def info(ganho: float, numerador: list, denominador: list):
        sys = ganho * control.tf(numerador, denominador)
        polos = str(np.round(control.pole(sys), 2).tolist())
        zeros = str(np.round(control.zero(sys), 2).tolist())

        return str(sys), zeros, polos
    
    
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

    
    def rlcInfoSerie(R,L,C, visual): 
        hs, freq_corte = RLC.info_serie(R,L,C, visual)

        return str(hs), freq_corte


    def rlcPlotSerie(R,L,C, visual, freq):
        hs, freq_corte = RLC.info_serie(R,L,C, visual)
        RLC.plotSYS(hs, freq)


    def rlcInfoParalelo(Rg,R,L,C):

        hs = RLC.info_RLC_paralelo(Rg,R,L,C)

        return str(hs)


    def rlcPlotParalelo(Rg,R,L,C):

        hs = RLC.info_RLC_paralelo(Rg,R,L,C)

        RLC.plotSYS(hs, None)
