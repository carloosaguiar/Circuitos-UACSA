import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

import RCRL

eel.init('templates')

#======== SESSÂO DE FUNÇÕES =========
@eel.expose
def info_sys(ganho, num, den):
    sys, zeros, polos = RCRL.info(ganho, num, den)

    return sys, zeros, polos

@eel.expose
def plot_RCRl(ganho, num, den, raio):
    if raio == []:
        RCRL.plot_H(ganho, num, den, None)
    else:
        RCRL.plot_H(ganho, num, den, raio)

@eel.expose
def gerar_poly(options, zeros, polos):
    RCRL.generate_poly(options, zeros,polos)

#======= STARTA A APLICAÇÃO ========
eel.start('index.html', size = (1200, 800))