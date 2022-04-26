"use strict"

let button = document.getElementById('button'); // получаем все input с ID "button"
button.addEventListener('click', closing); //вешаем на "button" событие click

function closing(event) {

   event = event || window.event;

   let d = document.getElementById('number'); // получаем все input с ID "number"
   let diameterYellow = d.value; // введёное значение - диаметр циферблата
   let radiusYellow = diameterYellow / 2; // радиус циферблата
   //console.log(diameterYellow); // показать значение диаметра в консоли

   let divClose = document.getElementById('div'); // получаем все div с ID "div"
   divClose.removeChild(d); // удаляем поле ввода 

   divClose.hidden = true; // добавляем кнопке свойство hidden (скрываем её)


   let cvs = document.getElementById('yellow'); // получаем canvas с ID "yellow"
   cvs.setAttribute("height", diameterYellow); // задаём высоту 
   cvs.setAttribute("width", diameterYellow); // задаём ширину для кнопки
   let context = cvs.getContext('2d');
   let startAngle = 0; //задаём начальный угол
   let endAngle = Math.PI * 2; // End point on circle
   let anticlockwise = false; // clockwise or anticlockwise

   context.arc(radiusYellow, radiusYellow, radiusYellow, startAngle, endAngle, anticlockwise);
   context.strokeStyle = 'yellow';
   context.fillStyle = 'yellow';
   context.stroke();
   context.fill();

   for (let i = 0; i <= 12; i++) {

      let diameterGreen = diameterYellow / 12; // задаём диаметр для зеленых кружков
      let radiusGreen = diameterYellow / 12; // задаём радиус для зеленых кружков

      let angle = (i * 30) / 180 * Math.PI;

      context.beginPath();
      let x = radiusYellow + (radiusYellow - diameterGreen) * Math.sin(angle); //задаём центр зеленого круга
      let y = radiusYellow - (radiusYellow - diameterGreen) * Math.cos(angle); //задаём центр зеленого круга
      let radius = radiusGreen; // задаём radius

      context.arc(x, y, radius, startAngle, endAngle, anticlockwise);
      context.strokeStyle = 'green';
      context.fillStyle = 'green';
      context.stroke();
      context.fill();

      context.beginPath();
      context.fillStyle = 'black';
      context.fillText(i, x, y + diameterGreen / 3);
      let number = Math.round(diameterGreen);
      context.font = 'normal' + ' ' + number + 'px' + ' ' + 'Arial';
      context.textAlign = 'center';

   }

   /*//часовая стрелка
   context.beginPath();
   context.strokeStyle = 'black';
   context.lineWidth = radiusYellow / 15;
   context.lineCap = 'round';
   context.moveTo(radiusYellow, radiusYellow);
   context.lineTo(radiusYellow, radiusYellow / 2);
   context.stroke();

   //минутная стрелка
   context.beginPath();
   context.strokeStyle = 'pink';
   context.lineWidth = radiusYellow / 25;
   context.lineCap = 'round';
   context.moveTo(radiusYellow, radiusYellow);
   context.lineTo(radiusYellow, radiusYellow / 3);
   context.stroke();

   //секундная стрелка
   context.beginPath();
   context.strokeStyle = 'blue';
   context.lineWidth = radiusYellow / 45;
   context.lineCap = 'round';
   context.moveTo(radiusYellow, radiusYellow);
   context.lineTo(radiusYellow, radiusYellow / 5);
   context.stroke();
*/

   function clock() {

      const time = document.getElementById('clock'); // создаем div для часов
      let date = new Date();
      let hours = date.getHours(); // задаём часы
      let minutes = date.getMinutes(); // задаём минуты
      let seconds = date.getSeconds(); // задаём секунды

      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      if (seconds < 10) seconds = "0" + seconds;


      time.innerHTML = hours + ":" + minutes + ":" + seconds; // выводим в div часы
      time.style.position = 'absolute';
      time.style.zIndex = '1000'; // задаём position для часов

      let timeWidth = radiusYellow / 3;
      time.style.textAlign = 'center'; // выравниваем текст внутри div по центру
      time.style.fontSize = radiusYellow / 5 + 'px'; // задаём размер текста для часов
      time.style.left = radiusYellow - timeWidth + 'px'; // задаём left для часов
      time.style.top = radiusYellow - timeWidth + 'px'; // задаём top для часов
      let hourRotate = 360 / 12 * hours + 360 / 12 / 60 * minutes;

      //часовая стрелка

      let x1 = radiusYellow + (radiusYellow - radiusYellow / 2) * Math.cos(hourRotate);
      let y1 = radiusYellow - (radiusYellow - radiusYellow / 2) * Math.sin(hourRotate);


      context.beginPath();
      context.strokeStyle = 'black';
      context.lineWidth = radiusYellow / 15;
      context.lineCap = 'round';
      context.moveTo(radiusYellow, radiusYellow);
      context.lineTo(x1, y1);
      context.stroke();

      //минутная стрелка

      let x2 = radiusYellow + (radiusYellow - radiusYellow / 3) * Math.cos(360 / 60 * minutes);
      let y2 = radiusYellow - (radiusYellow - radiusYellow / 3) * Math.sin(360 / 60 * minutes);

      context.beginPath();
      context.strokeStyle = 'pink';
      context.lineWidth = radiusYellow / 25;
      context.lineCap = 'round';
      context.moveTo(radiusYellow, radiusYellow);
      context.lineTo(x2, y2);
      context.stroke();

      //секундная стрелка

      let x3 = radiusYellow + (radiusYellow - radiusYellow / 5) * Math.cos(360 / 60 * seconds);
      let y3 = radiusYellow - (radiusYellow - radiusYellow / 5) * Math.sin(360 / 60 * seconds);

      context.beginPath();

      context.strokeStyle = 'blue';
      context.lineWidth = radiusYellow / 45;
      context.lineCap = 'round';
      context.moveTo(radiusYellow, radiusYellow);
      context.lineTo(x3, y3);
      context.stroke();

      console.log(hours + ":" + minutes + ":" + seconds);
      setTimeout(clock, 1020 - date.getMilliseconds());
   }

   clock();


}
