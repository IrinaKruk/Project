"use strict"

let score = document.getElementById('score'); // создаем div для счёта 
score.style.height = 60 + 'px'; // задаём высоту для счёта 
score.style.width = 700 + 'px'; // задаём ширину для счёта 
score.style.display = 'inline-flex'; // задаём ширину для счёта 
score.style.alignItems = 'center';
score.style.justifyContent = 'space-around';
score.style.fontSize = 60 + 'px';
score.style.fontWeight = 'bolt';

let leftScore = document.getElementById('leftScore'); // создаем div для счёта
let leftGameScores = 0;
let rightScore = document.getElementById('rightScore'); // создаем div для счёта
let rightGameScores = 0;
leftScore.innerText = leftGameScores; // счёт
rightScore.innerText = rightGameScores; // счёт

let input = document.createElement('input'); // создаём кнопку 'cтарт'"
input.style.height = 40 + 'px'; // задаём высоту для кнопки
input.style.width = 60 + 'px'; // задаём ширину для кнопки
input.style.background = 'ligthgrey'; // задаём цвет для кнопки
input.type = 'button';
input.value = 'Старт!';
input.addEventListener("click", start, false);
score.prepend(input); //вставляем кнопку на страницу

let field = document.getElementById('yellow'); // получаем canvas с ID "yellow"
field.setAttribute("height", '400'); // задаём высоту 
field.setAttribute("width", '700'); // задаём ширину
let context = field.getContext('2d');
context.fillStyle = 'yellow';
context.fillRect(0, 0, field.width, field.height);
context.fillStyle = 'green';
context.fillRect(0, 0, 10, 100);
context.fillStyle = 'blue';
context.fillRect(690, 0, 10, 100);
context.strokeStyle = 'red';
context.beginPath();
context.arc(350, 200, 15, 0, Math.PI * 2, false);
context.stroke();
context.fillStyle = 'red';
context.fill();

let gameState = 0;
// 0 - игра не начата
// 1 - мяч летает
// 2 - зафиксирован гол

let rightRacket = {
   posX: 690,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let rightPositionX = this.posX;
      let rightPositionY = this.posY;
      context.fillStyle = 'blue';
      context.fillRect(rightPositionX, rightPositionY, 10, 100);
   }
}

let leftRacket = {
   posX: 0,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let leftPositionX = this.posX;
      let leftPositionY = this.posY;
      context.fillStyle = 'green';
      context.fillRect(leftPositionX, leftPositionY, 10, 100);
   }
}

let ball = {
   posX: 350,
   posY: 200,
   speedX: 1,
   speedY: 1,
   width: 30,
   height: 30,
   update: function () {
      context.beginPath();
      let ballPositionX = this.posX;
      let ballPositionY = this.posY;
      context.strokeStyle = 'red';
      context.beginPath();
      context.arc(ballPositionX, ballPositionY, 15, 0, Math.PI * 2, false);
      context.stroke();
      context.fillStyle = 'red';
      context.fill();
   }
};

field = {
   width: 700,
   height: 400
};

let RAF =
   // находим, какой метод доступен
   window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   // ни один не доступен
   // будем работать просто по таймеру

   function (callback) { window.setTimeout(callback, 1000 / 60); }
   ;

let anim;

function start() {
   if (gameState !== 1) {
      ball.posX = 350;
      ball.posY = 200;
      ball.speedX = 1;
      ball.speedY = 1;
   }
   anim = RAF(tick);
}

function tick() {

   cancelAnimationFrame(anim); //останавливанием предыдущий таймер

   context.fillStyle = 'yellow';
   context.fillRect(0, 0, field.width, field.height);

   ball.posX += ball.speedX;
   // вылетел ли мяч правее стены?
   if (ball.posX + ball.width / 2 > field.width) {
      ball.speedX = 0;
      ball.speedY = 0;
      leftRacket.speedY = 0;
      rightRacket.speedY = 0;
      ball.posX = field.width - ball.width / 2;
      rightGameScores++;
      rightScore.innerHTML = rightGameScores; // счёт
      gameState = 2; // зафиксирован гол
      console.log(ball.speedX);
      console.log(ball.speedY);
      console.log(gameState);
   }

   // вылетел ли мяч левее стены?
   if ((ball.posX - ball.width / 2) < 0) {
      ball.speedX = 0;
      ball.speedY = 0;
      ball.posX = ball.width / 2;
      leftGameScores++;
      leftScore.innerHTML = leftGameScores;
      gameState = 2; // зафиксирован гол
      //console.log(leftScore);
   }

   ball.posY += ball.speedY;
   // вылетел ли мяч ниже пола?
   if (ball.posY + ball.height / 2 > field.height) {
      ball.speedY = -ball.speedY;
      ball.posY = field.height - ball.height / 2;
   }
   // вылетел ли мяч выше потолка?
   if (ball.posY - ball.height / 2 < 0) {
      ball.speedY = -ball.speedY;
      ball.posY = ball.height / 2;
   }

   // проверка на касание мячиком правой рокетки

   if (ball.posX - ball.width / 2 < rightRacket.posX + rightRacket.width &&
      ball.posX + ball.width / 2 > rightRacket.posX &&
      ball.posY + ball.height / 2 < rightRacket.posY + rightRacket.height &&
      ball.posY + ball.height / 2 > rightRacket.posY) {
      ball.speedX = -ball.speedX;
      ball.posX = rightRacket.posX - ball.width / 2;
   }
   // проверка на касание мячиком левой рокетки

   if (ball.posX - ball.width / 2 < leftRacket.posX + leftRacket.width &&
      ball.posY + ball.height / 2 < leftRacket.posY + leftRacket.height &&
      ball.posY - ball.height / 2 > leftRacket.posY) {
      ball.speedX = -ball.speedX;
      ball.posX = leftRacket.posX + leftRacket.width + ball.width / 2;
   }

   // проверка на касание рокетками пола и потолка

   rightRacket.posY += rightRacket.speedY;
   // вышла ли правая рокетка ниже пола?
   if (rightRacket.posY + rightRacket.height > field.height) {
      rightRacket.speedY = 0;
      rightRacket.posY = field.height - rightRacket.height;
   }

   // вышла ли правая рокетка выше потолка?
   if (rightRacket.posY < 0) {
      rightRacket.speedY = 0;
      rightRacket.posY = 0;
   }

   leftRacket.posY += leftRacket.speedY;
   // вышла ли правая рокетка ниже пола?
   if (leftRacket.posY + leftRacket.height > field.height) {
      leftRacket.speedY = 0;
      leftRacket.posY = field.height - leftRacket.height;
   }

   // вышла ли правая рокетка выше потолка?
   if (leftRacket.posY < 0) {
      leftRacket.speedY = -leftRacket.speedY;
      leftRacket.posY = 0;
   }

   leftRacket.update();
   rightRacket.update();
   ball.update();

   RAF(tick);
}
leftRacket.update();
rightRacket.update();
ball.update();


document.addEventListener('keydown', function (e) { // следим за нажатием клавиш

   if (e.key === 'ArrowUp') { //если нажата клавиша вверх
      rightRacket.speedY = -3;// двигаем рокетки вверх
   }
   if (e.key === 'Shift') { //если нажата клавиша вверх
      leftRacket.speedY = -3;// двигаем рокетки вверх
   }

   if (e.key === 'ArrowDown') { //если нажата клавиша вниз
      rightRacket.speedY = 3; // двигаем рокетки вниз
   }
   if (e.key === 'Control') { //если нажата клавиша вниз
      leftRacket.speedY = 3; // двигаем рокетки вниз
   }
});

document.addEventListener('keyup', function (e) { // следим за отжатием клавиш
   if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { //если это клавиши вверх и вниз
      rightRacket.speedY = 0; // останавливаем  рокетку
   }
   if (e.key === 'Shift' || e.key === 'Control') { //если это клавиши вверх и вниз
      leftRacket.speedY = 0; // останавливаем  рокетку
   }
});
