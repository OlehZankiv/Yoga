function form () {
  
  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  };

  let statusMessage = document.createElement('div');

  let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input');

  statusMessage.classList.add('status');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    form.appendChild(statusMessage);

    function postData() {
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.onreadystatechange = function () {
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4) {
            resolve();
          } else {
            reject();
          }
        };
        request.send(json);
      });
    }
    postData()
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(() => clearInput(input));
  });

  let formC = document.querySelector('.contact-form #form'),
    inputC = form.getElementsByTagName('input');

  statusMessage.classList.add('status');

  formC.addEventListener('submit', function (event) {
    event.preventDefault();
    formC.appendChild(statusMessage);

    function postData() {
      return new Promise(function (resolve, reject) {
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(formC);

        let obj = {};
        formData.forEach(function (value, key) {
          obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.onreadystatechange = function () {
          statusMessage.style.color = "white";
          statusMessage.style.marginTop = "15px";
          if (request.readyState < 4) {
            resolve();
          } else if (request.readyState === 4) {
            resolve();
          } else {
            reject();
          }
        };
        request.send(json);
      });
    }
    postData()
      .then(() => statusMessage.innerHTML = message.loading)
      .then(() => statusMessage.innerHTML = message.success)
      .catch(() => statusMessage.innerHTML = message.failure)
      .then(() => clearInput(inputC));
  });

  function clearInput(arr = []) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].value = "";
    }
  }

}

module.exports = form;