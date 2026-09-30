/* =========================

   MOBILE MENU

========================= */

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {

  mainNav.classList.toggle("open");

});

/* Close mobile menu after clicking */

document.querySelectorAll("#mainNav a").forEach(link => {

  link.addEventListener("click", () => {

    mainNav.classList.remove("open");

  });

});

/* =========================

   MENU FILTER

========================= */

const menuTabs = document.querySelectorAll(".menu-tab");

const foodCards = document.querySelectorAll(".food-card");

menuTabs.forEach(tab => {

  tab.addEventListener("click", () => {

    menuTabs.forEach(item => {

      item.classList.remove("active");

    });

    tab.classList.add("active");

    const category = tab.dataset.category;

    foodCards.forEach(card => {

      if (category === "all" || card.dataset.category === category) {

        card.style.display = "block";

      } else {

        card.style.display = "none";

      }

    });

  });

});

/* =========================

   FAQ

========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const question = item.querySelector(".faq-question");

  const symbol = question.querySelector("span");

  question.addEventListener("click", () => {

    const isOpen = item.classList.contains("open");

    faqItems.forEach(otherItem => {

      otherItem.classList.remove("open");

      const otherSymbol =

        otherItem.querySelector(".faq-question span");

      otherSymbol.textContent = "+";

    });

    if (!isOpen) {

      item.classList.add("open");

      symbol.textContent = "−";

    }

  });

});

/* =========================

   DATE MINIMUM

========================= */

const guestDate = document.getElementById("guestDate");

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

guestDate.min = `${year}-${month}-${day}`;

/* =========================

   RESERVATION FORM

========================= */

const reservationForm =

  document.getElementById("reservationForm");

const successModal =

  document.getElementById("successModal");

const modalClose =

  document.getElementById("modalClose");

const modalOk =

  document.getElementById("modalOk");

reservationForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const reservationData = {

    name: document.getElementById("guestName").value,

    email: document.getElementById("guestEmail").value,

    date: document.getElementById("guestDate").value,

    time: document.getElementById("guestTime").value,

    guests: document.getElementById("guestCount").value,

    message: document.getElementById("guestMessage").value,

    submittedAt: new Date().toISOString()

  };

  /*

    Demo storage only.

    This does NOT send an email or reservation

    to the restaurant.

  */

  const previousRequests =

    JSON.parse(

      localStorage.getItem("shyamaShreeReservations") || "[]"

    );

  previousRequests.push(reservationData);

  localStorage.setItem(

    "shyamaShreeReservations",

    JSON.stringify(previousRequests)

  );

  successModal.classList.add("show");

  reservationForm.reset();

});

/* =========================

   MODAL CLOSE

========================= */

function closeModal() {

  successModal.classList.remove("show");

}

modalClose.addEventListener("click", closeModal);

modalOk.addEventListener("click", closeModal);

successModal.addEventListener("click", event => {

  if (event.target === successModal) {

    closeModal();

  }

});

/* =========================

   FOOTER YEAR

========================= */

document.getElementById("year").textContent =

  new Date().getFullYear();

/* =========================

   SIMPLE SCROLL REVEAL

========================= */

const revealElements = document.querySelectorAll(

  ".intro-card, .food-card, .ingredient-card, .special-card, .gallery-grid img"

);

const revealObserver =

  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform = "translateY(0)";

          revealObserver.unobserve(entry.target);

        }

      });

    },

    {

      threshold: 0.1

    }

  );

revealElements.forEach(element => {

  element.style.opacity = "0";

  element.style.transform = "translateY(20px)";

  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

  revealObserver.observe(element);

});