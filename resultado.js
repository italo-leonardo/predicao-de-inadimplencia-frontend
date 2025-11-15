// Lê dados salvos pelo script.js
document.addEventListener("DOMContentLoaded", () => {

    const resultado = JSON.parse(localStorage.getItem("resultado_api"));

    if (!resultado) {
        document.getElementById("status").innerText = "Nenhuma análise encontrada.";
        return;
    }

    // Texto do status
    const textoStatus = resultado.default === 1 
        ? "Cliente com risco de inadimplência" 
        : "Cliente com baixa probabilidade de inadimplência";

    document.getElementById("status").innerText = textoStatus;

    // Probabilidade formatada
    const prob = (resultado.probability * 100).toFixed(2) + "%";
    document.getElementById("probabilidade").innerText = "Probabilidade: " + prob;

});
