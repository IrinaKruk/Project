"use strict"

let button = document.getElementById('button'); // получаем все input с ID "button"
button.addEventListener('click', closing); //вешаем на "button" событие click

function closing(event) {

   event = event || window.event;

   let d = document.getElementById('number'); // получаем все input с ID "number"
   let diameterYellow = d.value; // введёное значение - диаметр циферблата
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

      greenCircle.style.height = diameterGreen + 'px'; // задаём высоту div для зеленых кружков
      greenCircle.style.width = diameterGreen + 'px';// задаём ширину div для зеленых кружков
      //console.log(greenCircle.style.height);
      greenCircle.style.position = 'absolute'; // задаём position для зеленый кругов
      greenCircle.style.display = 'inline-block';
      greenCircle.style.textAlign = 'center'; // выравниваем по центру
      greenCircle.style.backgroundColor = 'green'; // задаём цвет 
      greenCircle.style.borderRadius = border + '%'; //скругляем углы


      console.log(greenCircle);

      greenCircle.innerHTML = i; // записываем нумерацию циферблата

      let angle = [, '30', '60', '90', '120', '150', '180', '210', '240', '270', '300', '330', '360'];

      let ang = (angle[i]) / 180 * Math.PI;
      //console.log(ang);
      let radius = diameterYellow / 2 - 20; // радиус циферблата. Отнимаю 20, чтобы зеленые кружки были внутри циферблата

      let greenCircleCenterX = clockFaceCenterX + radius * Math.sin(ang); // находим центр зеленого круга
      let greenCircleCenterY = clockFaceCenterY - radius * Math.cos(ang); // находим центр зеленого круга

      //console.log(greenCircleCenterX);
      //console.log(greenCircleCenterY);


      greenCircle.style.left = Math.round(greenCircleCenterX - greenCircle.offsetWidth / 2) + 'px';
      greenCircle.style.top = Math.round(greenCircleCenterY - greenCircle.offsetHeight / 2) + 'px';


      document.body.appendChild(clockFace); //вставляем циферблат на страницу
      clockFace.appendChild(greenCircle); //вставляем зеленые кружки для времени на страницу

   }



}

