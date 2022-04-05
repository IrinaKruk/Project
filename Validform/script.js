"use strict"

let elementForm = document.getElementById('form');
elementForm.addEventListener('submit', formSubmit);

let elementMan = document.getElementById('man');
elementMan.addEventListener('blur', () => manValid(false));

function manValid(focusOnErr) {
   let errCount = 0;
   let manValue = document.getElementById('man').value;
   let manElem = document.getElementById('man');
   let manElemErr = document.getElementById('manErr');
   if (manValue === '') {
      manElemErr.innerHTML = 'Заполните поле';
      errCount++;
      console.log(errCount);
      if (focusOnErr) {
         manElem.focus();
      }
   } else {
      manElemErr.innerHTML = '';
   }
   return errCount;
}

let elementName = document.getElementById('name');
elementName.addEventListener('blur', () => nameValid(false));

function nameValid(focusOnErr) {
   let errCount = 0;
   let nameValue = document.getElementById('name').value;
   let nameElem = document.getElementById('name');
   if (nameValue === '') {
      document.getElementById('nameErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         nameElem.focus();
      }
   } else {
      document.getElementById('nameErr').innerHTML = '';
   }
   return errCount;
}

let elementUrl = document.getElementById('url');
elementUrl.addEventListener('blur', () => urlValid(false));

function urlValid(focusOnErr) {
   let errCount = 0;
   let urlValue = document.getElementById('url').value;
   let urlElem = document.getElementById('url');
   if ((urlValue === '') || !(urlValue.includes('www'))) { /*!(urlValue.includes('.')) - не могу понять как добавить и это условие, и можно ли вообще...*/
      document.getElementById('urlErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         urlElem.focus();
      }
   } else {
      document.getElementById('urlErr').innerHTML = '';
   }
   return errCount;
}

let elementDate = document.getElementById('date');
elementDate.addEventListener('blur', () => dateValid(false));

function dateValid(focusOnErr) {
   let errCount = 0;
   let dateValue = document.getElementById('date').value;
   let dateElem = document.getElementById('date');
   if (dateValue === '') {
      document.getElementById('dateErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         dateElem.focus();
      }
   } else {
      document.getElementById('dateErr').innerHTML = '';
   }
   return errCount;
}

let elementVisitor = document.getElementById('visitor');
elementVisitor.addEventListener('blur', () => visitorValid(false));

function visitorValid(focusOnErr) {
   let errCount = 0;
   let visitorValue = document.getElementById('visitor').value;
   console.log(typeof visitorValue);
   let visitorElem = document.getElementById('visitor');
   if (visitorValue === '' || isNaN(visitorValue)) {
      document.getElementById('visitorErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         visitorElem.focus();
      }
   } else {
      document.getElementById('visitorErr').innerHTML = '';
   }
   return errCount;
}

let elementMail = document.getElementById('mail');
elementMail.addEventListener('blur', () => mailValid(false));

function mailValid(focusOnErr) {
   let errCount = 0;
   let mailValue = document.getElementById('mail').value;
   let mailElem = document.getElementById('mail');
   if ((mailValue === '') || !(mailValue.includes('@'))) { /*!(mailValue.includes('.')) - не могу понять как добавить и это условие, и можно ли вообще...*/
      document.getElementById('mailErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         mailElem.focus();
      }
   } else {
      document.getElementById('mailErr').innerHTML = '';
   }
   return errCount;
}

/*
let elementRadio = document.getElementById('radio');
elementRadio.addEventListener('blur', () => radioValid(false));

function radioValid(focusOnErr) {
   let errCount = 0;
   let radioElem = document.getElementById('radio');

   console.log(radioElem);
   if () {
      document.getElementById('radioErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         radioElem.focus();
      }
   } else {
      document.getElementById('radioErr').innerHTML = '';
   }
   return errCount;
}
*/

let elementCheck = document.getElementById('check');
elementCheck.addEventListener('blur', () => checkValid(false));

function checkValid(focusOnErr) {
   let errCount = 0;
   let checkElem = document.getElementById('check');
   if (checkElem.checked === false) {
      document.getElementById('checkErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         checkElem.focus();
      }
   } else {
      document.getElementById('checkErr').innerHTML = '';
   }
   return errCount;
}

let elementText = document.getElementById('text');
elementText.addEventListener('blur', () => textValid(false));

function textValid(focusOnErr) {
   let errCount = 0;
   let textValue = document.getElementById('text').value;
   let textElem = document.getElementById('text');
   if (textValue === '') {
      document.getElementById('textErr').innerHTML = 'Заполните поле';
      errCount++;
      if (focusOnErr) {
         textElem.focus();
      }
   } else {
      document.getElementById('textErr').innerHTML = '';
   }
   return errCount;
}


function formSubmit(eo) {
   let errCount = 0;
   errCount += manValid(!errCount);
   errCount += nameValid(!errCount);
   errCount += urlValid(!errCount);
   errCount += dateValid(!errCount);
   errCount += visitorValid(!errCount);
   errCount += mailValid(!errCount);
   errCount += checkValid(!errCount);
   //errCount += radioValid(!errCount);
   errCount += textValid(!errCount);
   if (errCount) {
      eo.preventDefault();
   }
}