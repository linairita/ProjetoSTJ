(function(){
    const CART_KEY = 'opencloset_cart_v1';

    function qs(sel, ctx=document) { return ctx.querySelector(sel); }
    function qsa(sel, ctx=document) { return Array.from(ctx.querySelectorAll(sel)); }


    function createCartDrawer(){
        const drawer = document.createElement('aside');
        drawer.id = 'cartDrawer';
        drawer.className = 'cart-drawer';
        drawer.innerHTML = `
            <header class="cart-drawer-header">
                <h3>Seu carrinho</h3>
                <button id="closeCart" aria-label="Fechar carrinho">×</button>
            </header>
            <div id="cartItems" class="cart-items"></div>
            <footer class="cart-drawer-footer">
                <div class="cart-total">Total: <span id="cartTotal">R$ 0,00</span></div>
                <button id="checkoutBtn" class="checkout">Finalizar compra</button>
            </footer>
        `;
        document.body.appendChild(drawer);
    }

    function loadCart(){
        try{
            const raw = localStorage.getItem(CART_KEY);
            return raw ? JSON.parse(raw) : [];
        }catch(e){
            console.error('Erro ao carregar carrinho', e);
            return [];
        }
    }
    function saveCart(cart){
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function formatBRL(n){
        return Number(n).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    }

    function updateCartCount(){
        const cart = loadCart();
        const count = cart.reduce((s,i)=>s + (i.qtd||1),0);
        const el = document.getElementById('cartCount');
        if(el) el.textContent = count;
    }

    function renderCart(){
        const cart = loadCart();
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        if(!container) return;
        container.innerHTML = '';
        let total = 0;
        cart.forEach((item, idx) =>{
            total += (item.preco || 0) * (item.qtd||1);
            const row = document.createElement('div');
            row.className = 'cart-row';
            row.innerHTML = `
                <img src="${item.imagem || ''}" alt="${item.nome || ''}">
                <div class="cart-row-info">
                    <strong>${item.nome}</strong>
                    <div class="cart-row-meta">${formatBRL(item.preco || 0)}</div>
                    <div class="cart-row-actions">
                        <button class="dec" data-idx="${idx}">-</button>
                        <span class="qtd">${item.qtd||1}</span>
                        <button class="inc" data-idx="${idx}">+</button>
                        <button class="remove" data-idx="${idx}">Remover</button>
                    </div>
                </div>
            `;
            container.appendChild(row);
        });
        if(totalEl) totalEl.textContent = formatBRL(total);

        qsa('.cart-row .inc').forEach(b=> b.addEventListener('click', (e)=>{
            const i = Number(e.target.dataset.idx);
            const cart = loadCart();
            cart[i].qtd = (cart[i].qtd||1) + 1;
            saveCart(cart); renderCart(); updateCartCount();
        }));
        qsa('.cart-row .dec').forEach(b=> b.addEventListener('click', (e)=>{
            const i = Number(e.target.dataset.idx);
            const cart = loadCart();
            cart[i].qtd = Math.max(1, (cart[i].qtd||1) - 1);
            saveCart(cart); renderCart(); updateCartCount();
        }));
        qsa('.cart-row .remove').forEach(b=> b.addEventListener('click', (e)=>{
            const i = Number(e.target.dataset.idx);
            let cart = loadCart();
            cart.splice(i,1);
            saveCart(cart); renderCart(); updateCartCount();
        }));
    }

    function openCart(){
        document.getElementById('cartDrawer').classList.add('open');
        renderCart();
    }
    function closeCart(){
        document.getElementById('cartDrawer').classList.remove('open');
    }

    function addToCart(item){
        const cart = loadCart();
        const existing = cart.find(c => c.nome === item.nome);
        if(existing){ existing.qtd = (existing.qtd||1) + 1; }
        else { cart.push(Object.assign({qtd:1}, item)); }
        saveCart(cart); updateCartCount();
    }

    function init(){
        createCartDrawer();
        updateCartCount();
        const cartButton = document.getElementById('cartButton');
        if(cartButton) cartButton.addEventListener('click', openCart);
        const closeBtn = document.getElementById('closeCart');
        if(closeBtn) closeBtn.addEventListener('click', closeCart);
        const checkout = document.getElementById('checkoutBtn');
        if(checkout) checkout.addEventListener('click', ()=> alert('Fluxo de checkout não implementado.'));

        qsa('.btn-comprar').forEach(b=> b.addEventListener('click', (e)=>{
            const card = e.target.closest('.card');
            if(!card) return;
            const nome = card.querySelector('.nome-produto') ? card.querySelector('.nome-produto').textContent.trim() : '';
            const img = card.querySelector('img') ? card.querySelector('img').src : '';
            const precoText = card.querySelector('p') ? card.querySelector('p').textContent.replace('R$','').replace(',','.') : '0';
            const preco = parseFloat(precoText) || 0;
            addToCart({nome, imagem: img, preco});
        }));
    }


    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
