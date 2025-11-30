// script.js
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // impede recarregar página
        const submitBtn = document.getElementById("submit-btn");
        if (submitBtn) submitBtn.setAttribute("aria-busy", "true");

        // Validação simples: marcar campos vazios
        const invalids = [];
        form.querySelectorAll("input[required], select[required]").forEach(el => {
            const empty = (el.value === null || el.value === "");
            el.style.borderColor = empty ? "#ef4444" : "var(--border)";
            if (empty) invalids.push(el);
        });
        if (invalids.length) {
            alert("Por favor, preencha os campos obrigatórios.");
            if (submitBtn) submitBtn.removeAttribute("aria-busy");
            invalids[0].focus();
            return;
        }

        // Coletar os valores do formulário
        const formData = new FormData(form);

        // MAPEAMENTO do nome do campo HTML → nome esperado pelo backend
        const mapping = {
            "loan_amount": "Amount",
            "funded_amount_investor": "Funded Amount Investor",
            "interest_rate": "Interest Rate",
            "salary": "Salary",
            "debt_to_income": "Debit to Income",
            "open_account": "Open Account",
            "total_accounts": "Total Accounts",
            "total_received_interest": "Total Received Interest",
            "total_received_late_fee": "Total Received Late Fee",
            "recoveries": "Recoveries",
            "collection_recovery_fee": "Collection Recovery Fee",
            "last_week_pay": "Last week Pay",
            "total_collection_amount": "Total Collection Amount",
            "balance": "Balance",
            "grade": "Grade",
            "sub_grade": "Sub Grade",
            "home_ownership": "HomeOwnership",
            "verification_status": "Verification Status",
            "initial_list_status": "Initial List Status"
        };

        const payload = {};

        // Criando JSON final com os nomes exatos do backend
        formData.forEach((value, key) => {
            const backendKey = mapping[key];
            if (!backendKey) return;

            // Converte números automaticamente
            if (!isNaN(value) && value.toString().trim() !== "") {
                payload[backendKey] = Number(value);
            } else {
                payload[backendKey] = value;
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

            // Simula retorno do backend (httpbin ecoa os dados). Vamos criar um resultado fake
            const fake = {
                default: Math.random() < 0.5 ? 1 : 0,
                probability: Number((0.5 + Math.random() * 0.5).toFixed(2))
            };

            // Salva no localStorage e navega para resultado
            localStorage.setItem("resultado_api", JSON.stringify(fake));
            window.location.href = "resultado.html";

        } catch (erro) {
            console.error("Erro ao conectar com a API:", erro);
            alert("Erro ao conectar com a API. Verifique se ela está rodando.");
        }

        if (submitBtn) submitBtn.removeAttribute("aria-busy");
    });

});
