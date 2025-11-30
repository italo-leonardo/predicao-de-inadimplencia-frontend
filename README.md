# Predição de Inadimplência – Sistema Completo (ML + API + Frontend)

>> Projeto que realiza predição de inadimplência usando Machine Learning, oferecendo:

# Modelo treinado
API em Django para processamento
Frontend em HTML/CSS/JS
Integração completa via JSON

O sistema permite que o usuário preencha dados financeiros e receba a previsão:

0 → Não inadimplente

1 → Inadimplente, com probabilidade estimada.

🔧 Tecnologias

# Backend
Python 3.11
Django + Django REST Framework
Scikit-Learn
XGBoost
Pandas / Numpy
CORS Headers
Frontend
HTML
CSS
JavaScript

# Live Server (VS Code)

🚀 Como Rodar o Backend
cd predicao-de-inadimplencia-backend
py -3.11 -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


API disponível em:
http://127.0.0.1:8000/api/predict/

🌐 Como Rodar o Frontend

Abra o projeto no VS Code

Clique em Go Live

Acesse:

http://127.0.0.1:5500/

📡 Estrutura do Sistema
Frontend → envia JSON → Backend Django → modelo ML → retorna predição


Resposta da API:

{
    "predicao_classe": 1,
    "probabilidade_inadimplencia": 0.67
}

🧠 Modelo

Foram testados vários algoritmos:
Random Forest
XGBoost
LightGBM
Bagging
O modelo final foi escolhido considerando:
F1-Score
Recall
AUC
Precisão