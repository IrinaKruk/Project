"use strict"

  class HashStorageFunc {
    
    constructor(){
      this.storage = {};
    }
   
   addValue(key, value) {
      this.storage[key] = value;
   }

   getValue(key) {
      return this.storage[key];
   }

   deleteValue(key) {
      if (key in this.storage) {
         delete this.storage[key];
         return true;
      }
      return false;
   }

   getKey() {
      return Object.keys(this.storage);
   }

}

class drinkStorage extends HashStorageFunc{
  constructor(){
    super();
  }
}

let drink = new drinkStorage;

let addButton = document.getElementById('add-coctail');
addButton.onclick = function () {
   let name = prompt("Название напитка?");
   let r = prompt("Рецепт");
   let a = confirm("Алкогольный или нет?");
   drink.addValue(name, { recipe: r, alko: a });
}

let getButton = document.getElementById('get-coctail');
getButton.onclick = function () {
   let name = prompt("Название напитка?");
   let info = drink.getValue(name);
   if (info == undefined) {
      alert('Нет такого напитка');
   } else {
      alert('Напиток ' + name + '\n' + 'Алкогольный: ' + info.alko + '\n' + 'Рецепт приготовления: ' + info.recipe);
   }
}

let delButton = document.getElementById('delete-coctail');
delButton.onclick = function () {
   let name = prompt("Название напитка?");
   let res = drink.deleteValue(name);
   if (res==true){
     alert('Напиток удален');
   } else {
    alert ('Такого напитка и нет');
    }
}

let allButton = document.getElementById('all-coctail');
allButton.onclick = function () {
   let all = drink.getKey();
   alert(all);
  }
