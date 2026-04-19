function calcularFlexivel() {
    const total = parseFloat(document.getElementById('valorTotal').value);
    const oddA = parseFloat(document.getElementById('oddA').value);
    const oddEmpate = parseFloat(document.getElementById('oddEmpate').value);
    const oddB = parseFloat(document.getElementById('oddB').value);
    const valorRecZebra = parseFloat(document.getElementById('recuperaZebra').value);

    // Captura os nomes dos times
    const nomeA = document.getElementById('nomeA').value || "Time A";
    const nomeB = document.getElementById('nomeB').value || "Time B";

    if (!total || !oddA || !oddEmpate || !oddB) {
        alert("Preencha todos os campos.");
        return;
    }

    const invEmpate = total / oddEmpate;
    const invZebra = valorRecZebra / oddB;
    const invFavorito = total - invEmpate - invZebra;

    const resultadoDiv = document.getElementById('resultado');
    const elLucro = document.getElementById('resLucro');
    const elInfo = document.getElementById('infoAdicional');

    if (invFavorito <= 0) {
        resultadoDiv.classList.remove('hidden');
        elLucro.innerText = "ESTRATÉGIA INVIÁVEL";
        elLucro.style.color = "#e74c3c";
        return;
    }

    const retornoFavorito = invFavorito * (oddA <= oddB ? oddA : oddB);
    const lucroLimpo = retornoFavorito - total;

    const probA = (1 / oddA) * 100;
    const probB = (1 / oddB) * 100;

    // Identifica quem é o favorito e quem é a zebra pelo nome
    let favoritoNome = oddA <= oddB ? nomeA : nomeB;
    let zebraNome = oddA <= oddB ? nomeB : nomeA;
    let chanceFavorito = oddA <= oddB ? probA : probB;

    let analiseTexto = `O <strong>${favoritoNome}</strong> é o favorito contra o ${zebraNome} com <strong>${chanceFavorito.toFixed(1)}%</strong> de chance.`;

    let alertaRisco = "";
    if (chanceFavorito < 40) {
        alertaRisco = `<br><span style="color: #e67e22; font-weight: bold;">⚠️ ALERTA: Jogo de alto risco!</span>`;
    }

    // Exibição personalizada
    document.getElementById('resA').innerHTML = `⚽ <strong>Aposta no ${favoritoNome}:</strong> R$ ${invFavorito.toFixed(2)}`;
    document.getElementById('resEmpate').innerHTML = `🤝 <strong>Aposta no Empate:</strong> R$ ${invEmpate.toFixed(2)}`;
    document.getElementById('resB').innerHTML = `🦓 <strong>Aposta no ${zebraNome} (Proteção):</strong> R$ ${invZebra.toFixed(2)}`;

    elLucro.innerHTML = `LUCRO REAL: R$ ${lucroLimpo.toFixed(2)}`;
    elLucro.style.color = lucroLimpo > 0 ? "#27ae60" : "#e74c3c";

    elInfo.innerHTML = `${analiseTexto}${alertaRisco}<br>${lucroLimpo > 0 ? "Estratégia lucrativa!" : "Ajuste as proteções."}`;

    resultadoDiv.classList.remove('hidden');
}


function sugerirProtecao() {
    const oddA = parseFloat(document.getElementById('oddA').value);
    const total = parseFloat(document.getElementById('valorTotal').value);

    if (!oddA || !total) return alert("Preencha a Odd do Favorito e o Valor Total primeiro.");

    // Probabilidade implícita do favorito (1 / odd)
    const probFavorito = 1 / oddA;
    let percentualRecuperacao;

    if (probFavorito > 0.70) {
        // Favorito Absoluto (Odd < 1.40): Risco baixo de zebra
        percentualRecuperacao = 0.10; // Recupera só 10% na zebra
    } else if (probFavorito > 0.45) {
        // Favorito Moderado (Odd entre 1.40 e 2.20): Jogo comum
        percentualRecuperacao = 0.40; // Recupera 40% (seu valor padrão)
    } else {
        // Jogo Perigoso/Equilibrado (Odd > 2.20): Zebra é provável
        percentualRecuperacao = 0.70; // Recupera 70% para não quebrar a banca
    }

    const sugestao = total * percentualRecuperacao;
    document.getElementById('recuperaZebra').value = sugestao.toFixed(2);

    // Opcional: Avisa o usuário sobre o risco
    alert(`Risco Analisado! Sugerimos recuperar R$ ${sugestao.toFixed(2)} na zebra para este jogo.`);

    // Chama o cálculo automaticamente após sugerir
    calcularFlexivel();
}



