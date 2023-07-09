import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase,push,ref,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {config} from "./config.js";

const app = initializeApp(config);
const database = getDatabase(app);
const ListInDB = ref(database, "shoppinglist");

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

addButton.addEventListener("click", function() {
  var inputValue = inputField.value;
  clearInputField();
  push(ListInDB, inputValue);
})

clearInputField();

onValue(ListInDB, function(snapshot) {
  if (snapshot.exists()) {
    var listArray = Object.entries(snapshot.val());
    clearShoppingList();
    for (let i = 0; i < listArray.length; i++) {
      var currentList = listArray[i];
      var currentListID = currentList[0];
      var currentListValue = currentList[1];
      addItemToShoppingList(currentList);
    }
  } else {
    shoppingList.innerHTML = 'No items here .... yet.';
  }

})

function clearShoppingList() {
  shoppingList.innerHTML = "";
}
function clearInputField() {
  inputField.value = "";
}
function addItemToShoppingList(item) {
  var itemID = item[0];
  var itemValue = item[1];
  var listElement = document.createElement('li');
  listElement.textContent = itemValue;
  shoppingList.append(listElement);

  listElement.addEventListener("click",
    function () {
      var itemLocation = ref(database, `shoppinglist/${itemID}`);
      remove(itemLocation)
    });
}