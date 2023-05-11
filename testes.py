import numpy as np
import matplotlib.pyplot as plt
import control

G = control.tf([300, 0], [3e-6, 1.3e3, 10e3])

(mag, phase, omega) = control.bode(G)

plt.semilogx()
plt.show()