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
    if (event.target.name === 'card_number') {
      const cardNumberValidation = checkCardNumber(event.target.value)
      const errorEl = document.getElementById('card_number_feedback');
      if (cardNumberValidation === 'ok') {
        errorEl.className = 'form__feedback'
        errorEl.textContent = ''
      } else {
        errorEl.className = 'form__feedback form__feedback_type_error'
        errorEl.textContent = cardNumberValidation
      }
      console.log(cardNumberValidation);
    }
    if (event.target.name === 'card_name') {
      const cardNameValidation = checkCardName(event.target.value)
      const errorEl = document.getElementById('card_name_feedback');
      if (cardNameValidation === 'ok') {
        errorEl.className = 'form__feedback'
        errorEl.textContent = ''
      } else {
        errorEl.className = 'form__feedback form__feedback_type_error'
        errorEl.textContent = cardNameValidation
      }
      console.log(cardNameValidation)
    }
    if (event.target.name === 'card_secret') {
      const cardSecretValidation = checkCardSecret(event.target.value)
      const errorEl = document.getElementById('card_secret_feedback');
      if (cardSecretValidation === 'ok') {
        errorEl.className = 'form__feedback'
        errorEl.textContent = ''
      } else {
        errorEl.className = 'form__feedback form__feedback_type_error'
        errorEl.textContent = cardSecretValidation
      }
      console.log(cardSecretValidation)
    }
    if (event.target.name === 'card_expire') {
      const cardExpireValidation = checkCardExpire(event.target.value)
      const errorEl = document.getElementById('card_expire_feedback');
      if (cardExpireValidation === 'ok') {
        errorEl.className = 'form__feedback'
        errorEl.textContent = ''
      } else {
        errorEl.className = 'form__feedback form__feedback_type_error'
        errorEl.textContent = cardExpireValidation
      }
      console.log(cardExpireValidation)
    }
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

function checkCardSecret(number) {
    if (/\D/.test(number))
        return('Введите валидный код')
    if (number.length === 3)
    {
        return ('ok')
    }
    else
        return('Введите валидный код')
}

function checkCardExpire(number) {
    const array = name.split('/');
    if (array.length !== 2)
        return ('Ошибка формата: MM YY')
    if (/\D/.test(array[0]) || /\D/.test(array[1]))
        return('Введены неверные символы')
    return ('ok')
}

function checkForm() {
    console.log('form_submited');
}

validation();