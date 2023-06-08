const button_info = document.getElementsByClassName('info')[0];
const body = document.getElementsByTagName('body')[0];

const pop_upText = `
<div class="popup-text">
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

    <br>

    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

    <br>

    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
</div>
`

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

    
    div.innerHTML = pop_upText;

    let button_close = document.createElement('button');
    button_close.innerText = 'X'

    button_close.onclick = () =>{

        body.removeChild(div)

    }

    div.appendChild(button_close);

    body.appendChild(div);

};