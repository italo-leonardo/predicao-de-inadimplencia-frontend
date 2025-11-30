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

    const statusEl = document.getElementById("status");
    statusEl.innerText = textoStatus;
    const badge = document.createElement('span');
    badge.className = 'badge ' + (resultado.default === 1 ? 'danger' : 'success');
    badge.textContent = resultado.default === 1 ? 'Risco' : 'Baixo risco';
    statusEl.appendChild(document.createTextNode(' '));
    statusEl.appendChild(badge);

    // Probabilidade formatada
    const prob = (resultado.probability * 100).toFixed(2) + "%";
    document.getElementById("probabilidade").innerText = "Probabilidade: " + prob;

});
