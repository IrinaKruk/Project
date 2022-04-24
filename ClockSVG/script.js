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

   let clockFaceSvg = document.getElementById('yellow'); // получаем svg с ID "yellow"
   clockFaceSvg.setAttribute("height", diameterYellow); // задаём высоту svg для циферблата
   clockFaceSvg.setAttribute("width", diameterYellow);// задаём ширину svg для циферблата
   clockFaceSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

   let clockFaceSvgCircle = document.getElementById('circleyellow'); //получаем circle с ID "circleyellow"
   clockFaceSvgCircle.setAttribute("cx", radiusYellow); // задаём центр циферблата
   clockFaceSvgCircle.setAttribute("cy", radiusYellow); // задаём центр циферблата
   clockFaceSvgCircle.setAttribute("r", radiusYellow); // задаём радиус круга
   clockFaceSvgCircle.setAttribute("fill", 'yellow'); // задаём цвет циферблата

   for (let i = 1; i <= 12; i++) {

      let diameterGreen = diameterYellow / 12; // задаём диаметр для зеленых кружков

      let greenSvg = document.getElementById('circlegreen'); //получаем circle с ID "circlegreen"
      //console.log(greenSvg);

      let angle = (i * 30) / 180 * Math.PI;

      let greenCircleCenterX = radiusYellow + (radiusYellow - diameterGreen) * Math.sin(angle); // находим центр зеленого круга
      let greenCircleCenterY = radiusYellow - (radiusYellow - diameterGreen) * Math.cos(angle); // находим центр зеленого круга

      greenSvg.setAttribute("cx", Math.round(greenCircleCenterX)); //задаём центр зеленых кругов
      greenSvg.setAttribute("cy", Math.round(greenCircleCenterY)); //задаём центр зеленых кругов


      greenSvg.setAttribute("r", diameterGreen); // задаём радиус зеленых кругов
      greenSvg.setAttribute("fill", 'green'); // задаём цвет зеленых кругов


      let greenText = document.getElementById('textgreen'); //получаем text с ID "textgreen"
      greenText.setAttribute("x", Math.round(greenCircleCenterX)); //задаём координаты текста
      greenText.setAttribute("y", Math.round(greenCircleCenterY)); //задаём координаты текста
      greenText.setAttribute("text-anchor", 'middle'); //выравниваем текст
      greenText.innerHTML = i;
      greenText.style.fontSize = Math.round(diameterGreen) + 'px'; //задаём размер текста
      greenText.style.fontWeight = 'bold'; //делаем текст жирным
      clockFaceSvg.append(greenSvg); //вставляем зеленые круги на страницу
      clockFaceSvg.append(greenText); //вставляем текст на страницу
      //console.log(clockFaceSvg);
   }

   let hourРand = document.getElementById('hour'); // получаем line с ID "hour"
   let hourРandWidth = radiusYellow / 15; // задаём ширину часовой стрелки
   hourРand.setAttribute("x1", radiusYellow); //задаём координаты первой точки
   hourРand.setAttribute("y1", radiusYellow); //задаём координаты первой точки
   hourРand.setAttribute("x2", radiusYellow); //задаём координаты второй точки
   hourРand.setAttribute("y2", radiusYellow / 2); //задаём координаты второй точки
   hourРand.setAttribute("stroke", 'black'); //задаём цвет часовой стрелки
   hourРand.setAttribute("stroke-width", Math.round(hourРandWidth)); //задаём ширину часовой стрелки
   hourРand.setAttribute("stroke-linecap", 'round'); //задаём скругление часовой стрелки
   hourРand.style.transformOrigin = 50 + '%' + ' ' + 50 + '%';
   clockFaceSvg.append(hourРand); //вставляем часовую стрелку 

   let minuteРand = document.getElementById('minute'); // получаем line с ID "minute"
   let minuteРandWidth = radiusYellow / 25; // задаём ширину минутной стрелки
   minuteРand.setAttribute("x1", radiusYellow); //задаём координаты первой точки
   minuteРand.setAttribute("y1", radiusYellow); //задаём координаты первой точки
   minuteРand.setAttribute("x2", radiusYellow); //задаём координаты второй точки
   minuteРand.setAttribute("y2", radiusYellow / 3); //задаём координаты второй точки
   minuteРand.setAttribute("stroke", 'pink'); //задаём цвет минутной стрелки
   minuteРand.setAttribute("stroke-width", Math.round(minuteРandWidth)); //задаём ширину минутной стрелки
   minuteРand.setAttribute("stroke-linecap", 'round'); //задаём скругление минутной стрелки
   minuteРand.style.transformOrigin = 50 + '%' + ' ' + 50 + '%';
   clockFaceSvg.append(minuteРand); //вставляем минутную стрелку 

   let secondРand = document.getElementById('second'); // получаем line с ID "second"
   let secondРandWidth = radiusYellow / 45; // задаём ширину минутной стрелки
   secondРand.setAttribute("x1", radiusYellow); //задаём координаты первой точки
   secondРand.setAttribute("y1", radiusYellow); //задаём координаты первой точки
   secondРand.setAttribute("x2", radiusYellow); //задаём координаты второй точки
   secondРand.setAttribute("y2", radiusYellow / 5); //задаём координаты второй точки
   secondРand.setAttribute("stroke", 'blue'); //задаём цвет минутной стрелки
   secondРand.setAttribute("stroke-width", Math.round(secondРandWidth)); //задаём ширину минутной стрелки
   secondРand.setAttribute("stroke-linecap", 'round'); //задаём скругление минутной стрелки
   secondРand.style.transformOrigin = 50 + '%' + ' ' + 50 + '%';
   clockFaceSvg.append(secondРand); //вставляем минутную стрелку 


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

      hourРand.style.transform = 'rotate' + '(' + hourRotate + 'deg' + ')'; //поворачиваем часовую стрелку
      minuteРand.style.transform = 'rotate' + '(' + 360 / 60 * minutes + 'deg' + ')'; //поворачиваем минутную стрелку 
      secondРand.style.transform = 'rotate' + '(' + 360 / 60 * seconds + 'deg' + ')'; //поворачиваем секундную стрелку
      console.log(hours + ":" + minutes + ":" + seconds);
      setTimeout(clock, 1020 - date.getMilliseconds());
   }

   clock();

}
