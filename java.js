function decreaseQuantity(suco) {
    const input = document.getElementById(`quantity-${suco}`);
    if (input.value > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function increaseQuantity(suco) {
    const input = document.getElementById(`quantity-${suco}`);
    input.value = parseInt(input.value) + 1;
}

function comprar(suco, preco) {
    const quantidade = document.getElementById(`quantity-${suco}`).value;
    const compra = {
        suco: suco,
        quantidade: parseInt(quantidade),
        total: parseFloat(preco) * parseInt(quantidade)
    };
    
    let compras = JSON.parse(localStorage.getItem('compras')) || [];
    compras.push(compra);
    localStorage.setItem('compras', JSON.stringify(compras));
    atualizarCompras();
}

function atualizarCompras() {
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    const tabela = document.getElementById('compras-tabela');
    tabela.innerHTML = '';
    compras.forEach(compra => {
        const tr = document.createElement('tr');

        const tdProduto = document.createElement('td');
        tdProduto.textContent = `Suco de ${compra.suco.charAt(0).toUpperCase() + compra.suco.slice(1)}`;

        const tdQuantidade = document.createElement('td');
        tdQuantidade.textContent = compra.quantidade;

        const tdPrecoTotal = document.createElement('td');
        tdPrecoTotal.textContent = `R$${compra.total.toFixed(2)}`;

        tr.appendChild(tdProduto);
        tr.appendChild(tdQuantidade);
        tr.appendChild(tdPrecoTotal);

        tabela.appendChild(tr);
    });
}

function limparCompras() {
    localStorage.removeItem('compras');
    atualizarCompras();
}

document.addEventListener('DOMContentLoaded', atualizarCompras);