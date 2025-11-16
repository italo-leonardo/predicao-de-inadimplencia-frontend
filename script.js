// script.js
// Lógica de envio do formulário e simulação de resposta de predição
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // impede recarregar página

        // Coleta dos dados do formulário
        const formData = new FormData(form);
        const payload = {};

        formData.forEach((value, key) => {
            if (!isNaN(value) && value.toString().trim() !== "") {
                payload[key] = Number(value);
            } else {
                payload[key] = value;
            }
        });

        console.log("Payload preparado para envio:", payload);

        let prediction;
        try {
            // Chamada placeholder para ilustrar requisição.
            // Substitua a URL abaixo pela API real quando disponível.
            const response = await fetch("https://httpbin.org/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const backendEcho = await response.json();
            console.log("Eco do backend:", backendEcho);

            // Como httpbin não retorna predição, geramos uma simulação.
            prediction = {
                default: Math.random() < 0.5 ? 1 : 0,
                probability: Math.random()
            };
        } catch (erro) {
            console.error("Erro ao conectar com a API:", erro);
            alert("Erro ao conectar com a API. Verifique se ela está rodando.");
            return;
        }

        // Persistir resultado para leitura em resultado.html
        localStorage.setItem("resultado_api", JSON.stringify(prediction));

        // Feedback rápido antes de redirecionar
        alert(
            "Resultado: " +
            (prediction.default === 1 ? "Inadimplente" : "Adimplente") +
            "\nProbabilidade: " + (prediction.probability * 100).toFixed(2) + "%"
        );

        // Redireciona para página de resultado
        window.location.href = "resultado.html";
    });
});