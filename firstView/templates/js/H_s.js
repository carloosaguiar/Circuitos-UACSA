//Parte de Polinomios
const gerar_polinomio = document.getElementsByClassName('button')[0];
const gerar_grafico = document.getElementsByClassName('button')[1];

const ganho_input = document.getElementById('ganho');
const num_input = document.getElementById('numerador');
const den_input = document.getElementById('denominador');

const terminal = document.getElementById('ter')

//pegar o raio de frequencias
function getRangeFreqPolinomio(index){
    let freq_inicial = document.getElementsByClassName('init-freq')[index].value;
    let freq_final = document.getElementsByClassName('end-freq')[index].value == 0 ? 3 : document.getElementsByClassName('end-freq')[index].value;
    let pontos = document.getElementsByClassName('interval')[index].value;
    let unidade = document.getElementsByClassName('unid')[index].value;

    let paramets = [parseFloat(freq_inicial),parseFloat(freq_final), parseFloat(pontos), unidade]
    
    return paramets

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

function processZerosPolos(value){

    let raizPoli = []

    let aux = value.replace('[','');
    aux = aux.replace(']','');
    aux = aux.replaceAll('(','');
    aux = aux.replaceAll(')','');

    aux = [...aux]

    let count = '';

    aux.forEach(e =>{

        switch(e){
            case ',':
                raizPoli.push(count);
                count = '';
                break
            default:
                count += e
                break
        }

    })

    raizPoli.push(count)

    return raizPoli.map(e => {
        if(e.includes('0j')){
            return parseFloat(e)
        }else{
            return e
        }
    })
}

gerar_polinomio.onclick = () =>{
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);

    eel.info_sys(ganho, num, den)(async H => {

        let data = await H;
        let zeros = [];
        let polos;

        if(data[1] != '[]'){
            zeros = processZerosPolos(data[1]);
        }

        polos = processZerosPolos(data[2]);

        let obs = '';

        if(zeros.length < polos.length){
            //caso o numeros de zeros for menor que polos
            obs = `
            Nota: Existe mais ${polos.length - zeros.length} Zeros  no Infinito.
            `
        }else if(polos.length < zeros.length){
            //caso o numeros de polos for menor que zeros
            obs = `
            Nota: Existe mais ${zeros.length - polos.length} Polos no Infinito.
            `
        }

        terminal.value = `
        Polinomio H(s): 
        ${(data[0]).replaceAll('\n','\n                        ')}
        
        ${'='.repeat(30)}
        Informações:

        Zeros: ${zeros}
        Polos: ${polos}
        Frequecia de Corte: ${data[3].toFixed(2)} Rad/seg
        ${obs}
        ${'='.repeat(30)}
        `;
    });
};

gerar_grafico.onclick = () => {
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);
    let raio_freq = getRangeFreqPolinomio(0);

    eel.plot_Hs(ganho, num, den, raio_freq)
};

//parte de Zeros e Polos

const gerar_poly = document.getElementsByClassName('button')[2];
const gerar_graph = document.getElementsByClassName('button')[3];

let input_zeros = document.getElementById('zeros-poly');
let input_polos = document.getElementById('polos-poly');

let terminal2 = document.getElementById('ter2');

gerar_poly.onclick = () => {
    let zeros = convertToArrayGeneric(input_zeros.value);
    let polos = convertToArrayGeneric(input_polos.value);
    
    eel.gerar_poly(1, zeros, polos, [])(sys =>{

        zeros = zeros.map(x =>{
            if(x < 0){
                return `(s + ${Math.abs(x)})`
            }else{
                return `(s - ${x})`
            }
        })
    
        polos = polos.map(x =>{
            if(x < 0){
                return `(s + ${Math.abs(x)})`
            }else{
                return `(s - ${x})`
            }
        })

        terminal2.value = `
        Polinomio H(s): 
        ${(sys).replaceAll('\n','\n                        ')}
        
        ${'='.repeat(30)}
        Informações:

        Numerador: ${zeros.join('.')}
        Denominador: ${polos.join('.')}
        ${'='.repeat(30)}
        `;
    });

};

gerar_graph.onclick = () =>{
    let zeros = convertToArrayGeneric(input_zeros.value);
    let polos = convertToArrayGeneric(input_polos.value);

    let range = getRangeFreqPolinomio(1);

    eel.gerar_poly(2, zeros, polos, range);
};