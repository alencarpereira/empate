function calcularDNB() {
    const total = parseFloat(document.getElementById('valorTotal').value);
    const oddFav = parseFloat(document.getElementById('oddFav').value);
    const oddEmpate = parseFloat(document.getElementById('oddEmpate').value);
    const nomeA = document.getElementById('nomeA').value || "Time A";
    const nomeB = document.getElementById('nomeB').value || "Time B";

    if (!total || !oddFav || !oddEmpate) {
        alert("Por favor, preencha todos os campos corretamente.");
        return;
    }

    // 1. Cálculo de Proteção (Reembolso Total no Empate)
    const investimentoEmpate = total / oddEmpate;
    const investimentoFavorito = total - investimentoEmpate;

    // 2. Retorno
    const retornoFavorito = investimentoFavorito * oddFav;
    const lucroReal = retornoFavorito - total;

    const elResultado = document.getElementById('resultado');
    const elLucro = document.getElementById('resLucro');
    const elInfo = document.getElementById('infoAdicional');

    document.getElementById('resA').innerHTML = `⭐ <strong>Aposta no ${nomeA}:</strong> R$ ${investimentoFavorito.toFixed(2)}`;
    document.getElementById('resEmpate').innerHTML = `🤝 <strong>Aposta no Empate:</strong> R$ ${investimentoEmpate.toFixed(2)}`;

    if (lucroReal <= 0) {
        elLucro.innerText = "ESTRATÉGIA INVIÁVEL";
        elLucro.style.color = "#e74c3c";
        elInfo.innerHTML = "O lucro não cobre os custos. Tente uma Odd de favorito mais alta.";
    } else {
        elLucro.innerHTML = `LUCRO SE VENCER: R$ ${lucroReal.toFixed(2)}`;
        elLucro.style.color = "#27ae60";
        elInfo.innerHTML = `<strong>Segurança:</strong> Se o jogo empatar, você recupera seus R$ ${total.toFixed(2)}.<br>Se o ${nomeB} vencer, você perde a aposta.`;
    }

    elResultado.classList.remove('hidden');
}








