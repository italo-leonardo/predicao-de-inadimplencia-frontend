// script.js
document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // impede recarregar página

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

            // Mostrando o resultado (placeholder)
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
