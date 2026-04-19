function calcularTrade() {
    const stakeTotal = parseFloat(document.getElementById('valorBack').value);
    const oddBackA = parseFloat(document.getElementById('oddBack').value);
    const oddLayB = parseFloat(document.getElementById('oddLay').value);

    const nomeA = document.getElementById('nomeA').value || "Time A";
    const nomeB = document.getElementById('nomeB').value || "Time B";

    if (!stakeTotal || !oddBackA || !oddLayB) {
        alert("Preencha todas as odds.");
        return;
    }

    // 1. Lógica: Queremos ganhar no Time A e no Empate.
    // O Lay no Time B já cobre o Empate e a Vitória do Time A.
    // A responsabilidade do Lay B é: Valor do Lay * (OddLay - 1)

    // Calculamos o equilíbrio para que o lucro seja distribuído
    const valorLayB = stakeTotal / (1 + (oddLayB - 1) / oddBackA);
    const responsabilidadeB = valorLayB * (oddLayB - 1);
    const investimentoFavorito = stakeTotal - responsabilidadeB;

    // 2. Cenários de Resultado
    // Cenário 1: Vitória do Time A (Ganha no Back A e ganha no Lay B)
    const lucroVitoriaA = (investimentoFavorito * oddBackA) - stakeTotal;

    // Cenário 2: Empate (Perde no Back A, mas ganha o valor do Lay B)
    const lucroEmpate = valorLayB - stakeTotal;

    const elResultado = document.getElementById('resultado');
    const elLucro = document.getElementById('resLucro');
    const elInfo = document.getElementById('infoAdicional');

    document.getElementById('resA').innerHTML = `🔵 <strong>Back no ${nomeA}:</strong> R$ ${investimentoFavorito.toFixed(2)}`;
    document.getElementById('resLay').innerHTML = `🔴 <strong>Lay no ${nomeB} (Responsabilidade):</strong> R$ ${responsabilidadeB.toFixed(2)}`;

    // Se o lucro for positivo nos dois cenários desejados
    if (lucroVitoriaA > 0 || lucroEmpate >= -0.01) {
        elLucro.innerHTML = `LUCRO SE ${nomeA} VENCER: R$ ${lucroVitoriaA.toFixed(2)}`;
        elLucro.style.color = "#27ae60";
        elInfo.innerHTML = `✅ <strong>Proteção:</strong> Se houver EMPATE, seu saldo é de <strong>R$ ${lucroEmpate.toFixed(2)}</strong>.<br>
        ❌ <strong>Risco:</strong> Você só perde se o <strong>${nomeB}</strong> vencer o jogo.`;
    } else {
        elLucro.innerText = "ESTRATÉGIA INVIÁVEL";
        elLucro.style.color = "#e74c3c";
        elInfo.innerHTML = "As odds não permitem cobrir os dois cenários com lucro. Tente odds de Lay menores.";
    }

    elResultado.classList.remove('hidden');
}










