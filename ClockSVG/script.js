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

   let clockFaceSvg = document.getElementById('yellow'); // получаем svg с ID "yellow"
   clockFaceSvg.setAttribute("height", diameterYellow); // задаём высоту svg для циферблата
   clockFaceSvg.setAttribute("width", diameterYellow);// задаём ширину svg для циферблата
   clockFaceSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

   let clockFaceSvgCircle = document.getElementById('circleyellow'); // создаем circle для циферблата
   clockFaceSvgCircle.setAttribute("cx", radiusYellow); // задаём центр циферблата
   clockFaceSvgCircle.setAttribute("cy", radiusYellow); // задаём центр циферблата
   clockFaceSvgCircle.setAttribute("r", radiusYellow); // задаём радиус круга
   clockFaceSvgCircle.setAttribute("fill", "yellow"); // задаём цвет циферблата

   for (let i = 1; i <= 12; i++) {

      let diameterGreen = diameterYellow / 8; // задаём диаметр для зеленых кружков
      let radiusGreen = diameterGreen / 2; // радиус зеленого круга
      let greenSvg = document.createElement('circle'); // создаем svg для зеленых кружков
      //console.log(greenSvg);

      greenSvg.setAttribute("height", diameterGreen); // задаём высоту svg для циферблата
      greenSvg.setAttribute("width", diameterGreen);// задаём ширину svg для циферблата
      greenSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg"); // задаём цвет циферблата

      greenSvg.setAttribute("r", diameterGreen); // задаём радиус круга
      greenSvg.setAttribute("fill", "green"); // задаём цвет циферблата


      let greenText = document.createElement('text'); // создаем div для зеленых кружков
      greenText.innerHTML = i;
      greenSvg.appendChild(greenText); //вставляем зеленые кружки для времени на страницу


      let angle = (i * 30) / 180 * Math.PI;

      let greenCircleCenterX = radiusYellow + (radiusYellow - radiusGreen) * Math.sin(angle); // находим центр зеленого круга
      let greenCircleCenterY = radiusYellow - (radiusYellow - radiusGreen) * Math.cos(angle); // находим центр зеленого круга

      greenSvg.setAttribute("cx", Math.round(greenCircleCenterX - diameterGreen / 2)); //задаём свойство left для зеленых кругов
      greenSvg.setAttribute("cy", Math.round(greenCircleCenterY - diameterGreen / 2)); //задаём свойство top для зеленых кругов


      //document.body.appendChild(clockFace); //вставляем циферблат на страницу
      //clockFace.appendChild(clockFaceSvg); //вставляем svg на страницу
      //clockFaceSvg.appendChild(clockFaceSvgCircle); //вставляем круг на страницу
      //clockFace.appendChild(green); //вставляем зеленые кружки для времени на страницу
      //green.appendChild(greenSvg); //вставляем svg на страницу
      clockFaceSvg.appendChild(greenSvg); //вставляем круг на страницу
      console.log(clockFaceSvg);
   }

   /*
   let hourРand = document.createElement('div'); // создаем div для часовой стрелки
   let hourРandWidth = radiusYellow / 15; // задаём ширину часовой стрелки
   hourРand.style.height = radiusYellow / 1.5 + 'px'; // задаём высоту div для часовой стрелки
   hourРand.style.width = hourРandWidth + 'px'; // задаём ширину div для часовой стрелки
   hourРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   hourРand.style.position = 'absolute'; // задаём position для зеленый кругов
   hourРand.style.backgroundColor = 'black'; // задаём цвет 
   hourРand.style.borderRadius = 5 + 'px'; //скругляем углы
   clockFace.appendChild(hourРand); //вставляем часовую стрелку 

   hourРand.style.left = clockFaceCenterX - hourРandWidth / 2 + 'px'; //задаём свойство left для часовой стрелки
   hourРand.style.bottom = clockFaceCenterY + 'px'; //задаём свойство bottom для часовой стрелки

   let minuteРand = document.createElement('div'); // создаем div для часовой стрелки
   let minuteРandWidth = radiusYellow / 25; // задаём ширину минутной стрелки
   minuteРand.style.height = radiusYellow / 1.2 + 'px'; // задаём высоту div для часовой стрелки
   minuteРand.style.width = minuteРandWidth + 'px';// задаём ширину div для часовой стрелки
   minuteРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   minuteРand.style.position = 'absolute'; // задаём position для зеленый кругов
   minuteРand.style.backgroundColor = 'pink'; // задаём цвет 
   minuteРand.style.borderRadius = 5 + 'px'; //скругляем углы
   clockFace.appendChild(minuteРand); //вставляем минутную стрелку

   minuteРand.style.left = clockFaceCenterX - minuteРandWidth / 2 + 'px'; //задаём свойство left для минутной стрелки
   minuteРand.style.bottom = clockFaceCenterY + 'px'; //задаём свойство bottom для минутной стрелки


   let secondРand = document.createElement('div'); // создаем div для часовой стрелки
   let secondРandWidth = radiusYellow / 45; // задаём ширину секундной стрелки
   secondРand.style.height = radiusYellow / 1.1 + 'px'; // задаём высоту div для часовой стрелки
   secondРand.style.width = secondРandWidth + 'px'; // задаём ширину div для часовой стрелки
   secondРand.style.transformOrigin = 50 + '%' + ' ' + 100 + '%'; // задаём координаты точки, относительно которой будет происходить трансформация стрелки
   secondРand.style.position = 'absolute'; // задаём position для зеленый кругов
   secondРand.style.backgroundColor = 'blue'; // задаём цвет 
   secondРand.style.borderRadius = 5 + 'px'; //скругляем углы
   clockFace.appendChild(secondРand); //вставляем секундную стрелку

   secondРand.style.left = clockFaceCenterX - secondРandWidth / 2 + 'px'; //задаём свойство left для секундной стрелки
   secondРand.style.bottom = clockFaceCenterY + 'px'; //задаём свойство bottom для секундной стрелки

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
*/
}
