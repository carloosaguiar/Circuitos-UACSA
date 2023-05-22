import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

from RCRL import H_s

H = H_s()

eel.init('templates')

@eel.expose
def info_sys(ganho, num, den):
    sys, zeros, polos = H.info(ganho, num, den)

    return sys, zeros, polos

@eel.expose
def plot_RCRl(ganho, num, den):
    
    H.plot_H(ganho, num, den)
    return 'Ok'



eel.start('index.html', size = (1200, 800))