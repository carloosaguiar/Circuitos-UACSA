import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

import H_s
import RLC

eel.init('templates')

#======== SESSÂO DE FUNÇÕES =========

#Funções para H(s)
@eel.expose
def info_sys(ganho, numerador, denominador):
    sys, zeros, polos, freq_corte = H_s.info(ganho, numerador, denominador)

    return sys, zeros, polos, freq_corte

@eel.expose
def plot_Hs(ganho, num, den, raio):
    H_s.plot_H(ganho, num, den, raio)

@eel.expose
def gerar_poly(options, zeros, polos, raio):
    sys = H_s.generate_poly(options, zeros, polos, raio)

    return sys

#Funções do RLC
@eel.expose
def rlcInfo(R,L,C, visual):
    ganho, hs, freq_corte = RLC.info_serie(R,L,C, visual)

    return ganho, hs, freq_corte
    

#======= STARTA A APLICAÇÃO ========
eel.start('index.html', size = (1200, 800))