function calcularMetaDNB() {
    const meta = parseFloat(document.getElementById('metaLucro').value);
    const oddFav = parseFloat(document.getElementById('oddFav').value);
    const oddEmpate = parseFloat(document.getElementById('oddEmpate').value);

    if (!meta || !oddFav || !oddEmpate) {
        alert("Preencha todos os campos.");
        return;
    }

    // A mágica da matemática:
    // Para lucrar X com proteção total no empate, a Stake no Favorito deve ser:
    // StakeFav = Meta / (OddFav - 1)
    const stakeFav = meta / (oddFav - 1);

    // Agora calculamos quanto precisamos no Empate para cobrir a StakeFav caso ocorra o empate:
    // StakeEmp = StakeFav / (OddEmp - 1)
    const stakeEmpate = stakeFav / (oddEmpate - 1);

    const custoTotal = stakeFav + stakeEmpate;

    // Exibição
    document.getElementById('valMeta').innerText = meta.toFixed(2);
    document.getElementById('resA').innerHTML = `⭐ <strong>Aposta no Favorito:</strong> R$ ${stakeFav.toFixed(2)}`;
    document.getElementById('resEmpate').innerHTML = `🤝 <strong>Aposta no Empate (Proteção):</strong> R$ ${stakeEmpate.toFixed(2)}`;

    document.getElementById('resTotal').innerHTML = `Investimento Total: R$ ${custoTotal.toFixed(2)}`;

    document.getElementById('infoAdicional').innerHTML = `
        ✅ <strong>Se vencer:</strong> Você ganha seus R$ ${meta.toFixed(2)} de lucro.<br>
        🔄 <strong>Se empatar:</strong> Você recebe seus R$ ${custoTotal.toFixed(2)} de volta.<br>
        ❌ <strong>Se a zebra ganhar:</strong> Você perde o total investido.
    `;

    document.getElementById('resultado').classList.remove('hidden');
}















