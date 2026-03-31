import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBQcex7SCBZVv8UBLfvw1MNX7T9Jxq6s",
  authDomain: "world-jouney-db.firebaseapp.com",
  databaseURL: "https://world-jouney-db-default-rtdb.firebaseio.com",
  projectId: "world-jouney-db",
  storageBucket: "world-jouney-db.appspot.com",
  messagingSenderId: "933142094435",
  appId: "1:933142094435:web:c9d0c87a4118a31c9676cb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let selectedCity = "";
let selectedPrice = 0;

window.openPopup = function (city, price) {
  selectedCity = city;
  selectedPrice = price;
  document.getElementById("popup").style.display = "flex";
  document.getElementById("city").value = city;
  document.getElementById("total").value = "₹" + price;
};

window.closePopup = function () {
  document.getElementById("popup").style.display = "none";
};

document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value;
  const tickets = parseInt(document.getElementById("tickets").value);
  const total = selectedPrice * tickets;

  if (!name || !email || !tickets) {
    alert("⚠️ Please fill all fields before confirming!");
    return;
  }

  const bookingsRef = ref(db, "bookings");
  const newBookingRef = push(bookingsRef);

  set(newBookingRef, {
    name: name,
    email: email,
    city: city,
    tickets: tickets,
    total: total,
    bookingTime: new Date().toLocaleString(),
  })
    .then(() => {
      alert("✅ Booking Confirmed! Saved to Database.");
      document.getElementById("bookingForm").reset();
      document.getElementById("total").value = "";
      closePopup();
    })
    .catch((error) => {
      console.error("❌ Error:", error);
      alert("❌ Booking failed. Try again.");
    });
});                                                                                                                                              
