import eel
import sys

#Habilidando a importação no diretorio modules
dirModules = sys.path[0] + '\modules'
sys.path.append(dirModules)

eel.init('templates')

@eel.expose
def demo(x):
    return x**2

eel.start('index.html', size = (1000, 600))