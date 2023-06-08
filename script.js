// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getDatabase,
  set,
  remove,
  update,
  get,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh9U9gR3QsZqAIMCHxjvWo-BwMp5hPFns",
  authDomain: "todolistt-2f80e.firebaseapp.com",
  databaseURL:
    "https://todolistt-2f80e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todolistt-2f80e",
  storageBucket: "todolistt-2f80e.appspot.com",
  messagingSenderId: "621666516115",
  appId: "1:621666516115:web:cb3778a89ff4b012b3a166",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//=======================================//
//======HERE GOES OUR CODE===============//

const db = getDatabase();
let btn = document.getElementById("addBtn");
let title = document.getElementById("title");
let description = document.getElementById("description");
let date = document.getElementById("date");
let iD = document.getElementById("number-id");
let content = document.querySelector("#content");

function Add() {
  set(ref(db, "Todo/" + title.value), {
    Title: title.value,
    Description: description.value,
    ID: iD.value,
    Checked: false,
    Date: date.value,
  })
    .then(() => {
      alert("data added");
    })
    .catch((error) => {
      alert(error);
    });
}

function Find() {
  const dbref = ref(db);

  get(child(dbref, "Todo/" + title.value)).then((snapshot) => {
    console.log(snapshot.val());

    for (const key in snapshot.val()) {
      const todo = snapshot.val()[key];

      const todoContainer = document.createElement("div");
      todoContainer.classList.add("todo-item");

      const todoCheckbox = document.createElement("input");
      todoCheckbox.type = "checkbox";
      todoCheckbox.checked = todo.Checked;

      todoCheckbox.addEventListener("change", (event) => {
        event.preventDefault();
        //Antons Kod går här
      });

      const todoTitle = document.createElement("input");
      todoTitle.type = "text";
      todoTitle.value = todo.Title;

      const todoDescription = document.createElement("input");
      todoDescription.type = "text";
      todoDescription.value = todo.Description;

      const todoDate = document.createElement("p");
      todoDate.innerHTML = "Date: " + todo.Date;

      const updateButton = document.createElement("button");
      updateButton.innerHTML = "Update";
      updateButton.addEventListener("click", (event) => {
        event.preventDefault();
        //MAX KOD GÅR HÄR
        function updateTodo(
          updatedTitle,
          updatedDescription,
          titleValue,
          todoKey
        ) {
          // Update the title and description properties in Firebase
          update(ref(db, "Todo/" + titleValue + "/" + todoKey), {
            Title: updatedTitle,
            Description: updatedDescription,
          })
            .then(() => {
              console.log("Data updated successfully");
            })
            .catch((error) => {
              console.error(error);
            });
        }
        updateTodo(
          todoTitle.value,
          todoDescription.value,
          title.value,
          key
        );
      });

      //Qendresas KOD GÅR HÄR

      todoContainer.append(
        todoTitle,
        todoDescription,
        todoCheckbox,
        todoDate,
        updateButton
      );
      content.append(todoContainer);
    }
  });
}

Find();

btn.addEventListener("click", (event) => {
  event.preventDefault();
  Add();
});
