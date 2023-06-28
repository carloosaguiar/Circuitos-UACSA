//Pegar os dados da tela
//RLC série

const tenSaida = document.getElementById('dispositivo');
const freq = document.getElementById('unidFreq');

//inputs dos valores
const [valorResistor, valorIndutor, valorCapacitor] = document.querySelectorAll('.input-group > input');

//slect das escalas
const [escalaResistor, escalaIndutor, escalaCapacitor] = document.querySelectorAll('.input-group > select');

//botão gerar H(s) e plotar
const [gerarHs, plotar] = document.querySelectorAll('.content > .sessao > button');

//terminal de informações
const ter3 = document.getElementById('ter3');

gerarHs.onclick = () =>{
    let dataInput = {
        Resistor: valorResistor.value * eval(escalaResistor.value),
        Indutor: valorIndutor.value * eval(escalaIndutor.value),
        Capacitor: valorCapacitor.value * eval(escalaCapacitor.value),
        saida: tenSaida.value,
        Frequencia: freq.value
    }

    eel.rlcInfo(dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor, dataInput.saida)(data => {
        ter3.value = `
Polinomio H(s):
            ${data[1].replaceAll('\n','\n      ')}

            ================================
Ganho: ${data[0].toFixed(2)}
Frequencia de corte: ${data[2].toFixed(2)}
        `
    })
}