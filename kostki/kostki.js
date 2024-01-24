  let balance = 1000;

function rollDice() {
  const bet = document.getElementById("bet").value;
  if (bet > balance) {
    alert("Insufficient balance.");
    return;
  }

  balance -= bet;
  document.getElementById("balance").innerHTML = balance;

  const dice1 = Math.floor(Math.random() * 6) + 1;
  const dice2 = Math.floor(Math.random() * 6) + 1;
  const sum = dice1 + dice2;

  const even = (sum % 2 === 0);
  const odd = !even;
  const one_four = (sum>=1 && sum<=4);
  const five_eight = (sum>=5 && sum<=8);
  const nine_twelve = (sum>=9 && sum<=12);
  const one_six = (sum>=1 && sum<=6);
  const seven_twelve = (sum>=7 && sum<=12);
  const pair = dice1 === dice2;

  document.getElementById("result").innerHTML = `Dice 1: ${dice1}<br>Dice 2: ${dice2}<br>Sum: ${sum}<br>Even: ${even}<br>Odd: ${odd}`;

  if ((document.getElementById('one_four').checked) && one_four === true) {
    balance += bet * 3;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } else if ((document.getElementById('five_eight').checked) && five_eight === true) {
    balance += bet * 3;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } else if ((document.getElementById('nine_twelve').checked) && nine_twelve === true) {
    balance += bet * 3;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  }
  else if((document.getElementById('one_six').checked) && one_six=== true){
    balance += bet * 2;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } 
  else if((document.getElementById('seven_twelve').checked) && seven_twelve=== true){
    balance += bet * 2;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } 
  else if ((document.getElementById('pair').checked) && pair === true) {
    balance += bet * 6;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } 

  else if((document.getElementById('odd').checked) && odd=== true){
    balance += bet * 2;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } 
  else if((document.getElementById('even').checked) && even=== true){
    balance += bet * 2;
    document.getElementById("balance").innerHTML = balance;
    alert("You won!");
  } 
  else {
    console.log("you lose")
  }

}