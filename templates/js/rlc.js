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

function printTerminal(dataInput){
    
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

    let dataInput = {
        Resistor: valorResistor.value * eval(escalaResistor.value),
        Indutor: valorIndutor.value * eval(escalaIndutor.value),
        Capacitor: valorCapacitor.value * eval(escalaCapacitor.value),
        saida: tenSaida.value
    }

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

//RLC paralelo

const [Hs, CR, LR] = document.querySelectorAll('section > .dispositivo2');
let [hs, rc, rl] = document.querySelectorAll('.dataInput2');

let terminal4 = document.getElementById('ter4')

const [SimHS, SimRC, SimRL] = document.querySelectorAll('.dataInput2 > button');

Hs.onclick = () =>{
    hs.style.display = 'flex';
    rc.style.display = 'none';
    rl.style.display = 'none';
}

CR.onclick = () =>{
    hs.style.display = 'none';
    rc.style.display = 'flex';
    rl.style.display = 'none';
}

LR.onclick = () =>{
    hs.style.display = 'none';
    rc.style.display = 'none';
    rl.style.display = 'flex';
}

function execSim(dataInput){

    eel.rlcInfoParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)(sys =>
        {
            terminal4.value = `
            Polinomio H(s):
                        ${sys.replaceAll('\n','\n      ')}
                    `
        })

    eel.rlcPlotParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)

}

SimHS.onclick = () =>{
    const [Rg, R, L, C] = document.querySelectorAll('#Hs > .input-group > input');

    //slect das escalas
    const[escalaRg ,escalaR, escalaL, escalaC] = document.querySelectorAll('#Hs > .input-group > select');

    let dataInput1 = {
        ResistorG: Rg.value * eval(escalaRg.value),
        Resistor: R.value * eval(escalaR.value),
        Indutor: L.value * eval(escalaL.value),
        Capacitor: C.value * eval(escalaC.value)
    }

    execSim(dataInput1)

}

SimRC.onclick = () =>{
    let [Rg, freq, banda, L] = document.querySelectorAll('#RC > .input-group > input');

    //slect das escalas
    let[escalaRg ,escalaFreq, escalaBanda, escalaL] = document.querySelectorAll('#RC > .input-group > select');

    freq = freq.value * eval(escalaFreq.value);
    banda = banda.value *eval(escalaBanda.value);
    let wc = freq - (banda/2);

    let dataInput = {
        ResistorG: Rg.value * eval(escalaRg.value),
        Indutor: L.value * eval(escalaL.value),
        Capacitor: null,
        Resistor: null
    }

    dataInput.Capacitor = 1/((freq**2)*dataInput.Indutor);
    dataInput.Resistor = dataInput.ResistorG/( -1 + ((wc*dataInput.ResistorG*dataInput.Capacitor - (dataInput.ResistorG/(wc*dataInput.Indutor)))**2)**0.5 )

    eel.rlcInfoParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)(sys =>
        {
            terminal4.value = `
            Polinomio H(s):
                        ${sys.replaceAll('\n','\n      ')}
                        
                    =============================================
Valor de R = ${dataInput.Resistor} Ω
Valor de C = ${dataInput.Capacitor} F
                    `
        })

    eel.rlcPlotParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)

}

SimRL.onclick = () =>{
    let [Rg, freq, banda, C] = document.querySelectorAll('#RL > .input-group > input');

    //slect das escalas
    let[escalaRg ,escalaFreq, escalaBanda, escalaC] = document.querySelectorAll('#RL > .input-group > select');

    freq = freq.value * eval(escalaFreq.value);
    banda = banda.value *eval(escalaBanda.value);
    let wc = freq - (banda/2);

    let dataInput = {
        ResistorG: Rg.value * eval(escalaRg.value),
        Indutor: null,
        Capacitor: C.value* eval(escalaC.value),
        Resistor: null
    }

    dataInput.Indutor = 1/((freq**2)*dataInput.Capacitor);
    dataInput.Resistor = dataInput.ResistorG/( -1 + ((wc*dataInput.ResistorG*dataInput.Capacitor - (dataInput.ResistorG/(wc*dataInput.Indutor)))**2)**0.5 )

    eel.rlcInfoParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)(sys =>
        {
            terminal4.value = `
            Polinomio H(s):
                        ${sys.replaceAll('\n','\n      ')}
                        
                    =============================================
Valor de R = ${dataInput.Resistor} Ω
Valor de L = ${dataInput.Indutor} H
                    `
        })

    eel.rlcPlotParalelo(dataInput.ResistorG,dataInput.Resistor, dataInput.Indutor, dataInput.Capacitor)
}