//menu da tela princial
let tela = document.getElementsByClassName('list-item');
let tela_item = document.getElementsByClassName('screen-item');
let main = document.getElementsByTagName('main')[0];
let info = document.getElementById('info');
let nav = document.getElementsByClassName('menu')[0];
let h1 = document.getElementsByClassName('title')[0];

let valueAtual;

for(let i = 0; i <= tela.length-1; i++){
    let e = tela[i];
    e.onclick = () =>{
        valueAtual = i;

        info.style.display = 'none';
        nav.style.display = 'none';
        h1.style.display = 'none';

        main.classList.add('active-screen');
        tela_item[valueAtual].classList.add('screen-item-active');
    };
};

//menu das telas features
let options = document.getElementsByClassName('screen-menu');

for(let i = 0; i <= options.length-1; i++){

    options[i].onclick = ()=>{
        info.style.display = 'flex';
        nav.style.display = 'block';
        h1.style.display = 'block';

        main.classList.remove('active-screen');
        tela_item[valueAtual].classList.remove('screen-item-active');
    }
};

//menu das sub telas

let item_menu = document.getElementsByClassName('item-menu');
let sub_tela = document.getElementsByClassName('sub-tela');

for(let i = 0; i <= item_menu.length-1; i++){
    item_menu[i].onclick = () =>{

        for(j = 0; j <= item_menu.length - 1; j++){
            sub_tela[j].style.display = 'none';
            item_menu[j].classList.remove('active')
        }

        sub_tela[i].style.display = 'block';
        item_menu[i].classList.add('active')
    }
}