import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

import RCRL

eel.init('templates')

#======== SESSÂO DE FUNÇÕES =========
@eel.expose
def info_sys(ganho, numerador, denominador):
    sys, zeros, polos, freq_corte = RCRL.info(ganho, numerador, denominador)

    return sys, zeros, polos, freq_corte

@eel.expose
def plot_RCRl(ganho, num, den, raio):
    RCRL.plot_H(ganho, num, den, raio)

@eel.expose
def gerar_poly(options, zeros, polos, raio):
    sys = RCRL.generate_poly(options, zeros, polos, raio)

    return sys

#======= STARTA A APLICAÇÃO ========
eel.start('index.html', size = (1200, 800))