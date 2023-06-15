import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

import H_s

eel.init('templates')

#======== SESSÂO DE FUNÇÕES =========
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

#======= STARTA A APLICAÇÃO ========
eel.start('index.html', size = (1200, 800))