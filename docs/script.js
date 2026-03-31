import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "YOUR KEY",
  authDomain: "YOUR DOMAIN",
  databaseURL: "YOUR URL",
  projectId: "YOUR ID",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let selectedCity = "";
let selectedPrice = 0;

// OPEN POPUP
window.openPopup = function(city, price){
  selectedCity = city;
  selectedPrice = price;

  document.getElementById("popup").style.display = "flex";
  document.getElementById("city").value = city;
};

// CLOSE POPUP
window.closePopup = function(){
  document.getElementById("popup").style.display = "none";
};

// SUCCESS CLOSE
window.closeSuccess = function(){
  document.getElementById("successPopup").style.display = "none";
};

// TOTAL CALCULATION
document.getElementById("tickets").addEventListener("input", function(){
  document.getElementById("total").value = "₹" + (this.value * selectedPrice);
});

// FORM SUBMIT
document.getElementById("bookingForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const tickets = document.getElementById("tickets").value;

  if(!name || !email || !tickets){
    alert("Please fill all details");
    return;
  }

  const bookingRef = push(ref(db,"bookings"));

  set(bookingRef,{
    name,
    email,
    city:selectedCity,
    tickets,
    total: selectedPrice * tickets
  })
  .then(()=>{
    document.getElementById("bookingForm").reset();
    closePopup();

    document.getElementById("successPopup").style.display = "flex";
  })
  .catch(()=>{
    alert("Error saving booking");
  });

});
