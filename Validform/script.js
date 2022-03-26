"use strict"

function dynForm(form) {

   let newForm = document.createElement('form');

   newForm.method = "post";
   newForm.action = "https://fe.it-academy.by/TestForm.php";
   document.body.append(newForm);

   for (let i = 0; i < form.length; i++) {
      let f = form[i];
      if ('caption' in f) {
         let newCaption = document.createElement('input');
         newCaption.type = f.kind;
         newCaption.value = f.caption;
         newForm.append(newCaption);
      } else
         if ('variants' in f && f.kind == 'radio') {
            let newDiv = document.createElement('div');
            newForm.append(newDiv);
            let newLabel = document.createElement('label');
            newLabel.innerHTML = f.label;
            newDiv.append(newLabel);
            for (let j = 0; j < f.variants.length; j++) {
               //console.log(f.variants[j]['text']);
               let newRadio = document.createElement('input');
               newRadio.type = f.kind;
               newRadio.name = f.name;
               //console.log(newRadio);
               newRadio.value = f.variants[j]['value'];
               newDiv.append(newRadio);
               //alert(f.variants[j]['text']);
               let lab = document.createElement('label');
               lab.innerHTML = f.label;
               newDiv.appendChild(lab);
               let newText = f.variants[j]['text'];
               lab.innerHTML = newText;
               //newForm.appendChild(lab);
               //newRadio.insertAdjacentText('afterend', newText);
            }
         } else
            if ('variants' in f && f.kind == 'combo') {
               let newLabel = document.createElement('label');
               newLabel.innerHTML = f.label;
               newForm.append(newLabel);
               let newSelect = document.createElement('select');
               newSelect.name = f.name;
               for (let j = 0; j < f.variants.length; j++) {
                  //console.log(f.variants[j]['text']);
                  //console.log(newSelect);
                  let newOption = document.createElement('option');
                  newOption.value = f.value;
                  newOption.innerHTML = f.variants[j]['text'];
                  newSelect.appendChild(newOption);
               }
               newForm.appendChild(newSelect);
               newSelect.insertAdjacentHTML('afterend', '<br/>');
            } else {
               let newLabel = document.createElement('label');
               newLabel.innerHTML = f.label;
               newForm.append(newLabel);
               newLabel.insertAdjacentHTML('afterend', '<br/>');
               let newInput = document.createElement('input');
               newInput.name = f.name;
               newInput.type = f.kind;
               if (f.kind == 'check') {
                  newInput.type = 'checkbox';
                  newInput.setAttribute('checked', 'true');
               }
               newLabel.append(newInput);
            }
   }
}

let form1 = [
   { label: 'Название сайта:', kind: 'longtext', name: 'sitename' },
   { label: 'URL сайта:', kind: 'longtext', name: 'siteurl' },
   { label: 'Посетителей в сутки:', kind: 'number', name: 'visitors' },
   { label: 'E-mail для связи:', kind: 'shorttext', name: 'email' },
   {
      label: 'Рубрика каталога:', kind: 'combo', name: 'division',
      variants: [{ text: 'здоровье', value: 1 }, { text: 'домашний уют', value: 2 }, { text: 'бытовая техника', value: 3 }]
   },
   {
      label: 'Размещение:', kind: 'radio', name: 'payment',
      variants: [{ text: 'бесплатное', value: 1 }, { text: 'платное', value: 2 }, { text: 'VIP', value: 3 }]
   },
   { label: 'Разрешить отзывы:', kind: 'check', name: 'votes' },
   { label: 'Описание сайта:', kind: 'memo', name: 'description' },
   { caption: 'Опубликовать', kind: 'submit' },
];

let form2 = [
   { label: 'Фамилия:', kind: 'longtext', name: 'lastname' },
   { label: 'Имя:', kind: 'longtext', name: 'firstname' },
   { label: 'Отчество:', kind: 'longtext', name: 'secondname' },
   { label: 'Возраст:', kind: 'number', name: 'age' },
   { caption: 'Зарегистрироваться', kind: 'submit' },
];

dynForm(form1);

dynForm(form2);