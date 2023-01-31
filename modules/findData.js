import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { firebaseConfig } from "../firebase.js";

import { adverts } from "./adverts.js";

import { insertData } from "./insertData.js";

import {
  getDatabase,
  onValue,
  set,
  get,
  child,
  update,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function findData() {
  console.log(`select function ${title.value}`);

  onValue(ref(database, "Adverts/")),
    (snapshot) => {
      for (let i in snapshot) {
        let ad = snapshot[i];

        //title
        let listItem = document.createElement("li");
        listItem.classList.add("listGroup");
        listItem.textContent = "Pavadinimas: " + ad.Title;
        myAds.appendChild(listItem);

        //Category
        let listItemCateg = document.createElement("li");
        listItemCateg.classList.add("listGroup");
        listItemCateg.textContent = "Kategorija: " + ad.Category;
        myAds.appendChild(listItemCateg);

        //Price
        let listItemPrice = document.createElement("li");
        listItemPrice.classList.add("listGroup");
        listItemPrice.textContent = "Kaina: " + ad.Price;
        myAds.appendChild(listItemPrice);

        //Description:
        let listItemDesc = document.createElement("li");
        listItemDesc.classList.add("listGroup", "description");
        listItemDesc.textContent = "Aprasymas: " + ad.Description;
        myAds.appendChild(listItemDesc);
      }
    };
}

export { findData };
