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