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