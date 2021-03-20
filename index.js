document.addEventListener('DOMContentLoaded', main);
document.addEventListener('submit', formSubmit);

function main() {
  console.log('DOM has been loaded');
  
}

function formSubmit(event) {
  event.preventDefault();

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
    if (event.target.name === 'card_name')
        validationResult = checkCardName(event.target.value)
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

function checkCardName(name) {
    const array = name.split(' ');
    const reg = new RegExp("^.*[^A-z].*$");
    console.log(reg.test(array[0]))
    if (array.length !== 2)
        return ('Ошибка формата: ИМЯ ФАМИЛИЯ')
    if (reg.test(array[0]) || reg.test(array[1]))
        return('Введены неверные символы')
    return ('ok')
}

function checkForm() {
    console.log('form_submited');
}

validation();