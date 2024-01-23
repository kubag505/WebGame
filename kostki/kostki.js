document.addEventListener('DOMContentLoaded', function() {
  var elDiceOne = document.getElementById('dice1');
  var elDiceTwo = document.getElementById('dice2');
  var elComeOut = document.getElementById('roll');

  let balanceElement = document.getElementById('balance');
  let balanceValue = 1000;

  elComeOut.onclick = function () {
    setTimeout(function() {
      rollDice();
    }, 100);
  };

  function rollDice() {
    let betElement = document.getElementById('bet');
    let bet = parseInt(betElement.value);

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

    console.log(diceOne + ' ' + diceTwo);

    for (var i = 1; i <= 6; i++) {
      elDiceOne.classList.remove('show-' + i);
      if (diceOne === i) {
        elDiceOne.classList.add('show-' + i);
      }
    }

    for (var k = 1; k <= 6; k++) {
      elDiceTwo.classList.remove('show-' + k);
      if (diceTwo === k) {
        elDiceTwo.classList.add('show-' + k);
      }
    }

    setTimeout(function() {
      balanceElement = document.getElementById('zaklady').querySelector('#balance');

      if (balanceElement) {
        balanceElement.innerHTML = `Your balance is: ${balanceValue}`;
      } else {
        console.error("Element with id 'balance' not found!");
        document.write("Element with id 'balance' not found!");
      }
    }, 1000);
  }

  if (balanceElement) {
    balanceElement.innerHTML = `Your balance is: ${balanceValue}`;
  } else {
    console.error("Element with id 'balance' not found!");
    document.write("Element with id 'balance' not found!");
  }
});
  