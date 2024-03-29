import io
import sys

stream = io.StringIO()

sys.stdout = stream
sys.stderr = stream

import eel

eel.init('templates')

import H_s
import RLC

#======== SESSÂO DE FUNÇÕES =========

#Funções para H(s)
@eel.expose
def info_sys(ganho, numerador, denominador):
    sys, zeros, polos, freq_corte = H_s.info(ganho, numerador, denominador)

    return str(sys), zeros, polos, freq_corte

@eel.expose
def plot_Hs(ganho, num, den, raio):
    H_s.plot_H(ganho, num, den, raio)

@eel.expose
def gerar_poly(options, zeros, polos, raio):
    sys = H_s.generate_poly(options, zeros, polos, raio)

    return str(sys)

#Funções do RLC

@eel.expose
def rlcInfoSerie(R,L,C, visual): 
    hs, freq_corte = RLC.info_serie(R,L,C, visual)

    return str(hs), freq_corte

@eel.expose
def rlcPlotSerie(R,L,C, visual, freq):
    hs, freq_corte = RLC.info_serie(R,L,C, visual)
    RLC.plotSYS(hs, freq)

@eel.expose
def rlcInfoParalelo(Rg,R,L,C):

    hs = RLC.info_RLC_paralelo(Rg,R,L,C)

    return str(hs)

@eel.expose
def rlcPlotParalelo(Rg,R,L,C):

    hs = RLC.info_RLC_paralelo(Rg,R,L,C)

    RLC.plotSYS(hs, None)



#======= STARTA A APLICAÇÃO ========
eel.start('index.html', size = (1230, 800))