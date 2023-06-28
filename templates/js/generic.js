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
    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.

    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    `

    div.appendChild(popup_text)

    body.appendChild(div);

};

class InputData{
    constructor(tipo){
        this.tipo = tipo;
    }

    generateInput(){
        let input = document.createElement('div')
        input.style.width = '100%'

        let tipoDispositivo = document.createElement('select').innerHTML = `
        <option value="ideal">Ideal</option>
        <option value="real">Real</option>
        `

        let valueData
    }

    renderInput(){

    }
}