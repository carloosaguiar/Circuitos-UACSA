//Pegar os dados da tela
//RLC série

const tenSaida = document.getElementById('dispositivo');
const freq = document.getElementById('unidFreq');

//inputs dos valores
const [valorResistor, valorIndutor, valorCapacitor] = document.querySelectorAll('#dataInput > .input-group > input');

//slect das escalas
const [escalaResistor, escalaIndutor, escalaCapacitor] = document.querySelectorAll('#dataInput > .input-group > select');

//botão gerar H(s) e plotar
const [gerarHs, plotar] = document.querySelectorAll('.content > .sessao > button');

//terminal de informações
const ter3 = document.getElementById('ter3');

function printTerminal(){

    let dataInput = {
        Resistor: valorResistor.value * eval(escalaResistor.value),
        Indutor: valorIndutor.value * eval(escalaIndutor.value),
        Capacitor: valorCapacitor.value * eval(escalaCapacitor.value),
        saida: tenSaida.value
    }
    
    eel.rlcInfoSerie(dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor, dataInput.saida)(data => {

        if(freq.value == 'hz'){
            data[1] = (data[1]/(2*Math.PI)).toFixed(2) + " Hz"
        }else{
            data[1] = (data[1]).toFixed(2) + " Rad/seg"
        }

        ter3.value = `
Polinomio H(s):
            ${data[0].replaceAll('\n','\n      ')}
    
            ================================
 Frequencia de corte: ${data[1]}
        `
    })

}

gerarHs.onclick = () =>{

    printTerminal(dataInput)
}

plotar.onclick = ()=>{

    let dataInput = {
        Resistor: valorResistor.value * eval(escalaResistor.value),
        Indutor: valorIndutor.value * eval(escalaIndutor.value),
        Capacitor: valorCapacitor.value * eval(escalaCapacitor.value),
        saida: tenSaida.value,
        Frequencia: freq.value
    }

    printTerminal(dataInput)

    eel.rlcPlotSerie(dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor, dataInput.saida, dataInput.Frequencia)
}

//RLC série
