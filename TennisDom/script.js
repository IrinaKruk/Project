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

let field = document.getElementById('field'); // создаем поле 
field.style.height = 400 + 'px'; // задаём высоту для поля
field.style.width = 700 + 'px'; // задаём ширину для поля
field.style.background = 'yellow'; // задаём ширину для поля
field.style.border = 'solid' + ' ' + 'grey'; // вид границы поля
field.style.position = 'relative';

let rightRacket = {
   posX: 690,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let rightRacketElem = document.getElementById('rightRacket');
      rightRacketElem.style.left = this.posX + "px";
      rightRacketElem.style.top = this.posY + "px";
   }
}

let leftRacket = {
   posX: 0,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let leftRacketElem = document.getElementById('leftRacket');
      leftRacketElem.style.left = this.posX + "px";
      leftRacketElem.style.top = this.posY + "px";
   }
}

let ball = {
   posX: 335,
   posY: 185,
   speedX: 1,
   speedY: 1,
   width: 30,
   height: 30,

   update: function () {
      let ballElem = document.getElementById('IBall');
      ballElem.style.height = 30 + 'px';
      ballElem.style.width = 30 + 'px';
      ballElem.style.borderRadius = 50 + '%'; //скругляем углы
      ballElem.style.position = 'absolute';
      ballElem.style.backgroundColor = 'red';
      ballElem.style.left = this.posX + "px";
      ballElem.style.top = this.posY + "px";
   }
};

let gameState = 0;
// 0 - игра не начата
// 1 - мяч летает
// 2 - зафиксирован гол


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


function start() {

   if (gameState !== 1) {
      ball.posX = 335;
      ball.posY = 185;
      ball.speedX = 1;
      ball.speedY = 1;
   }

   RAF(tick);
}

function tick() {

   ball.posX += ball.speedX;

   // вылетел ли мяч правее стены?
   if (ball.posX + ball.width > field.width) {
      ball.speedX = 0;
      ball.speedY = 0;
      leftRacket.speedY = 0;
      rightRacket.speedY = 0;
      ball.posX = field.width - ball.width;
      rightGameScores++;
      rightScore.innerText = rightGameScores; // счёт
      gameState = 2; // зафиксирован гол
      console.log(rightGameScores);
   }

   // вылетел ли мяч левее стены?
   if (ball.posX < 0) {
      ball.speedX = 0;
      ball.speedY = 0;
      ball.posX = 0;
      leftGameScores++;
      leftScore.innerText = leftGameScores;
      gameState = 2; // зафиксирован гол
      console.log(leftScore);
   }

   ball.posY += ball.speedY;
   // вылетел ли мяч ниже пола?
   if (ball.posY + ball.height > field.height) {
      ball.speedY = -ball.speedY;
      ball.posY = field.height - ball.height;
   }
   // вылетел ли мяч выше потолка?
   if (ball.posY < 0) {
      ball.speedY = -ball.speedY;
      ball.posY = 0;
   }

   // проверка на касание мячиком правой рокетки

   if (ball.posX < rightRacket.posX + rightRacket.width &&
      ball.posX + ball.width > rightRacket.posX &&
      ball.posY < rightRacket.posY + rightRacket.height &&
      ball.posY + ball.height > rightRacket.posY) {
      ball.speedX = -ball.speedX;
      ball.posX = rightRacket.posX - ball.width;
   }
   // проверка на касание мячиком левой рокетки

   if (ball.posX < leftRacket.posX + leftRacket.width &&
      ball.posY < leftRacket.posY + leftRacket.height &&
      ball.posY > leftRacket.posY) {
      ball.speedX = -ball.speedX;
      ball.posX = leftRacket.posX + leftRacket.width;
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
   if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Shift' || e.key === 'Control') { //если это клавиши вверх и вниз
      leftRacket.speedY = 0; // останавливаем  рокетку
      rightRacket.speedY = 0; // останавливаем  рокетку
   }
});

