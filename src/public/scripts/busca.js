// A CONSTANTE DE DADOS ATUALIZADA com todos os produtos
const dados = [

    { categoria: "Vestidos", nome: "Vestido com Babados", preco: 109.99, imagem: "https://i.pinimg.com/1200x/b9/20/89/b92089b279f5dae884e97f4364e9573f.jpg" },
    { categoria: "Vestidos", nome: "Vestido Floral", preco: 119.99, imagem: "https://i.pinimg.com/736x/61/69/90/6169900ca8d3bfbcade3129dbed4b19d.jpg" },
    { categoria: "Vestidos", nome: "Vestido Amarelo", preco: 149.90, imagem: "https://i.pinimg.com/1200x/41/e9/9b/41e99b4860c89041467eac817927353b.jpg" },
    { categoria: "Vestidos", nome: "Vestido de Verão", preco: 119.90, imagem: "https://i.pinimg.com/736x/fb/ec/b5/fbecb5b47389609e52dcce0deffc6152.jpg" },
    { categoria: "Vestidos", nome: "Vestido Branco", preco: 129.80, imagem: "https://i.pinimg.com/736x/e2/ee/2f/e2ee2f37fe85aa808abbcff0cc534f67.jpg" },
    

    { categoria: "Blusas", nome: "Blusa de Tule", preco: 69.99, imagem: "https://i.pinimg.com/736x/ee/22/c3/ee22c3cdcbdb30f2fd2ca00c9099e1e5.jpg" },
    { categoria: "Blusas", nome: "Blusa com Mnaga", preco: 78.99, imagem: "https://i.pinimg.com/1200x/ef/81/b9/ef81b904ca4a959cf5e132f5a954df27.jpg" },
    { categoria: "Blusas", nome: "Tube Top com Flor", preco: 65.90, imagem: "https://i.pinimg.com/1200x/27/7e/df/277edf460baa1ea5c690c8c6713e3b62.jpg" },
    { categoria: "Blusas", nome: "Regata Preta", preco: 59.80, imagem: "https://i.pinimg.com/1200x/2f/f9/51/2ff951e98b6e7919d5a34564af271fc5.jpg" },
    { categoria: "Blusas", nome: "Blusa Alça Única", preco: 59.80, imagem: "https://i.pinimg.com/736x/15/6b/98/156b98f8f9bb7ba8bb7bafe79a937a85.jpg" },
    
 
    { categoria: "Saias", nome: "Saia Longa", preco: 109.99, imagem: "https://i.pinimg.com/1200x/9f/8e/d8/9f8ed87f2ab9c674e358be7ed6ea9d0a.jpg" },
    { categoria: "Saias", nome: "Saia Jeans", preco: 79.90, imagem: "https://i.pinimg.com/736x/72/22/17/72221760905cc67e7b09ecb661be4fac.jpg" },
    { categoria: "Saias", nome: "Saia Cargo", preco: 110.90, imagem: "https://i.pinimg.com/1200x/0c/0b/f5/0c0bf568c54acbcb9083ed493f0e18cd.jpg" },
    { categoria: "Saias", nome: "Saia com 2 Camadas", preco: 89.90, imagem: "https://i.pinimg.com/736x/cc/fd/02/ccfd027367eab2af460ba461362be4c0.jpg" },
    { categoria: "Saias", nome: "Saia Quadriculada", preco: 99.80, imagem: "https://i.pinimg.com/736x/0d/0a/63/0d0a635b43445c2b7ab5486a62abe2aa.jpg" }
];

const input = document.getElementById('barraDeBusca');
const lista = document.getElementById('listaDeResultados');
const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

function buscar() {
    const termoBusca = input.value.toLowerCase();
    const resultados = dados.filter(item => {
     return item.nome && item.nome.toLowerCase().includes(termoBusca);
    });

    exibirResultados(resultados);
}
function exibirResultados(resultados) {
    lista.innerHTML = ''; 
    
    if (resultados.length === 0) {
        lista.innerHTML = '<li>Nenhum resultado encontrado.</li>';
        return;
    }
    resultados.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="card-resultado">
                <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                    <strong>${item.nome}</strong> (${item.categoria})<br>
                    <span>Preço: ${formatarPreco(item.preco)}</span>
                </div>
            </div>
        `;
        lista.appendChild(li);
    });
}
if (input) {
    input.addEventListener('keyup', buscar);
}

exibirResultados(dados);