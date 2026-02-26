const form = document.getElementById("my-form");
const statusMessage = document.getElementById("status-message");

form.addEventListener("submit", async function(event) {
    event.preventDefault(); // Останавливаем обычный переход на другую страницу
    
    const data = new FormData(event.target);
    
    // Отправляем данные на Formspree в фоновом режиме
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            // Если всё прошло успешно:
            statusMessage.innerHTML = "Votre demande a été enregistrée. Nous vous répondrons dans les plus brefs délais.";
            statusMessage.style.display = "block"; // Показываем сообщение
            statusMessage.style.backgroundColor = "#d4edda"; // Зеленый фон
            form.reset(); // Очищаем поля формы
            
            // Скрываем кнопку, чтобы не нажимали дважды
            form.querySelector('button').style.display = 'none'; 
        } else {
            // Если произошла ошибка
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    statusMessage.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    statusMessage.innerHTML = "Oups! Il y a eu un problème lors de l'envoi.";
                }
                statusMessage.style.display = "block";
                statusMessage.style.backgroundColor = "#f8d7da"; // Красный фон для ошибки
            })
        }
    }).catch(error => {
        statusMessage.innerHTML = "Oups! Connexion impossible au serveur.";
        statusMessage.style.display = "block";
        statusMessage.style.backgroundColor = "#f8d7da";
    });
});