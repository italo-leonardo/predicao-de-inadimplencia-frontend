// script.js
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // impede recarregar página

        // Coletar os valores do formulário
        const formData = new FormData(form);
        const payload = {};

        formData.forEach((value, key) => {
            // Converte números automaticamente
            if (!isNaN(value) && value.trim() !== "") {
                payload[key] = Number(value);
            } else {
                payload[key] = value;
            }
        });

        console.log("JSON enviado:", payload);

        try {
            const response = await fetch("https://httpbin.org/post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            console.log("Resposta do backend:", result);

            // Mostrando o resultado
            alert(
                "Resultado: " +
                (result.default === 1 ? "Inadimplente" : "Adimplente") +
                "\nProbabilidade: " +
                (result.probability * 100).toFixed(2) + "%"
            );

        } catch (erro) {
            console.error("Erro ao conectar com a API:", erro);
            alert("Erro ao conectar com a API. Verifique se ela está rodando.");
        }
    });

});
7