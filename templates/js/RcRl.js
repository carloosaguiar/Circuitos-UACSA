//Parte de Polinomios
const gerar_polinomio = document.getElementsByClassName('button')[0];
const gerar_grafico = document.getElementsByClassName('button')[1];

const ganho_input = document.getElementById('ganho');
const num_input = document.getElementById('numerador');
const den_input = document.getElementById('denominador');

const terminal = document.getElementById('ter')

//pegar o raio de frequencias
function getRangeFreqPolinomio(index){
    freq_inicial = document.getElementsByClassName('init-freq')[index].value;
    freq_final = document.getElementsByClassName('end-freq')[index].value;
    pontos = document.getElementsByClassName('interval')[index].value;

    if(freq_inicial == 0 && freq_final == 0 && pontos == 1){
        return []
    }else{
        let paramets = [parseFloat(freq_inicial),parseFloat(freq_final), parseFloat(pontos)]
        return paramets
    }

}

function convertToArrayNumber(value){
    //converte a string em um array de numeros
    let aux = [...value]
    let new_array = [];
    let count = '';
    let sinal = ''

    aux.forEach((e, index) => {

        switch(e){
            case ',':
                    new_array.push(parseFloat(count))
                    count = '';
                break
            case '-':
                sinal = '-'
                break
            default:
                count += sinal + e;
                sinal = ''
                break
        }

        if(index === aux.length - 1){
            new_array.push(parseFloat(count))
        }
    });

    return new_array;
};

function convertToArrayGeneric(value){
    //converte a string em um array de numeros
    let aux = [...value]
    let new_array = [];
    let count = '';
    let sinal = ''

    aux.forEach((e, index) => {

        switch(e){
            case ',':
                    new_array.push(count)
                    count = '';
                break
            case '-':
                sinal = '-'
                break
            default:
                count += sinal + e;
                sinal = ''
                break
        }

        if(index === aux.length - 1){
            new_array.push(count)
        }
    });

    return new_array;
}

//renderizar o polinomio no formato mais clear para o usuario
function generatePolinomioString(ganho = 1, numArray, denArray){
    
    let polinomio = '';

    numArray.forEach((e, i) =>{
        
    });
};

gerar_polinomio.onclick = () =>{
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);

    eel.info_sys(ganho, num, den)(H => {
        terminal.value = `
        ${H[0]}

        Zeros: ${H[1]}

        Polos: ${H[2]}
        `
    });
};

gerar_grafico.onclick = async () => {
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);
    let raio_freq = getRangeFreqPolinomio(0);

    console.log(raio_freq)

    eel.plot_RCRl(ganho, num, den, raio_freq)
};

//parte de Zeros e Polos

const gerar_poly = document.getElementsByClassName('button')[2];
const gerar_graph = document.getElementsByClassName('button')[3];

let input_zeros = document.getElementById('zeros-poly');
let input_polos = document.getElementById('polos-poly');

let terminal2 = document.getElementById('ter2');

gerar_poly.onclick = () =>{
    let zeros = convertToArrayGeneric(input_zeros.value);
    let polos = convertToArrayGeneric(input_polos.value);
    

    eel.gerar_poly(1, zeros, polos)(sys =>{
        terminal2.value = sys;
    });

};

gerar_graph.onclick = async () =>{
    let zeros = convertToArrayGeneric(input_zeros.value);
    let polos = convertToArrayGeneric(input_polos.value);

    let range = getRangeFreqPolinomio(1);

    eel.gerar_poly(2, zeros, polos, range);
};