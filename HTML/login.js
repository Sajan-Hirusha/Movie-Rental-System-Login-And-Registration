


document.querySelectorAll('.movieRegistration').forEach(form => {
    form.addEventListener('submit', async function(event)  {
        event.preventDefault();
        const formData = new FormData(this);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if(password===confirmPassword){
            fetch('http://localhost:8081/MovieRentalSystem/controllers/UserRegistrationController.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.resultMessage === 'verificationProcessRunning...') {
                        window.location.href = 'verification.html';
                    } else {
                        showAlert(data.resultMessage);
                    }
                })
                .catch(error => console.error('Error:', error));
        }else{
            showAlert("Passwords Not Match!");
        }

    });
});

document.querySelectorAll('.movieLogin').forEach(form => {
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        formData.append('filterParameter', 0); // Append the extra parameter

        fetch('http://localhost:8081/MovieRentalSystem/controllers/UserLoginController.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                    showAlert(data.resultMessage);
            })
            .catch(error => console.error('Error:', error));
    });
});


function showAlert(message) {
    console.log(message)
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.textContent = message;
    alertContainer.style.display = 'block';

    setTimeout(function() {
        alertContainer.style.animation = 'slideOutRight 0.5s ease-out forwards';
        setTimeout(function() {
            alertContainer.style.display = 'none';
            alertContainer.style.animation = 'slideInRight 0.5s ease-out forwards';
        }, 500);
    }, 5000);
}


