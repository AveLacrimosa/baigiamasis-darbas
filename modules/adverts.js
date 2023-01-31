import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { firebaseConfig } from "../firebase.js";
// import { findData } from "./findData.js";
import { insertData } from "./insertData.js";

import {
  getDatabase,
  push,
  onValue,
  child,
  get,
  set,
  update,
  ref,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function adverts() {
  let mainDiv = document.getElementById("mainDiv");

  let logOut = document.createElement("img");
  logOut.classList.add("logOutImg");
  logOut.id = "logOut";
  logOut.src = "https://cdn-icons-png.flaticon.com/512/483/483343.png";

  let title = document.createElement("input");
  title.classList.add("title");
  title.id = "title";
  title.type = "text";
  title.placeholder = "Title";

  let category = document.createElement("input");
  category.placeholder = "Category";
  category.id = "title";
  category.type = "text";

  let price = document.createElement("input");
  price.classList.add("price");
  price.id = "price";
  price.type = "text";
  price.placeholder = "Price";

  let description = document.createElement("input");
  description.classList.add("desc");
  description.type = "text";
  description.id = "asdf";
  description.placeholder = "Description";

  let btnSubmit = document.createElement("button");
  btnSubmit.classList.add("btnSubmit");
  btnSubmit.id = "btnSubmit";
  btnSubmit.innerHTML = "Create listing";

  let myAds = document.createElement("div");
  myAds.classList.add("myAds");

  // let category = document.createElement()
  //Appending to mainDiv
  mainDiv.appendChild(logOut);
  mainDiv.appendChild(title);
  mainDiv.appendChild(category);
  mainDiv.appendChild(price);
  mainDiv.appendChild(description);
  mainDiv.appendChild(btnSubmit);
  mainDiv.appendChild(myAds);

  document.getElementById("logOut").addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("Sign-out successful");
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  });

  btnSubmit.addEventListener("click", insertData);
  btnSubmit.addEventListener("click", findData);

  function insertData() {
    push(ref(database, "Adverts/"), {
      Title: title.value,
      Category: category.value,
      Price: price.value,
      Description: description.value,
    });
    console.log(title.value, category.value, price.value, description.value);
  }

  function removeData(evt) {
    evt.preventDefault();
    let dbRef = ref(database);
    get(child(dbRef, `Adverts/${title.value}`)).then((snapshot) => {
      if (snapshot.exists()) {
        remove(ref(database, "Adverts/" + title.value)).then(() => {
          console.log(`deleted ${title.value}`);
        });
      }
    });
  }

  function findData() {
    let adCountRef = ref(database, "Adverts/");
    onValue(adCountRef, (snapshot) => {
      let advert = snapshot.val();
      console.log(advert);
      for (let i in advert) {
        let ad = advert[i];
        // removeData();

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

        let deleteAd = document.createElement("img");
        deleteAd.classList.add("deleteAd");
        deleteAd.id = "deleteAd";
        deleteAd.src =
          "https://www.pngall.com/wp-content/uploads/5/Delete-Red-X-Button-Transparent.png";
        myAds.appendChild(deleteAd);
deleteAd.addEventListener("click", removeData());
        function removeData(evt) {
          evt.preventDefault();
          let dbRef = ref(database);
          get(child(dbRef, `Adverts/${title.value}`)).then((snapshot) => {
            if (snapshot.exists()) {
              remove(ref(database, "Adverts/" + title.value)).then(() => {
                console.log(`deleted ${title.value}`);
              });
            }
          });
        }

        
      }
    });
  }
}

export { adverts };
