const imagens = [
    '/images/verao.jpg',
    '/images/desconto.jpg',
    '/images/blackf.jpg'
];

let indiceCentral = 1;

const carrossel = document.querySelector('.imagens-carrossel');
const btnEsquerda = document.getElementById('esquerda');
const btnDireita = document.getElementById('direita');

function passaCarrossel(){
    const esquerda = imagens[(indiceCentral - 1 + imagens.length) % imagens.length];
    const central = imagens[indiceCentral];
    const direita = imagens[(indiceCentral + 1)% imagens.length];

    carrossel.innerHTML = '';

    [esquerda, central, direita].forEach((src, i) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add('normal');
        if(i=== 1) img.id = 'central';
        carrossel.appendChild(img);
    });
}

btnEsquerda.addEventListener('click', () => {
    indiceCentral = (indiceCentral - 1 + imagens.length)% imagens.length;
    passaCarrossel();
});

btnDireita.addEventListener('click', () => {
    indiceCentral = (indiceCentral + 1) % imagens.length;
    passaCarrossel();
});

passaCarrossel();