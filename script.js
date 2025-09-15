// EmailJS initialization (replace 'YOUR_USER_ID' with your actual user ID)
(function(){
  emailjs.init("YOUR_USER_ID");
})();

// List of services
const services = [
  { name: "Dry Cleaning", price: 200 },
  { name: "Wash & Fold", price: 100 },
  { name: "Ironing", price: 30 },
  { name: "Stain Removal", price: 500 },
  { name: "Leather & Suede Cleaning", price: 999 },
  { name: "Wedding Dress Cleaning", price: 2800 }
];

const serviceListEl = document.getElementById('serviceList');
const cartTable = document.getElementById('cartTable');
const totalAmountEl = document.getElementById('totalAmount');

let cart = [];

function renderServices() {
  serviceListEl.innerHTML = '';
  services.forEach((service, idx) => {
    serviceListEl.innerHTML += `
      <div class="service-item">
        <span>${service.name} ₹${service.price}.00</span>
        <div>
          <button onclick="addToCart(${idx})">Add Item+</button>
        </div>
      </div>`;
  });
}
window.addEventListener('DOMContentLoaded', renderServices);

function addToCart(index) {
  const service = services[index];
  if (!cart.some(item => item.name === service.name)) {
    cart.push({...service});
    renderCart();
  }
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartTable.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    cartTable.innerHTML += `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.name}</td>
        <td>₹${item.price}.00</td>
        <td><button onclick="removeFromCart(${idx})">Remove Item</button></td>
      </tr>`;
    total += item.price;
  });
  totalAmountEl.textContent = total;
}

function scrollToBooking() {
  document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
}

// Booking form event
document.getElementById('bookingForm').addEventListener('submit', function(e){
  e.preventDefault();
  // Validate cart
  if (cart.length === 0) {
    document.getElementById('confirmationMsg').textContent = "Please add at least one service to the cart before booking.";
    return;
  }
  // Send email via EmailJS
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    cart: cart.map(item => `${item.name} - ₹${item.price}`).join(', '),
    fullName: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    totalAmount: totalAmountEl.textContent
  })
  .then(function(response) {
    document.getElementById('confirmationMsg').textContent = "Thank you For Booking the Service. We will get back to you soon!";
    cart = [];
    renderCart();
    document.getElementById('bookingForm').reset();
  }, function(error) {
    document.getElementById('confirmationMsg').textContent = "Failed to book. Try again!";
  });
});

// Newsletter form event
document.getElementById('newsletterForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('subscribeMsg').textContent = "Subscribed! You'll now receive our updates.";
  document.getElementById('newsletterForm').reset();
});
