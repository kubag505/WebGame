/* controls elements available user (canvas UI) */
const canvasUI = {
    start: document.querySelector('.btn--start'),
    cashAmount: document.getElementById('cashAmount'),
    betAmount: document.getElementById('betInput'),
  };
  
  let values = [];
  for (let i = 0; i <= 7; i++) values.push(i);
  /* main game object */
  const GAME = {
    defCash: 100,
    bet: 10,
    values,
    random: []
  };
  GAME.cash = GAME.defCash;
  
  /* init canvas */
  const canva = document.getElementById('canva');
  const ctx = canva.getContext('2d');
  
  /* init UI */
  canvasUI.cashAmount.innerHTML = GAME.cash;
  canvasUI.betAmount.innerHTML = GAME.bet;
  
  /* Settings display */
  refreshRender();
  
  window.onresize = refreshRender;
  
  function refreshRender() {
    setDisplayCanvas();
    setDisplayCanvasUI();
    computePosElems();
    renderCanvas(); // because canvas will reset
  }
  /* Settings display canvas */
  function setDisplayCanvas() { // 4x3
    canva.width = canva.parentNode.clientWidth;
    canva.height = canva.width * 3/4;
  }
  /* Settings display canvas UI elements */
  function setDisplayCanvasUI() {
    /* Button Start */
    let btnStartFSize = canva.width / 25;
    canvasUI.start.style.fontSize = btnStartFSize + 'px';
    canvasUI.start.style.padding = `${btnStartFSize/4}px ${btnStartFSize}px`;
    canvasUI.start.style.left = canva.width / 2 - canvasUI.start.clientWidth / 2 + 'px';
  }
  /* Display current state on canvas */
  function renderCanvas() {
    // это в отличии от clearRect помогает избедать потери fps
    canva.width = canva.parentNode.clientWidth;
    
    for (let drum = 1; drum <= 3; drum++) {
      GAME[`drum${drum}`].draw();
    }
  }
  /* Compute position of display elements */
  function computePosElems() {
    const { width, height } = canva;
    
    computeDrums(width, height);
  }
  /* Compute position of display Drums */
  function computeDrums(width, height) {
    const drumOpts = {
      w: width*0.25, h: height*0.35,
      values: GAME.values,
      ctx
    };
    drumOpts.x = width*0.25 / 2;
    drumOpts.y = height*0.2 + canvasUI.start.clientHeight / 2;
    
    GAME.drum1 = GAME.drum1 ? GAME.drum1.setting(drumOpts) : new Drum(drumOpts);
    drumOpts.x += drumOpts.w;
    GAME.drum2 = GAME.drum2 ? GAME.drum2.setting(drumOpts) : new Drum(drumOpts);
    drumOpts.x += drumOpts.w;
    GAME.drum3 = GAME.drum3 ? GAME.drum3.setting(drumOpts) : new Drum(drumOpts);
  }
  

  
  
    canvasUI.start.onclick = () => {
      if (GAME.bet > GAME.cash) {
        alert("Not enough cash to place this bet.");
        canvasUIUI.start.disabled=true;
        return;
      }
      else
    
      // Continue with the game logic here
    
      canvasUI.start.disabled = true;
      if (GAME.cash == 0) GAME.cash = GAME.defCash;
    
      GAME.cash -= GAME.bet;
      (new Animation()).add({
        duration: 800, cb: changeCashByProgress
      }).start();
    
      const Anim = new Animation();
      let duration = 0;
      let step = 1500;
    
    for (let i = 1; i <= 3; i++) {
      GAME.random[i - 1] = ~~(Math.random() * GAME.values.length) + GAME.values.length*i;
      duration += step;
      step *= .9;
      
      Anim.add({ duration, timing: 'ease-out',
        cb: (progress) => {
          let currentTurn = GAME.random[i - 1] * progress;
          GAME[`drum${i}`].turn(currentTurn);
          
          if (progress > .99) GAME[`drum${i}`].isStopped = true;
          else GAME[`drum${i}`].isStopped = false;
        }
      });
    }
    
    Anim.add({
      duration, cb: renderCanvas
    }).execAtEnd(() => {
      const combo = [];
      for (let i = 1; i <= 3; i++) {
        combo.push(GAME[`drum${i}`].currentValue);
      }
  
      GAME.cash += getWinnnings(combo);
      (new Animation()).add({
        duration: 800, cb: changeCashByProgress
      }).start();
  
      canvasUI.start.disabled = false;
    }).start();
  };
  
  function changeCashByProgress(progress) {
    if (progress <= .5) {
      canvasUI.cashAmount.style.opacity = 1 - progress * 2;
    }
    else {
      canvasUI.cashAmount.innerHTML = GAME.cash;
      canvasUI.cashAmount.style.opacity = progress * 2 - 1;
    }
  }
  
  function getWinnnings(combo = [], bet = 10) {
    let defRes = 0;
    // user faild
    if (res.weight < 1) return defRes;
  
    const winnnings = { // weight -> val
      '1': { '7': 0 },
      '2': {
        '1': GAME.bet*1.05, '2': GAME.bet*1.05, '3':  GAME.bet*1.05, '4':  GAME.bet*1.05,
        '5':  GAME.bet*1.05, '6': GAME.bet*1.05, '7':  GAME.bet*1.2
      },
      '3': {
        '1':  GAME.bet*2, '2': GAME.bet*2, '3': GAME.bet*2, '4': GAME.bet*2,
        '5': GAME.bet*2, '6': GAME.bet*2, '7': GAME.bet*10
      }
    };
    
    if (winnnings[res.weight] && winnnings[res.weight][res.val]) {
      return winnnings[res.val] * GAME.bet*0.01;
    }
    
    return defRes;
  }
  /* return weight combo */

  