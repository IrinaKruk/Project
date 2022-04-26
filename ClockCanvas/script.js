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

   function clock() {

      let cvs = document.getElementById('yellow'); // получаем canvas с ID "yellow"
      cvs.setAttribute("height", diameterYellow); // задаём высоту 
      cvs.setAttribute("width", diameterYellow); // задаём ширину для кнопки
      let context = cvs.getContext('2d');
      let startAngle = 0; //задаём начальный угол
      let endAngle = Math.PI * 2; // End point on circle
      let anticlockwise = false; // clockwise or anticlockwise

      context.arc(radiusYellow, radiusYellow, radiusYellow, startAngle, endAngle, anticlockwise); // рисуем окружность для циферблата
      context.strokeStyle = 'yellow'; //задаём цвет обводки
      context.fillStyle = 'yellow'; //задаём цвет заливки
      context.stroke(); //обводим контур
      context.fill(); //заполняем цветом циферблат

      for (let i = 0; i <= 12; i++) {

         let diameterGreen = diameterYellow / 12; // задаём диаметр для зеленых кружков
         let radiusGreen = diameterYellow / 12; // задаём радиус для зеленых кружков

         let angle = (i * 30) / 180 * Math.PI;

         context.beginPath(); //начинаем рисовать зеленый круг
         let x = radiusYellow + (radiusYellow - diameterGreen) * Math.sin(angle); //задаём центр зеленого круга
         let y = radiusYellow - (radiusYellow - diameterGreen) * Math.cos(angle); //задаём центр зеленого круга
         let radius = radiusGreen; // задаём radius

         context.arc(x, y, radius, startAngle, endAngle, anticlockwise); // рисуем окружность для зеленых кругов
         context.strokeStyle = 'green'; //задаём цвет обводки
         context.fillStyle = 'green'; //задаём цвет заливки
         context.stroke(); //обводим контур
         context.fill(); //заполняем цветом зеленые круги

         context.beginPath(); //начинаем рисовать текст
         context.fillStyle = 'black'; //задаём цвет заливки
         context.fillText(i, x, y + diameterGreen / 3); //выводим текст, заполненный заливкой
         let number = Math.round(diameterGreen);
         context.font = 'normal' + ' ' + number + 'px' + ' ' + 'Arial'; //устанавливаем свойства текста
         context.textAlign = 'center'; //выравниваем текст по центру
      }

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
      let hourRotate = (360 / 12 * hours + 360 / 12 / 60 * minutes) / 180 * Math.PI;

      //часовая стрелка

      let x1 = radiusYellow + radiusYellow / 2 * Math.sin(hourRotate);
      let y1 = radiusYellow - radiusYellow / 2 * Math.cos(hourRotate);

      context.beginPath(); //начинаем рисовать часовую стрелку
      context.strokeStyle = 'black'; //задаём цвет обводки
      context.lineWidth = radiusYellow / 15; //устанавливаем толщину линии обводки
      context.lineCap = 'round'; //устанавливаем типа пера обводки
      context.moveTo(radiusYellow, radiusYellow); //перемещаем перо в указанную точку
      context.lineTo(x1, y1); //рисуем линию в указанную точку
      context.stroke();//обводим контур

      //минутная стрелка

      let x2 = radiusYellow + (radiusYellow - radiusYellow / 3) * Math.sin((360 / 60 * minutes) / 180 * Math.PI);
      let y2 = radiusYellow - (radiusYellow - radiusYellow / 3) * Math.cos((360 / 60 * minutes) / 180 * Math.PI);

      context.beginPath(); //начинаем рисовать минутную стрелку
      context.strokeStyle = 'pink'; //задаём цвет обводки
      context.lineWidth = radiusYellow / 25; //устанавливаем толщину линии обводки
      context.lineCap = 'round'; //устанавливаем типа пера обводки
      context.moveTo(radiusYellow, radiusYellow); //перемещаем перо в указанную точку
      context.lineTo(x2, y2); //рисуем линию в указанную точку
      context.stroke(); //обводим контур

      //секундная стрелка

      let x3 = radiusYellow + (radiusYellow - radiusYellow / 5) * Math.sin((360 / 60 * seconds) / 180 * Math.PI);
      let y3 = radiusYellow - (radiusYellow - radiusYellow / 5) * Math.cos((360 / 60 * seconds) / 180 * Math.PI);

      context.beginPath(); //начинаем рисовать секундную стрелку
      context.strokeStyle = 'blue'; //задаём цвет обводки
      context.lineWidth = radiusYellow / 45; //устанавливаем толщину линии обводки
      context.lineCap = 'round'; //устанавливаем типа пера обводки
      context.moveTo(radiusYellow, radiusYellow); //перемещаем перо в указанную точку
      context.lineTo(x3, y3); //рисуем линию в указанную точку
      context.stroke(); //обводим контур

      console.log(hours + ":" + minutes + ":" + seconds);
      setTimeout(clock, 1020 - date.getMilliseconds());
   }

   clock();

}
