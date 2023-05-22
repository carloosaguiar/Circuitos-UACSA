const gerar_polinomio = document.getElementsByClassName('button')[0];
const gerar_grafico = document.getElementsByClassName('button')[1];

const ganho_input = document.getElementById('ganho');
const num_input = document.getElementById('numerador');
const den_input = document.getElementById('denominador');

const terminal = document.getElementById('ter')


function convertToArrayNumber(value){
    //converte a string em um array de valores inteiros
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
}

gerar_polinomio.onclick = () =>{
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);

    eel.info_sys(ganho, num, den)(H => {
        terminal.value = `
        ${'H(s)' + H[0]}

        Zeros: ${H[1]}

        Polos: ${H[2]}
        `
    })
}

gerar_grafico.onclick = () => {
    let ganho = parseFloat(ganho_input.value);
    let num = convertToArrayNumber(num_input.value);
    let den = convertToArrayNumber(den_input.value);

    eel.plot_RCRl(ganho, num, den)
}