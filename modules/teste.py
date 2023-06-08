import numpy as np
import matplotlib.pyplot as plt
import control

H = control.tf([1],[1,30])

freq_omega = np.logspace(0, 3, 50)

mag, phase, omega = control.bode(H, freq_omega, dB=True, Hz=True)

#print(omega, end="\n")
plt.show()