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
   let self = this;
   self.hidden = true; // добавляем кнопке свойство hidden (скрываем её)

   let clockFace = document.createElement('div'); // создаем div для циферблата

   clockFace.style.height = diameterYellow + 'px'; // задаём высоту div для циферблата
   clockFace.style.width = diameterYellow + 'px';// задаём ширину div для циферблата
   clockFace.style.position = 'absolute'; // задаём position для циферблата
   clockFace.style.backgroundColor = 'yellow'; // задаём цвет циферблата
   let border = 50; // % скругления углов 
   clockFace.style.borderRadius = border + '%'; //скругляем углы

   let clockFaceLeft = 0;
   let clockFaceTop = 0;
   let clockFaceCenterX = clockFaceLeft + diameterYellow / 2; // находим центр циферблата
   let clockFaceCenterY = clockFaceTop + diameterYellow / 2; // находим центр циферблата
   //console.log(clockFaceCenterX);
   //console.log(clockFaceCenterY);

   for (let i = 1; i <= 12; i++) {

      //console.log(diameter);
      let greenCircle = document.createElement('div'); // создаем div для зеленых кружков
      let diameterGreen = diameterYellow / 8; // задаём диаметр для зеленых кружков
      //console.log(diameterGreen);
      let greenText = document.createElement('span'); // создаем div для зеленых кружков

      greenText.innerHTML = i;
      greenCircle.appendChild(greenText); //вставляем зеленые кружки для времени на страницу

      greenCircle.style.height = diameterGreen + 'px'; // задаём высоту div для зеленых кружков
      greenCircle.style.width = diameterGreen + 'px';// задаём ширину div для зеленых кружков
      //console.log(greenCircle.style.height);
      greenCircle.style.position = 'absolute'; // задаём position для зеленый кругов
      greenCircle.style.display = 'inline-block';
      greenCircle.style.textAlign = 'center'; // выравниваем по центру
      greenCircle.style.backgroundColor = 'green'; // задаём цвет 
      greenCircle.style.borderRadius = border + '%'; //скругляем углы
      greenCircle.style.fontWeight = 'bold';


      console.log(greenCircle);

      //greenCircle.innerHTML = i; // записываем нумерацию циферблата

      let angle = (i * 30) / 180 * Math.PI;
      //console.log(ang);

      let radiusGreen = diameterGreen / 2; // радиус зеленого круга

      let greenCircleCenterX = clockFaceCenterX + (radiusYellow - radiusGreen) * Math.sin(angle); // находим центр зеленого круга
      let greenCircleCenterY = clockFaceCenterY - (radiusYellow - radiusGreen) * Math.cos(angle); // находим центр зеленого круга

      //console.log(greenCircleCenterX);
      //console.log(greenCircleCenterY);


      greenCircle.style.left = Math.round(greenCircleCenterX - diameterGreen / 2) + 'px';
      greenCircle.style.top = Math.round(greenCircleCenterY - diameterGreen / 2) + 'px';


      document.body.appendChild(clockFace); //вставляем циферблат на страницу
      clockFace.appendChild(greenCircle); //вставляем зеленые кружки для времени на страницу
   }

   let hourРand = document.createElement('div'); // создаем div для часовой стрелки
   let hourРandWidth = radiusYellow / 15; // задаём ширину часовой стрелки
   hourРand.style.height = radiusYellow / 1.5 + 'px'; // задаём высоту div для часовой стрелки
   hourРand.style.width = hourРandWidth + 'px'; // задаём ширину div для часовой стрелки
   hourРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   hourРand.style.position = 'absolute'; // задаём position для зеленый кругов
   hourРand.style.display = 'inline-block';
   hourРand.style.backgroundColor = 'black'; // задаём цвет 
   clockFace.appendChild(hourРand); //вставляем зеленые кружки для времени на страницу

   hourРand.style.left = clockFaceCenterX - hourРandWidth / 2 + 'px';
   hourРand.style.bottom = clockFaceCenterY + 'px';

   let minuteРand = document.createElement('div'); // создаем div для часовой стрелки
   let minuteРandWidth = radiusYellow / 25; // задаём ширину минутной стрелки
   minuteРand.style.height = radiusYellow / 1.2 + 'px'; // задаём высоту div для часовой стрелки
   minuteРand.style.width = minuteРandWidth + 'px';// задаём ширину div для часовой стрелки
   minuteРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   minuteРand.style.position = 'absolute'; // задаём position для зеленый кругов
   minuteРand.style.display = 'inline-block';
   minuteРand.style.backgroundColor = 'pink'; // задаём цвет 
   clockFace.appendChild(minuteРand); //вставляем зеленые кружки для времени на страницу

   minuteРand.style.left = clockFaceCenterX - minuteРandWidth / 2 + 'px';
   minuteРand.style.bottom = clockFaceCenterY + 'px';


   let secondРand = document.createElement('div'); // создаем div для часовой стрелки
   let secondРandWidth = radiusYellow / 45; // задаём ширину секундной стрелки
   secondРand.style.height = radiusYellow / 1.1 + 'px'; // задаём высоту div для часовой стрелки
   secondРand.style.width = secondРandWidth + 'px'; // задаём ширину div для часовой стрелки
   secondРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   secondРand.style.position = 'absolute'; // задаём position для зеленый кругов
   secondРand.style.display = 'inline-block';
   secondРand.style.backgroundColor = 'blue'; // задаём цвет 
   clockFace.appendChild(secondРand); //вставляем зеленые кружки для времени на страницу

   secondРand.style.left = clockFaceCenterX - secondРandWidth / 2 + 'px';
   secondРand.style.bottom = clockFaceCenterY + 'px';


   const time = document.createElement('div'); // создаем div для часов
   let date = new Date();
   let hours = date.getHours(); // задаём часы
   let minutes = date.getMinutes(); // задаём минуты
   let seconds = date.getSeconds(); // задаём секунды

   if (hours < 10) hours = "0" + hours;
   if (minutes < 10) minutes = "0" + minutes;
   if (seconds < 10) seconds = "0" + seconds;

   time.textContent = hours + ":" + minutes + ":" + seconds; // выводим в div часы
   time.style.position = 'absolute'; // задаём position для часов

   let timeWidth = radiusYellow / 3; // задаём position для часов
   time.style.textAlign = 'center'; // выравниваем текст внутри div по центру
   time.style.fontSize = radiusYellow / 5 + 'px'; // задаём размер текста для часов
   time.style.left = clockFaceCenterX - timeWidth + 'px'; // задаём left для часов
   time.style.bottom = clockFaceCenterY + radiusYellow / 4 + 'px'; // задаём bottom для часов


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

      let timeWidth = radiusYellow / 3; // задаём position для часов
      time.style.textAlign = 'center'; // выравниваем текст внутри div по центру
      time.style.fontSize = radiusYellow / 5 + 'px'; // задаём размер текста для часов
      time.style.left = clockFaceCenterX - timeWidth + 'px'; // задаём left для часов
      time.style.top = clockFaceCenterY - radiusYellow / 3 + 'px'; // задаём top для часов

      hourРand.style.transform = 'rotate' + '(' + hours * 30 + 'deg' + ')';
      minuteРand.style.transform = 'rotate' + '(' + minutes * 6 + 'deg' + ')';
      secondРand.style.transform = 'rotate' + '(' + seconds * 6 + 'deg' + ')';
      //console.log(time);
   }
   setInterval(clock, 1000);
   clock();

}



