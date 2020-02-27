window.addEventListener("DOMContentLoaded", function () {
  "use strict"

  timer("2020-03-05", "#timer", ".hours", ".minutes", ".seconds");
  modalWindow(".more", ".overlay", ".popup-close");
  
  //Tabs
  switchTab(".info-tabcontent", ".info-header-tab", ".info-header");
  function switchTab(tabSelector, blockButtonSelector, switchButtonSelector) {
    let tab = document.querySelectorAll(tabSelector),
      infoHeaderTab = document.querySelectorAll(blockButtonSelector),
      infoHeader = document.querySelector(switchButtonSelector);

    hideAllTabs();
    showTab(tab[0]);

    function hideAllTabs() {
      for (let i = 0; i < tab.length; i++) {
        tab[i].classList.remove("show");
        tab[i].classList.add("hide");
      }
    }

    function showTab(tab) {
      tab.classList.remove("hide");
      tab.classList.add("show");
    }

    infoHeader.addEventListener("click", function (event) {
      let target = event.target;
      for (let i = 0; i < infoHeaderTab.length; i++) {
        if (target == infoHeaderTab[i]) {
          hideAllTabs();
          showTab(tab[i]);
          break;
        }
      }
    });
  }

  //Timer
  function timer(deadLine, timerBlockSelector, hoursSelector, minutesSelector, secondsSelector) {

    function getTimeRemaining() {
      let t = Date.parse(deadLine) - Date.parse(new Date()),
        sec = startZero(Math.floor((t / 1000) % 60)),
        min = startZero(Math.floor((t / 1000 / 60) % 60)),
        hours = startZero(Math.floor(t / 1000 / 60 / 60));

      return {
        "total": t,
        "hour": hours,
        "min": min,
        "sec": sec
      };
    }

    function setClock() {
      let timer = document.querySelector(timerBlockSelector),
        hours = timer.querySelector(hoursSelector),
        min = timer.querySelector(minutesSelector),
        sec = timer.querySelector(secondsSelector),
        timeIntervar = setInterval(uppdateClock, 1000);

      function uppdateClock() {
        let t = getTimeRemaining();
        hours.textContent = t.hour;
        min.textContent = t.min;
        sec.textContent = t.sec;

        if (t.total <= 0) {
          clearInterval(timeIntervar);
          hours.textContent = "00";
          min.textContent = "00";
          sec.textContent = "00";
          ifTimeOutAnimation();
        }
      }
    }

    function ifTimeOutAnimation() {
      let persent = 100,
        transit = true;
      setInterval(transition, 25);

      function transition(selector = document.querySelector(timerBlockSelector)) {
        if (transit) {
          persent -= 3;
          selector.style.opacity = persent + "%";
          if (persent <= 45) {
            transit = false;
          }
        } else {
          persent += 5;
          selector.style.opacity = persent + "%";
          if (persent >= 95) {
            transit = true;
          }
        }
      }
    }

    setClock();

    //help function
    function startZero(num) {
      if (num < 10) {
        return "0" + num;
      }
      return num;
    }
  }

  //Modal
  function modalWindow(buttonMoreSelector, overlaySelector, closeOverlaySelector) {
    let more = document.querySelector(buttonMoreSelector),
      overlay = document.querySelector(overlaySelector),
      close = document.querySelector(closeOverlaySelector);

    let buttons = document.querySelectorAll(".description-btn");

    buttons.forEach(function (item) {
      item.addEventListener("click", function () {
        overlay.style.display = "block";
        item.classList.add("more-splash");
        document.body.style.overflow = "hidden";
      })
    });

    more.addEventListener("click", function () {
      overlay.style.display = "block";
      more.classList.add("more-splash");
      document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function () {
      overlay.style.display = "none";
      more.classList.remove("more-splash");
      document.body.style.overflow = "";
    });
  }


  // Form

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

  //Slider

  let slideIndex = 1,
    slides = document.querySelectorAll(".slider-item"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides();

  function showSlides() {
    if (slideIndex > slides.length) {
      slideIndex = 1;
    } else if (slideIndex < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => {
      item.style.display = "none";
    });
    dots.forEach((item) => {
      item.classList.remove("dot-active");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  dotsWrap.addEventListener("click", (event) => {
    dots.forEach((item, i) => {
      if (event.target == item) {
        slideIndex = i + 1;
        showSlides();
      }
    });
  });

  next.addEventListener("click", () => {
    slideIndex++;
    showSlides();
  });

  prev.addEventListener("click", () => {
    slideIndex--;
    showSlides();
  });

  //Calc

  let persons = document.querySelectorAll(".counter-block-input")[0],
    restDays = document.querySelectorAll(".counter-block-input")[1],
    place = document.querySelector("#select"),
    totalValue = document.querySelector("#total"),
    personsSum = 0,
    daysSum = 0,
    total = 0;

  persons.addEventListener("input", function () {
    personsSum = +this.value;
    if (restDays.value != "" && persons.value != 0 &&
      +persons.value != 0 && +restDays.value != 0 &&
      !isNaN(this.value) && !isNaN(restDays.value)) {
      total = (personsSum * 2000) * daysSum;
      totalValue.textContent = total;
    } else {
      totalValue.textContent = 0;
    }
  });

  restDays.addEventListener("input", function () {
    daysSum = +this.value;
    if (persons.value != "" && restDays.value != "" &&
      +persons.value != 0 && +restDays.value != 0 &&
      !isNaN(this.value) && !isNaN(persons.value)) {
      total = (personsSum * 2000) * daysSum;
      totalValue.textContent = total;
    } else {
      totalValue.textContent = 0;
    }
  });

  place.addEventListener("change", function () {
    if (persons.value !== "" && restDays.value !== "" &&
      !isNaN(restDays.value) && !isNaN(persons.value)) {
      totalValue.textContent = total * this.options[this.selectedIndex].value;
    }
  });

});