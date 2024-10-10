let btnicon = document.querySelector(".btn i");
let cross = document.querySelector(".elements i");

var tl = gsap.timeline();

// Slide in the elements from the right
tl.to(".elements", {
  right: "0",
  duration: 0.4,
});

// Animate nav links to slide in
tl.from(".navlinks li", {
  x: 150,
  duration: 0.4,
  stagger: 0.2,
  opacity: 0,
});

// Animate the icon appearance
tl.from(".elements i", {
  opacity: 0,
});

// Pause the timeline initially
tl.pause();

// Event listener for the button icon to play the timeline
btnicon.addEventListener("click", function () {
  tl.play();
});

// Event listener for the cross icon to reverse the timeline
cross.addEventListener("click", function () {
  tl.reverse();
});



// Initialize current indexes for sliders
let currentIndexes = [0, 0, 0];

function moveSlide(direction, containerIndex) {
  const novelContainers = document.querySelectorAll(".novel-container .grid");
  const totalSlides =
    novelContainers[containerIndex].querySelectorAll(".novel").length;
  const cardsToShow = 3;

  // Update current index based on direction
  currentIndexes[containerIndex] += direction;

  // Ensure the index stays within valid bounds
  if (currentIndexes[containerIndex] < 0) {
    currentIndexes[containerIndex] = 0;
  } else if (currentIndexes[containerIndex] >= totalSlides - cardsToShow) {
    currentIndexes[containerIndex] = totalSlides - cardsToShow;
  }

  // Calculate offset for the slide
  const offset = currentIndexes[containerIndex] * (100 / cardsToShow);
  novelContainers[containerIndex].style.transform = `translateX(-${offset}%)`;
}




// cart  

const books = [
  { id: 1, name: "The Power of Subconscious Mind", price: 10.99, imageUrl: "/images/card-6.webp", alt: "The Power of Subconscious Mind" },
  { id: 2, name: "You Only Live Once", price: 12.50, imageUrl: "/images/card-2.webp", alt: "You Only Live Once" },
  { id: 3, name: "The Love Hypothesis", price: 11.25, imageUrl: "/images/image3.jpg", alt: "The Love Hypothesis" },
  { id: 4, name: "It Starts With Us", price: 9.99, imageUrl: "/images/image4.jpg", alt: "It Starts With Us" },
  { id: 5, name: "You Can", price: 8.50, imageUrl: "/images/image5.jpg", alt: "You Can" },
  { id: 6, name: "Atomic Habits", price: 15.00, imageUrl: "/images/image6.jpg", alt: "Atomic Habits" },
  { id: 7, name: "The 7 Habits of Highly Effective People", price: 14.99, imageUrl: "/images/image7.jpg", alt: "The 7 Habits of Highly Effective People" },
  { id: 8, name: "Learn, Don't Study", price: 15.00, imageUrl: "/images/image21.webp", alt: "Learn, Don't Study" },
  { id: 9, name: "Siddhartha by Hermann Hesse", price: 15.00, imageUrl: "/images/image22.jpg", alt: "Siddhartha by Hermann Hesse" },
  { id: 10, name: "Life's Amazing Secrets", price: 15.00, imageUrl: "/images/image23.jpg", alt: "Life's Amazing Secrets" },
  { id: 11, name: "Think Straight", price: 15.00, imageUrl: "/images/image24.jpg", alt: "Think Straight" },
  { id: 12, name: "The Psychology of Money", price: 11.00, imageUrl: "/images/image25.webp", alt: "The Psychology of Money" },
  { id: 13, name: "Let It Be Incomplete", price: 8.00, imageUrl: "/images/image26.jpg", alt: "Let It Be Incomplete" },
  { id: 14, name: "Stop Overthinking", price: 10.00, imageUrl: "/images/image27.jpg", alt: "Stop Overthinking" },
  { id: 15, name: "Unleash The Secret to Success", price: 7.00, imageUrl: "/images/image28.jpg", alt: "Unleash The Secret to Success" }
];

// Get references to the total elements
const totalBooksElement = document.getElementById("totalBooks");
const totalPriceElement = document.getElementById("totalPrice");
const orderOnWhatsAppButton = document.getElementById("orderOnWhatsApp");
const notificationElement = document.getElementById("notification");

// Initialize total variables
let totalBooks = 0;
let totalPrice = 0;

// Function to update totals
function updateTotals() {
    totalBooksElement.textContent = totalBooks;
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to create book elements
function createBookElements() {
    const novelList = document.querySelector('.novel-list');
    novelList.innerHTML = ''; // Clear the list before populating

    books.forEach(book => {
        const novelDiv = document.createElement('div');
        novelDiv.classList.add('novel');

        // Create HTML structure for each book
        novelDiv.innerHTML = `
            <img src="${book.imageUrl}" alt="${book.alt}" />
            <p>${book.name}</p>
            <p class="price">$${book.price.toFixed(2)}</p>
            <input type="number" min="1" value="1" class="quantity" data-title="${book.name}" />
            <button class="buyNowBtn" data-title="${book.name}" data-price="${book.price}">Buy Now</button>
        `;

        // Append the book to the novel list
        novelList.appendChild(novelDiv);
    });
}

// Function to show notification
function showNotification(message) {
    notificationElement.innerText = message;
    notificationElement.style.display = 'block';
    setTimeout(() => {
        notificationElement.style.display = 'none';
    }, 3000);
}

// Function to handle Buy Now button click
function handleBuyNowClick(e) {
    const button = e.target;

    if (button.classList.contains('buyNowBtn')) {
        const title = button.getAttribute('data-title');
        const price = parseFloat(button.getAttribute('data-price'));
        const quantityInput = button.previousElementSibling; // Get the quantity input
        const quantity = parseInt(quantityInput.value); // Get quantity input value

        // Check for valid quantity
        if (isNaN(quantity) || quantity <= 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        // Update total books and total price
        totalBooks += quantity;
        totalPrice += price * quantity;

        // Update totals on the page
        updateTotals();

        // Show notification for added book
        showNotification(`${quantity} x "${title}" added to your order!`);

        // Create WhatsApp message
        const message = `Order Details:\nBook: ${title}\nQuantity: ${quantity}\nTotal Price: $${(price * quantity).toFixed(2)}`;
        orderOnWhatsAppButton.setAttribute('data-message', encodeURIComponent(message)); // Set message in button's data attribute

        // Disable the button to prevent further clicks and update text
        button.disabled = true;
        button.textContent = "Added to Cart"; // Change button text
    }
}

// Event listener for Buy Now buttons
document.addEventListener('click', handleBuyNowClick);

// Event listener for Place Order button
orderOnWhatsAppButton.addEventListener('click', () => {
    const message = orderOnWhatsAppButton.getAttribute('data-message');
    const phoneNumber = '7417258667'; // Replace with your WhatsApp number
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    window.open(whatsappURL, '_blank'); // Open WhatsApp with the message
});

// Initialize book elements on page load
createBookElements();

// Enable Buy Now button when quantity input changes
document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', (e) => {
        const button = e.target.nextElementSibling; // Buy Now button
        button.disabled = false; // Enable the button if quantity changes
        button.textContent = "Buy Now"; // Reset button text
    });
});
