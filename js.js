import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";

import { firebaseConfig } from "./firebase.js";

import { findData } from "./modules/findData.js";

import { adverts } from "./modules/adverts.js";

import { insertData } from "./modules/insertData.js";

import {
  getDatabase,
  set,
  onValue,
  get,
  child,
  update,
  ref,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Initialize Firebase, database, authentication
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//Db registracijai

//new user registration
const registerNewUser = () => {
  const email = document.getElementById("register_email").value;
  const password = document.getElementById("register_password").value;
  const username = document.getElementById("register_username").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        user_email: email,
        user_username: username,
      });

      console.log("New user created");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

//login
const loginUser = () => {
  const loginEmail = document.getElementById("login_email").value;
  const loginPassword = document.getElementById("login_password").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      //signed in
      const user = userCredential.user;
      const loginTime = new Date();

      update(ref(database, "users/" + user.uid), {
        last_login: loginTime,
      });
      console.log(user, "Login successful");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

//is the user logged in
const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // document.getElementById('signOut').onclick = logOut
    document
      .getElementById("signOut")
      .addEventListener("click", advertsRemove());
    // let loginBox = document.getElementById("login-box");
    adverts();
  } else {
    // advertsRemove()
  }
  console.log("current user: ", user);
});

document.getElementById("signIn").addEventListener("click", loginUser);
document.getElementById("signUp").addEventListener("click", registerNewUser);

//Ad page

// let adverts = () => {

//   let mainDiv = document.getElementById("mainDiv");

//   let logOut = document.createElement("img");
//   logOut.classList.add("logOutImg");
//   logOut.id = "logOut";
//   logOut.src = "https://cdn-icons-png.flaticon.com/512/483/483343.png";

//   let title = document.createElement("input");
//   title.classList.add("title");
//   title.id = "title";
//   title.type = "text";
//   title.placeholder = "Title";

//   let category = document.createElement("input");
//   category.placeholder = "Category";
//   category.id = "title";
//   category.type = "text";

//   let price = document.createElement("input");
//   price.classList.add("price");
//   price.id = "price";
//   price.type = "text";
//   price.placeholder = "Price";

//   let description = document.createElement("input");
//   description.classList.add("desc");
//   description.type = "text";
//   description.id = "asdf";
//   description.placeholder = "Description";

//   let btnSubmit = document.createElement("button");
//   btnSubmit.classList.add("btnSubmit");
//   btnSubmit.id = "btnSubmit";
//   btnSubmit.innerHTML = "Create listing";

//   let myAds = document.createElement("div");
//   myAds.classList.add("myAds");

//   // let category = document.createElement()
//   //Appending to mainDiv
//   mainDiv.appendChild(logOut);
//   mainDiv.appendChild(title);
//   mainDiv.appendChild(category);
//   mainDiv.appendChild(price);
//   mainDiv.appendChild(description);
//   mainDiv.appendChild(btnSubmit);
//   mainDiv.appendChild(myAds);

//   document.getElementById("logOut").addEventListener("click", () => {
//     signOut(auth)
//       .then(() => {
//         // Sign-out successful.
//         alert("Sign-out successful");
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.log(errorMessage);
//       });
//   });

//   //buttons for inserting data
//   btnSubmit.addEventListener("click", insertData);
//   btnSubmit.addEventListener("click", findData);

//   function insertData(evt) {
//     evt.preventDefault();

//     set(ref(database, "Adverts/" + title.value), {
//       Title: title.value,
//       Category: category.value,
//       Price: price.value,
//       Description: description.value,
//     });
//     console.log(title.value, category.value, price.value, description.value);
//   }

//   findData()
//   // function findData(evt) {
//   //   evt.preventDefault();
//   //   const dbref = ref(database);

//   //   get(child(dbref, "Adverts/" + title.value)).then((snapshot) => {
//   //     if (snapshot.exists()) {
//   //       //title
//   //       let listItem = document.createElement("li");
//   //       listItem.classList.add("listGroup");
//   //       listItem.textContent = "Pavadinimas: " + snapshot.val().Title;
//   //       myAds.appendChild(listItem);

//   //       //Category
//   //       let listItemCateg = document.createElement("li");
//   //       listItemCateg.classList.add("listGroup");
//   //       listItemCateg.textContent = "Kategorija: " + snapshot.val().Category;
//   //       myAds.appendChild(listItemCateg);

//   //       //Price
//   //       let listItemPrice = document.createElement("li");
//   //       listItemPrice.classList.add("listGroup");
//   //       listItemPrice.textContent = "Kaina: " + snapshot.val().Price;
//   //       myAds.appendChild(listItemPrice);

//   //       //Description:
//   //       let listItemDesc = document.createElement("li");
//   //       listItemDesc.classList.add("listGroup", 'description');
//   //       listItemDesc.textContent =
//   //         "Aprasymas: " + snapshot.val().Description;
//   //       myAds.appendChild(listItemDesc);
//   //     }
//   //   });
//   // }
// };

let advertsRemove = () => {
  document.getElementById("login-box").remove();
};
