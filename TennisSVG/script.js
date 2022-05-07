"use strict"

let score = document.getElementById('score'); //создаем svg для счёта
score.setAttribute("height", 50); // задаём высоту svg 
score.setAttribute("width", 700); // задаём ширину svg
score.setAttribute("xmlns", "http://www.w3.org/2000/svg");


let button = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); //создаем rect для 'button'
button.setAttribute("x", '10'); //координата x
button.setAttribute("y", '10'); //координата y
button.setAttribute("height", '35'); // задаём высоту  rect 
button.setAttribute("width", '90'); // задаём ширину  rect
button.setAttribute("stroke", 'lightgrey'); // задаём высоту  rect 
button.setAttribute("fill", 'lightgrey'); // задаём ширину  rect
button.setAttribute("xmlns", "http://www.w3.org/2000/svg");
button.addEventListener("click", start, false);
score.appendChild(button);

let textButton = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //создаем text для 'button'
textButton.setAttribute("x", '10'); //координата x
textButton.setAttribute("y", '35'); //координата y
textButton.style.fontSize = 30; // задаём высоту текста text
textButton.innerHTML = 'Старт!';
textButton.addEventListener("click", start, false);
score.appendChild(textButton);

let leftScore = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //создаем text для 'button'
leftScore.setAttribute("x", '360'); //координата x
leftScore.setAttribute("y", '35'); //координата y
leftScore.style.fontSize = 40; // задаём высоту текста text
let leftGameScores = 0;
leftScore.innerHTML = leftGameScores; // счёт
score.appendChild(leftScore);

let colonScore = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //создаем text для 'button'
colonScore.setAttribute("x", '400'); //координата x
colonScore.setAttribute("y", '35'); //координата y
colonScore.style.fontSize = 40; // задаём высоту текста text
let colonGameScore = ':';
colonScore.innerHTML = colonGameScore; // счёт
score.appendChild(colonScore);

let rightScore = document.createElementNS('http://www.w3.org/2000/svg', 'text'); //создаем text для 'button'
rightScore.setAttribute("x", '430'); //координата x
rightScore.setAttribute("y", '35'); //координата y
rightScore.style.fontSize = 40; // задаём высоту текста text
let rightGameScores = 0;
rightScore.innerHTML = rightGameScores; // счёт
score.appendChild(rightScore);

let field = document.getElementById('field'); //создаем svg для поля
field.setAttribute("height", '400'); // задаём высоту svg 
field.setAttribute("width", '700'); // задаём ширину svg
field.setAttribute("xmlns", "http://www.w3.org/2000/svg");

let fieldRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'); //создаем rect для поля
fieldRect.setAttribute("x", '0'); //координата x
fieldRect.setAttribute("y", '0'); //координата y
fieldRect.setAttribute("height", '400'); // задаём высоту  rect 
fieldRect.setAttribute("width", '700'); // задаём ширину  rect
fieldRect.setAttribute("stroke", 'yellow'); // задаём высоту  rect 
fieldRect.setAttribute("fill", 'yellow'); // задаём ширину  rect
fieldRect.setAttribute("xmlns", "http://www.w3.org/2000/svg");
field.prepend(fieldRect);

let rightRacket = {
   posX: 690,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let rightRacketElem = document.getElementById('blue'); //создаем rect для правой рокетки
      let rightPositionX = this.posX;
      let rightPositionY = this.posY;
      rightRacketElem.setAttribute("x", rightPositionX); //координата x
      rightRacketElem.setAttribute("y", rightPositionY); //координата y
   }
}

let leftRacket = {
   posX: 0,
   posY: 0,
   speedY: 0,
   width: 10,
   height: 100,
   update: function () {
      let leftRacketElem = document.getElementById('green'); //создаем rect для правой рокетки
      let leftPositionX = this.posX;
      let leftPositionY = this.posY;
      leftRacketElem.setAttribute("x", leftPositionX); //координата x
      leftRacketElem.setAttribute("y", leftPositionY); //координата y
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
      let ballElem = document.getElementById('ball');
      let ballPositionX = this.posX;
      let ballPositionY = this.posY;
      ballElem.setAttribute("cx", ballPositionX); //координата x
      ballElem.setAttribute("cy", ballPositionY); //координата y
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
      console.log(rightGameScores);
   }


   // вылетел ли мяч левее стены?
   if ((ball.posX - ball.width / 2) < 0) {
      ball.speedX = 0;
      ball.speedY = 0;
      ball.posX = ball.width / 2;
      leftGameScores++;
      leftScore.innerHTML = leftGameScores;
      gameState = 2; // зафиксирован гол
      console.log(leftScore);
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
