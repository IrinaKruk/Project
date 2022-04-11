"use strict"

window.addEventListener('load', position, false);

function position(event) {

   event = event || window.event;

   let elem = document.getElementsByTagName('img');
   for (let i = 0; i < elem.length; i++) {
      let el = elem[i];
      el.style.top = el.offsetTop + 'px';
      el.style.left = el.offsetLeft + 'px';
      //console.log(el);
   }
   for (let j = 0; j < elem.length; j++) {
      let el = elem[j];
      el.style.position = 'absolute';
      //console.log(el);
      el.onmousedown = imgDown;
      el.onmouseup = imgUp;
      el.style.cursor = 'grab';
   }
}


function imgDown(event) {
   event = event || window.event;
   event.preventDefault();
   //console.log('Нажала на картинку');


   let imageX = event.pageX - event.target.offsetLeft;
   let imageY = event.pageY - event.target.offsetTop;

   let image = event.target;
   document.body.append(image);


   window.onmousemove = imgMove;
   function imgMove(event) {
      event = event || window.event;
      event.preventDefault();
      //console.log('Перетаскиваю картинку');

      image.style.top = (event.pageY - imageY) + 'px';
      image.style.left = (event.pageX - imageX) + 'px';
      image.style.zIndex = '1000';
      image.style.cursor = 'grabbing';
      //console.log(image);

   }
}

function imgUp(event) {
   event = event || window.event;
   event.preventDefault();
   //console.log('Отпустила картинку');

   window.onmousemove = null;
}
