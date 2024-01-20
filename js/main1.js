function toggleList() {
    var menuContainer = document.getElementById("menu-container");
    if (menuContainer.style.left === "0px") {
      menuContainer.style.left = "-300px";
    } else {
      menuContainer.style.left = "0px";
    }
  }
  
document.addEventListener("click", function (event) {
    var menuContainer = document.getElementById("menu-container");
    var target = event.target;

    var leftValue = window.getComputedStyle(menuContainer).getPropertyValue('left');

    // Jeśli kliknięto poza menu i menu jest otwarte, to schowaj menu
    if (!menuContainer.contains(target) && leftValue === "0px") {
        menuContainer.style.left = "-300px";
    }
});