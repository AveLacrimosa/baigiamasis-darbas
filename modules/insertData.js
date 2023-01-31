import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { firebaseConfig } from "../firebase.js";

import { adverts } from "./adverts.js";

import {
  getDatabase,
  set,
  get,
  child,
  update,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function insertData() {
    set(ref(database, "Adverts/" + title.value), {
      Title: title.value,
      Category: category.value,
      Price: price.value,
      Description: description.value,
    });
    console.log(title.value, category.value, price.value, description.value);
  }

  export {insertData}