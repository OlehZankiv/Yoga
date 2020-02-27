/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/parts/calc.js":
/*!**************************!*\
  !*** ./js/parts/calc.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc() {
  
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
}

module.exports = calc;

/***/ }),

/***/ "./js/parts/form.js":
/*!**************************!*\
  !*** ./js/parts/form.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./js/parts/modal.js":
/*!***************************!*\
  !*** ./js/parts/modal.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modal() {

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
}

module.exports = modal;

/***/ }),

/***/ "./js/parts/slider.js":
/*!****************************!*\
  !*** ./js/parts/slider.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider() {

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
}

module.exports = slider;

/***/ }),

/***/ "./js/parts/tabs.js":
/*!**************************!*\
  !*** ./js/parts/tabs.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs() {
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
}

module.exports = tabs;

/***/ }),

/***/ "./js/parts/timer.js":
/*!***************************!*\
  !*** ./js/parts/timer.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer() {

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
}

module.exports = timer;

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener("DOMContentLoaded", function () {
  "use strict";

  let calc = __webpack_require__(/*! ./parts/calc.js */ "./js/parts/calc.js"),
    form = __webpack_require__(/*! ./parts/form.js */ "./js/parts/form.js"),
    modal = __webpack_require__(/*! ./parts/modal.js */ "./js/parts/modal.js"),
    slider = __webpack_require__(/*! ./parts/slider.js */ "./js/parts/slider.js"),
    tabs = __webpack_require__(/*! ./parts/tabs.js */ "./js/parts/tabs.js"),
    timer = __webpack_require__(/*! ./parts/timer.js */ "./js/parts/timer.js");

  calc();
  form();
  modal();
  slider();
  tabs();
  timer();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map