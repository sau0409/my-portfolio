// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBwL7Vtqntf1oELHfPgUw7j1LBznfDa5Qw",
  authDomain: "jha-saurabh.firebaseapp.com",
  projectId: "jha-saurabh",
  storageBucket: "jha-saurabh.appspot.com",
  messagingSenderId: "127300463646",
  appId: "1:127300463646:web:b56dd3b4afec9cbdd1d20f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

//main script starts
document.addEventListener("DOMContentLoaded", () => {
  initializeEvents();
});

function initializeEvents() {
  let navBtns = document.querySelectorAll(".nav__a");
  navBtns.forEach((btn) => {
    btn.addEventListener("click", changeNav);
  });

  let contactForm = document.querySelector(".contact__form");
  contactForm.addEventListener("submit", submitForm);
}

//changes nav style on slection
function changeNav(e) {
  let anchor = e.target;
  let li = anchor.parentElement;
  let navBtns = document.querySelectorAll(".nav__a");
  navBtns.forEach((b) => {
    b.classList.remove("btn-active");
    b.parentElement.classList.remove("li-active");
  });
  anchor.classList.add("btn-active");
  li.classList.add("li-active");

  e.stopPropagation();
}

//submits form to firebase
function submitForm(e) {
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let message = document.getElementById("message");

  if (name && email && message) {
    saveMessage(name.value, email.value, message.value);
  }

  name.value = "";
  email.value = "";
  message.value = "";
  e.preventDefault();
  e.stopPropagation();
}

//function save message

function saveMessage(name, email, message) {
  let notification = document.querySelector(".form-submission-result");

  if (navigator.onLine) {
    db.collection("messages")
      .add({
        name,
        email,
        message,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        notification.innerHTML = `<p>Form submitted, Thankyou!</p>`;
        notification.classList.add("success");
        notification.classList.remove("hidden");

        setTimeout(() => {
          notification.classList.add("hidden");
        }, 2000);
      })
      .catch((error) => {
        console.log("in error");
        console.error("Error adding document: ", error);
        notification.innerHTML = `<p>Form submission failed, Please try again.</p>`;
        notification.classList.add("failure");
        notification.classList.remove("hidden");
        setTimeout(() => {
          notification.classList.add("hidden");
        }, 2000);
      });
  } else {
    notification.innerHTML = `<p>Form submission failed, Please check network connection.</p>`;
    notification.classList.add("failure");
    notification.classList.remove("hidden");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 2000);
  }
}
