
let globalFormData;

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
        formData.append('filterParameter', 0);


        fetch('http://localhost:8081/MovieRentalSystem/controllers/UserLoginController.php', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.resultMessage==='Login_Success'){
                    window.location.href = 'dashBoard.html';
                }else{
                    showAlert(data.resultMessage);
                }

            })
            .catch(error => console.error('Error:', error));
    });
});

document.querySelectorAll('.movieForgotPassword').forEach(form => {
    form.addEventListener('submit', async function(event)  {
        event.preventDefault();
        const formData = new FormData(this);
        globalFormData=formData;
        formData.append('filterParameter', 1);
        const password = formData.get('newPassword');
        const confirmPassword = formData.get('confirmNewPassword');

        if(password===confirmPassword){
            fetch('http://localhost:8081/MovieRentalSystem/controllers/UserLoginController.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.resultMessage === 'verification code sent.') {
                       showPromptBox();
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

function showAlert(message) {
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

function showPromptBox() {
    const promptBox = document.getElementById('prompt-box');
    promptBox.style.display = 'flex';

    document.getElementById('submit-btn').addEventListener('click', function() {
        const num1 = document.getElementById('num1').value;
        const num2 = document.getElementById('num2').value;
        const num3 = document.getElementById('num3').value;
        const num4 = document.getElementById('num4').value;
        const newPassword=globalFormData.get('newPassword');
        const email=globalFormData.get('email');
        // console.log(num1,num2,num3,num4)
        console.log(globalFormData)
        if (num1 && num2 && num3 && num4) {
            const globalFormData = new FormData();
            globalFormData.append('num1', num1);
            globalFormData.append('num2', num2);
            globalFormData.append('num3', num3);
            globalFormData.append('num4', num4);
            globalFormData.append('filterParameter', 2);
            globalFormData.append('newPassword', newPassword);
            globalFormData.append('email', email);

            fetch('http://localhost:8081/MovieRentalSystem/controllers/UserLoginController.php', {
                method: 'POST',
                body: globalFormData
            })
                .then(response => response.json())
                .then(data => {
                        showAlert(data.resultMessage);

                })
                .catch(error => console.error('Error:', error));

            promptBox.style.display = 'none';
        } else {
            alert('Please enter all 4 numbers.');
        }
    });
}





