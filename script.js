document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loan-form");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

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

            // Convert number fields
            if (!isNaN(value) && value.trim() !== "") {
                payload[backendKey] = Number(value);
            } else {
                payload[backendKey] = value;
            }
        });

        console.log("JSON Enviado:", payload);

        try {
            const response = await fetch("http://localhost:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            localStorage.setItem("resultado_api", JSON.stringify(result));
            window.location.href = "resultado.html";

        } catch (error) {
            console.error("Erro ao enviar", error);
            alert("Erro ao conectar com a API.");
        }
    });

});
