document.addEventListener('DOMContentLoaded', function() {
  var elDiceOne = document.getElementById('dice1');
  var elDiceTwo = document.getElementById('dice2');
  var elComeOut = document.getElementById('roll');

  let balanceElement = document.getElementById('balance');
  let balanceValue = 1000;

  let betInput = document.getElementById('bet');
  let betOptions = document.getElementsByName('bet-option');

  elComeOut.onclick = function () {
    setTimeout(function() {
      rollDice();
    }, 100);
  };

  function rollDice() {
    let bet = parseInt(betInput.value);

    if (isNaN(bet) || bet <= 0) {
      window.alert("Invalid bet amount");
      return;
    }

    if (bet > balanceValue) {
      window.alert("Balance too low");
      return;
    }

    balanceValue -= bet;

    var diceOne = Math.floor((Math.random() * 6) + 1);
    var diceTwo = Math.floor((Math.random() * 6) + 1);

    animateDice(elDiceOne, diceOne);
    animateDice(elDiceTwo, diceTwo);

    setTimeout(function() {
      balanceElement = document.getElementById('zaklady').querySelector('#balance');

      if (balanceElement) {
        balanceElement.innerHTML = `Your balance is: ${balanceValue}`;
      } else {
        console.error("Element with id 'balance' not found!");
        document.write("Element with id 'balance' not found!");
      }
    }, 1000);

    let selectedBetOption = getSelectedBetOption();
    checkBetResult(diceOne, diceTwo, bet, selectedBetOption);
  }

  function animateDice(element, value) {
    for (var i = 1; i <= 6; i++) {
      element.classList.remove('show-' + i);
      if (value === i) {
        element.classList.add('show-' + i);
      }
    }
  }

  function checkBetResult(diceOne, diceTwo, bet, selectedBetOption) {
    let totalValue = diceOne + diceTwo;

    // Sprawdzenie wybranego zakładu
    if (!selectedBetOption) {
      window.alert("Please select a bet option");
      return;
    }

    // Logika sprawdzania wyniku zakładu
    if (selectedBetOption.condition(totalValue, diceOne, diceTwo)) {
      balanceValue += bet * 2; // Wygrana

      // Aktualizacja wyświetlanego balansu
      if (balanceElement) {
        balanceElement.innerHTML = `Your balance is: ${balanceValue}`;
      } else {
        console.error("Element with id 'balance' not found!");
        document.write("Element with id 'balance' not found!");
      }
    }
  }

  function getSelectedBetOption() {
    for (let i = 0; i < betOptions.length; i++) {
      if (betOptions[i].checked) {
        return betOptionConditions[betOptions[i].id];
      }
    }
    return null;
  }

  // Obiekty z warunkami zakładów
  const betOptionConditions = {
    parzyste: (totalValue) => totalValue % 2 === 0,
    nieparzyste: (totalValue) => totalValue % 2 !== 0,
    jeden_cztery: (totalValue) => totalValue >= 1 && totalValue <= 4,
    piec_osiem: (totalValue) => totalValue >= 5 && totalValue <= 8,
    dziewiec_dwan: (totalValue) => totalValue >= 9 && totalValue <= 12,
    jeden_szesc: (totalValue) => totalValue >= 1 && totalValue <= 6,
    siedem_dwan: (totalValue) => totalValue >= 7 && totalValue <= 12,
    para: (totalValue, diceOne, diceTwo) => diceOne === diceTwo,
  };

  if (balanceElement) {
    balanceElement.innerHTML = `Your balance is: ${balanceValue}`;
  } else {
    console.error("Element with id 'balance' not found!");
    document.write("Element with id 'balance' not found!");
  }
});
