let order = [];
let clickedOrder = [];
let score = 0;

const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

function playTone(frequency) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.3
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

const playSound = (element) => {
  switch (true) {
    case element.classList.contains("red"):
      playTone(329.63);
      break;
    case element.classList.contains("blue"):
      playTone(523.25);
      break;
    case element.classList.contains("green"):
      playTone(261.63);
      break;
    case element.classList.contains("yellow"):
      playTone(392.0);
      break;
    default:
      console.log("Cor não reconhecida.");
  }
};

let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
};

let lightColor = (element, number) => {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
    playSound(element);
  }, number - 250);

  setTimeout(() => {
    element.classList.remove("selected");
  }, number - 50);
};

let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

let click = (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

let createColorElement = (color) => {
  if (color == 0) {
    return green;
  } else if (color == 1) {
    return red;
  } else if (color == 2) {
    return yellow;
  } else if (color == 3) {
    return blue;
  }
};

let nextLevel = () => {
  score++;
  shuffleOrder();
};

let gameOver = () => {
  alert(
    `Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`
  );
  order = [];
  clickedOrder = [];

  playGame();
};

let playGame = () => {
  alert("Bem vindo ao Gênesis! Iniciando novo jogo!");
  score = 0;

  setTimeout(() => {
    nextLevel();
  }, 250);
};

green.onclick = () => {
  playTone(261.63);
  click(0);
};
red.onclick = () => {
  playTone(329.63);
  click(1);
};
yellow.onclick = () => {
  playTone(392.0);
  click(2);
};
blue.onclick = () => {
  playTone(523.25);
  click(3);
};

//inicio do jogo
playGame();
