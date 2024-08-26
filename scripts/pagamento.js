// Função para mostrar o formulário selecionado
function mostrarFormulario(formulario) {
    document.getElementById('form-debito').style.display = 'none';
    document.getElementById('form-pix').style.display = 'none';

    if (formulario === 'debito') {
        document.getElementById('form-debito').style.display = 'block';
    } else if (formulario === 'pix') {
        document.getElementById('form-pix').style.display = 'block';
        gerarQRCode(); // Gera o QR Code quando o formulário PIX é exibido
    }
}

// Função para gerar o QR Code
function gerarQRCode() {
    const qr = new QRious({
        element: document.getElementById('qrCode'), // Certifique-se de que este ID está presente no HTML
        value: 'Seu código PIX aqui', // Substitua pelo valor real do código PIX
        size: 200
    });
}

// Função para copiar o código PIX para a área de transferência
function copiarCodigoPix() {
    const codigoPixElement = document.getElementById('pixCode');
    const codigoPix = codigoPixElement.textContent;

    navigator.clipboard.writeText(codigoPix).then(function() {
        Swal.fire('Código PIX copiado!');
    }, function(err) {
        Swal.fire('Erro ao copiar o código PIX', '', 'error');
    });
}

// Função para carregar as compras do localStorage e exibi-las na tabela
document.addEventListener('DOMContentLoaded', function () {
    carregarCompras();
});

function carregarCompras() {
    const compras = JSON.parse(localStorage.getItem('compras')) || [];
    const corpoTabela = document.getElementById('corpoTabela');
    const rodapeTabela = document.getElementById('rodapeTabela');

    let totalGeral = 0;

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

        corpoTabela.appendChild(tr);

        totalGeral += compra.total;
    });

    const trTotal = document.createElement('tr');
    const tdTotalLabel = document.createElement('td');
    tdTotalLabel.textContent = 'Total';
    tdTotalLabel.colSpan = 2;
    tdTotalLabel.style.fontWeight = 'bold';
    tdTotalLabel.style.textAlign = 'right';

    const tdTotalValue = document.createElement('td');
    tdTotalValue.textContent = `R$${totalGeral.toFixed(2)}`;
    tdTotalValue.style.fontWeight = 'bold';

    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);

    rodapeTabela.appendChild(trTotal);
}
