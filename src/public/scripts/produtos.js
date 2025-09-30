// A CONSTANTE DE DADOS com todos os produtos
const dadosProdutos = [
    // --- VESTIDOS ---
    { categoria: "Vestidos", nome: "Vestido com Babados", preco: 109.99, imagem: "https://i.pinimg.com/1200x/b9/20/89/b92089b279f5dae884e97f4364e9573f.jpg" },
    { categoria: "Vestidos", nome: "Vestido Floral", preco: 119.99, imagem: "https://i.pinimg.com/736x/61/69/90/6169900ca8d3bfbcade3129dbed4b19d.jpg" },
    { categoria: "Vestidos", nome: "Vestido Amarelo", preco: 149.90, imagem: "https://i.pinimg.com/1200x/41/e9/9b/41e99b4860c89041467eac817927353b.jpg" },
    { categoria: "Vestidos", nome: "Vestido de Verão", preco: 119.90, imagem: "https://i.pinimg.com/736x/fb/ec/b5/fbecb5b47389609e52dcce0deffc6152.jpg" },
    { categoria: "Vestidos", nome: "Vestido Branco", preco: 129.80, imagem: "https://i.pinimg.com/736x/e2/ee/2f/e2ee2f37fe85aa808abbcff0cc534f67.jpg" },
    
    // --- BLUSAS ---
    { categoria: "Blusas", nome: "Blusa de Tule", preco: 69.99, imagem: "https://i.pinimg.com/736x/ee/22/c3/ee22c3cdcbdb30f2fd2ca00c9099e1e5.jpg" },
    { categoria: "Blusas", nome: "Blusa com Mnaga", preco: 78.99, imagem: "https://i.pinimg.com/1200x/ef/81/b9/ef81b904ca4a959cf5e132f5a954df27.jpg" },
    { categoria: "Blusas", nome: "Tube Top com Flor", preco: 65.90, imagem: "https://i.pinimg.com/1200x/27/7e/df/277edf460baa1ea5c690c8c6713e3b62.jpg" },
    { categoria: "Blusas", nome: "Regata Preta", preco: 59.80, imagem: "https://i.pinimg.com/1200x/2f/f9/51/2ff951e98b6e7919d5a34564af271fc5.jpg" },
    { categoria: "Blusas", nome: "Blusa Alça Única", preco: 59.80, imagem: "https://i.pinimg.com/736x/15/6b/98/156b98f8f9bb7ba8bb7bafe79a937a85.jpg" },
    
    // --- SAIAS ---
    { categoria: "Saias", nome: "Saia Longa", preco: 109.99, imagem: "https://i.pinimg.com/1200x/9f/8e/d8/9f8ed87f2ab9c674e358be7ed6ea9d0a.jpg" },
    { categoria: "Saias", nome: "Saia Jeans", preco: 79.90, imagem: "https://i.pinimg.com/736x/72/22/17/72221760905cc67e7b09ecb661be4fac.jpg" },
    { categoria: "Saias", nome: "Saia Cargo", preco: 110.90, imagem: "https://i.pinimg.com/1200x/0c/0b/f5/0c0bf568c54acbcb9083ed493f0e18cd.jpg" },
    { categoria: "Saias", nome: "Saia com 2 Camadas", preco: 89.90, imagem: "https://i.pinimg.com/736x/cc/fd/02/ccfd027367eab2af460ba461362be4c0.jpg" },
    { categoria: "Saias", nome: "Saia Quadriculada", preco: 99.80, imagem: "https://i.pinimg.com/736x/0d/0a/63/0d0a635b43445c2b7ab5486a62abe2aa.jpg" }
];

// Função auxiliar para formatar o preço em BRL
const formatarPreco = (preco) => {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

/**
 * Função principal que filtra os dados, gera o HTML e inicializa o Swiper.
 * @param {string} idCarrossel - O ID do container Swiper no HTML (ex: 'vestidos-swiper').
 * @param {string} categoria - O valor da categoria a ser filtrada nos dados (ex: 'Vestidos').
 */
function criarCarrossel(idCarrossel, categoria) {
    
    // 1. Filtra os dados pela categoria
    const produtosFiltrados = dadosProdutos.filter(p => p.categoria === categoria);

    // 2. Localiza o wrapper onde os slides serão inseridos
    const wrapper = document.querySelector(`#${idCarrossel} .swiper-wrapper`);
    
    let htmlSlides = '';

    // 3. Cria a estrutura HTML dos slides (produtos)
    produtosFiltrados.forEach(produto => {
        htmlSlides += `
            <div class="swiper-slide">
                <div class="produto-card">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h4 class="nome-produto">${produto.nome}</h4>
                    <p>${formatarPreco(produto.preco)}</p>
                    <button class="btn-comprar">Comprar</button>
                </div>
            </div>
        `;
    });

    // 4. Insere o HTML gerado no DOM
    if (wrapper) {
        wrapper.innerHTML = htmlSlides;
    } else {
        console.error(`O elemento com o wrapper para o ID: #${idCarrossel} não foi encontrado.`);
        return;
    }

    // 5. Inicializa o Swiper para o carrossel específico
    new Swiper(`#${idCarrossel}`, {
        loop: true, // Carrossel infinito
        spaceBetween: 15, // Espaço entre os slides
        
        // Atribui os elementos de navegação
        navigation: {
            nextEl: `#${idCarrossel} .swiper-button-next`,
            prevEl: `#${idCarrossel} .swiper-button-prev`,
        },
        pagination: {
            el: `#${idCarrossel} .swiper-pagination`,
            clickable: true,
        },

        // Responsividade: define quantos slides mostrar em cada tamanho de tela
        breakpoints: {
            320: { // Mobile
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            768: { // Tablet
                slidesPerView: 3,
                spaceBetween: 20
            },
            1024: { // Desktop
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    });
}

// CHAMA A FUNÇÃO PARA CADA CARROSSEL BASEADO NO ID DO SEU HTML E NA CATEGORIA
document.addEventListener('DOMContentLoaded', () => {
    criarCarrossel('vestidos-swiper', 'Vestidos');
    criarCarrossel('blusas-swiper', 'Blusas');
    criarCarrossel('saias-swiper', 'Saias');
});