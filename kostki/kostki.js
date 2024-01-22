function rollDice() {
    // Generate a random number between 1 and 6 (representing the faces of a die)
    const kosc1 = Math.floor(Math.random() * 6) + 1;
    const kosc2 = Math.floor(Math.random() * 6) + 1;

    // Display the rolled number on the dice element
    const rzut1 = document.getElementById('kostka1');
    const rzut2 = document.getElementById('kostka2');
    rzut1.textContent = `kostka nr 1: ${kosc1}`;
    rzut2.textContent = `kostka nr 2: ${kosc2}`;
}
