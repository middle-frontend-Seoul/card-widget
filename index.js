//имя формы card_form

function onConsole(e) {
    e.preventDefault();
    const formData = new FormData(document.querySelector('form'))
    const object = {
        cardNumber: formData.get('card_number'),
        cardExpire: formData.get('card_expire'),
        cardName: formData.get('card_name'),
        cardSecret: formData.get('card_secret'),
    }
    console.log(object)
}

function validation() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('blur', checkInput);
    }
    const form = document.getElementById('registrationForm');
    if (form)
        form.addEventListener('submit', checkForm)
}

function checkInput(event) {
    let validationResult = '';
    if (event.target.name === 'card_number')
        validationResult = checkCardNumber(event.target.value)
    console.log(validationResult)
}

function checkCardNumber(number) {
    if (/\D/.test(number))
        return('Введите валидный номер карты')
    let paymentSystem = '';
    switch (number[0]) {
        case '2':
            paymentSystem = "MIR";
            break ;
        case '4':
            paymentSystem = "VISA";
            break ;
        case '5':
            paymentSystem = "MASTERCARD";
            break ;
        case '3':
            paymentSystem = "AMERICAN_EXPRESS";
            break ;
    }
    if (paymentSystem && paymentSystem !== 'AMERICAN_EXPRESS')
    {
        if (number.length === 16)
            return ('ok')
        else
            return ('Неверное число знаков')
    }
    else if (paymentSystem && paymentSystem === 'AMERICAN_EXPRESS')
    {
        if (number.length === 15)
            return ('ok')
        else
            return ('Неверное число знаков')
    }
    else
        return('Введите валидный номер карты')
}

function checkForm() {
    console.log('form_submited');
}

validation();