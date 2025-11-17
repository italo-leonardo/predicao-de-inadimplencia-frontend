document.addEventListener("DOMContentLoaded", () => {
    const resultadoBruto = localStorage.getItem("resultadoPredicao");
    console.log("Resultado recebido:", resultadoBruto);

    if (!resultadoBruto) {
        document.getElementById("status").textContent =
            "Erro: não foi possível carregar o resultado.";
        document.getElementById("probabilidade").textContent = "";
        return; // aqui está DENTRO da função, agora é permitido
    }

    const resultado = JSON.parse(resultadoBruto);

    // Escolhe o texto certo baseado na predição
    let textoStatus = "";
    if (resultado.predicao_classe === 1) {
        textoStatus = "Cliente com alta probabilidade de inadimplência";
    } else {
        textoStatus = "Cliente com baixa probabilidade de inadimplência";
    }

    document.getElementById("status").textContent = textoStatus;

    // Probabilidade
    const prob = (resultado.probabilidade_inadimplencia * 100).toFixed(2);
    document.getElementById("probabilidade").textContent =
        `Probabilidade: ${prob}%`;
});
