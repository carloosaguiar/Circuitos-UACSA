const button_info = document.getElementsByClassName('info')[0];
const body = document.getElementsByTagName('body')[0];

button_info.onclick = () =>{
    let div = document.createElement('div');
    div.style.display = 'block';
    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '500px';
    div.style.background = '#FFF';
    div.style.width = '500px';
    div.style.height = '400px';
    div.style.overflowY = 'hidden';
    div.style.overflowX = 'hidden'
    div.style.zIndex = 1000

    let button_close = document.createElement('button');
    button_close.innerText = 'X'
    button_close.style.padding = '5px'

    button_close.onclick = () =>{

        body.removeChild(div)

    }

    div.appendChild(button_close);

    let popup_text = document.createElement('section');
    popup_text.style.overflowY = 'scroll'
    popup_text.style.height = '350px'
    popup_text.style.padding = '10px'

    popup_text.innerText = `
    Na aba de polinomio, você informara os termos das funções H(s) que desenvolvel no papel e informar nos campos numerador e denominador e o soft irá gera a função baseado na quantidade de termos fornecidos junto como polos e zeros da função e a frequencia de corte, um exemplo abaixo de uma equação de um filtro passa-baixa:

            H(s) = 1/(s+10)

    Nesse caso o numerador é 1 e o denominador é s + 10, logo vai ter que digitar no campo do numerador o valor 1.

    No campo numerador você NÃO informa o s + 10, mas sim seus termos o termo que acompanha s é 1 e o proximo é +10, logo temos nos termos [1,10] e digitamos esses valores no campo denominador desse jeito: 1,10

    e em seguida clicamos no botão 'Gerar H(s)'.

    Se o numerador ou denominador forem polinomios de grau N, você apenas informa os termos que acompanham as variaveis 's'.

    Você tambem pode mudar visualizar a resposta em frequencia no botão 'Plotar Grafico', e mudar os parametros raio de frequencia nos 3 campos de entrada abaixo do botão 'Gerar H(s)', você não informar os valores exatos mas as potencias de 10, um explemplo abaixo:

        Raio de frequencia: 1 até 1000

    neste caso você informa no primeiro campo 0 e no segundo 3, pois o programa entende que você que ver o grafico num raio de 10^0 à 10^3, e no terceiro campo tem que ser informado a quantidade de pontos, isso influencia na plotagem do grafico, quanto maior a quantidade de pontos, melhorar a rederização da linha do gráfico.
    
    Na aba 'Polos e Zeros', você tera que informar os polos e zeros das funçôes em cada campo, note que terar que informar os valores separados por ',' como no exemplo abaixo:

    Polos: -1,-2,-5
    Zeros: -5,-6,-7

    Nota: Lembre que os polos e zeros tem que ser negativos para a plotagem do gráfico ser coerente com a resposta de um circuito Real.

    Quando clicar no botão 'Gerar Polinomio H(s)', o programa ira apresentar a equação de modo a multiplicar os termos informados nos campos anteriores.

    `

    div.appendChild(popup_text)

    body.appendChild(div);

};

const button_info2 = document.getElementsByClassName('info')[1];

button_info2.onclick = () =>{
    let div = document.createElement('div');
    div.style.display = 'block';
    div.style.position = 'absolute';
    div.style.top = '100px';
    div.style.left = '500px';
    div.style.background = '#FFF';
    div.style.width = '500px';
    div.style.height = '400px';
    div.style.overflowY = 'hidden';
    div.style.overflowX = 'hidden'
    div.style.zIndex = 1000

    let button_close = document.createElement('button');
    button_close.innerText = 'X'
    button_close.style.padding = '5px'

    button_close.onclick = () =>{

        body.removeChild(div)

    }

    div.appendChild(button_close);

    let popup_text = document.createElement('section');
    popup_text.style.overflowY = 'scroll'
    popup_text.style.height = '350px'
    popup_text.style.padding = '10px'

    popup_text.innerText = `
    Na aba de RLC Série, você terar que informar os valores dos componentes, e qual sinal de saida você quer visualizar, em sequencia o botão de Gera H(s) e plotar grafico.

    Nota: Você tera quje informar valores maiores ou igual a zero ( >= 0 ), quando você informa o valor zero de algum componente o programa considera que aquele componente não existe no circuito.

    Na aba de RLC paralelo, você terá que informar todos os valores acima de zero (>0), porquê senão o programa não calcular, em sequencia clica no botão 'Simular', então o programa gera a função H(s) e plota o gráfico em sequencia.
    `

    div.appendChild(popup_text)

    body.appendChild(div);

};