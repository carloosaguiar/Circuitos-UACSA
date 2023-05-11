import eel

eel.init('templates')

@eel.expose
def demo(x):
    return x**2

eel.start('index.html', size = (1000, 600))