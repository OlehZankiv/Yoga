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