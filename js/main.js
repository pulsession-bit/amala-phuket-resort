// Main Interactive Controller for Amala Grand Bleu Resort Hilltops

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initThemeSwitcher();
  initLanguageAndCurrency();
  renderVillas("all");
  initVillaFilters();
  initBookingEngine();
  initFAQ();
  initModals();
  initNewsletter();
});

// Theme Switcher Controller (Bleu Océan, Clair, Chocolat)
function initThemeSwitcher() {
  const savedTheme = localStorage.getItem("amala_theme") || "blue";
  setTheme(savedTheme, false);

  const themeBtns = document.querySelectorAll(".theme-pill-btn, .dock-theme-btn");
  themeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme");
      setTheme(theme, true);
    });
  });
}

function setTheme(theme, notify = true) {
  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("amala_theme", theme);

  document.querySelectorAll(".theme-pill-btn, .dock-theme-btn").forEach(b => {
    if (b.getAttribute("data-theme") === theme) {
      b.classList.add("active");
    } else {
      b.classList.remove("active");
    }
  });

  if (notify) {
    showToast(`🎨 Thème appliqué : ${getThemeName(theme)}`);
  }
}

function getThemeName(theme) {
  switch (theme) {
    case "light": return "Clair (Sable Blanc & Ivoire)";
    case "chocolate": return "Chocolat (Moka & Teck Chaud)";
    case "blue":
    default: return "Bleu Océan (Andaman & Saphir)";
  }
}

// Navbar Scroll & Mobile Menu
function initNavbar() {
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
      });
    });
  }
}

// Language and Currency Switching
function initLanguageAndCurrency() {
  const langSelect = document.getElementById("lang-select");
  const currencySelect = document.getElementById("currency-select");

  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      currentLang = e.target.value;
      updatePageLanguage(currentLang);
      renderVillas(getCurrentActiveFilter());
      updateBookingSummary();
    });
  }

  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      renderVillas(getCurrentActiveFilter());
      updateBookingSummary();
    });
  }
}

function updatePageLanguage(lang) {
  const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update inputs placeholder if any
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      el.setAttribute("placeholder", dict[key]);
    }
  });
}

function formatPrice(amountTHB) {
  const currencyInfo = CURRENCY_RATES[currentCurrency] || CURRENCY_RATES.EUR;
  const converted = Math.round(amountTHB * currencyInfo.rate);
  return `${currencyInfo.symbol} ${converted.toLocaleString()}`;
}

function getCurrentActiveFilter() {
  const activeBtn = document.querySelector(".filter-btn.active");
  return activeBtn ? activeBtn.getAttribute("data-filter") : "all";
}

// Render Accommodations / Villas Cards
function renderVillas(filter = "all") {
  const container = document.getElementById("villas-container");
  if (!container) return;

  const filtered = filter === "all" 
    ? VILLAS_DATA 
    : VILLAS_DATA.filter(v => v.category === filter);

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;

  container.innerHTML = filtered.map(villa => {
    const title = villa.title[currentLang] || villa.title.fr;
    const shortDesc = villa.shortDesc[currentLang] || villa.shortDesc.fr;
    const view = villa.view[currentLang] || villa.view.fr;
    const formattedPrice = formatPrice(villa.priceTHB);

    return `
      <article class="villa-card" data-category="${villa.category}">
        <div class="villa-image-wrapper">
          <img src="${villa.image}" alt="${title}" class="villa-card-img" loading="lazy">
          <span class="villa-badge">${view}</span>
        </div>
        <div class="villa-card-body">
          <h3 class="villa-card-title">${title}</h3>
          <p class="villa-card-desc">${shortDesc}</p>
          
          <div class="villa-specs">
            <div class="spec-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/></svg>
              <span>${villa.size}</span>
            </div>
            <div class="spec-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <span>${villa.guests}</span>
            </div>
            <div class="spec-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v10h22V9c0-1.1-.9-2-2-2z"/></svg>
              <span>${villa.bed}</span>
            </div>
            <div class="spec-item">
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c-5.33 0-8 3-8 3v12c0 2 2 4 4 4s4-2 4-4v-7c0-1.1.9-2 2-2s2 .9 2 2v7c0 3.31-2.69 6-6 6s-6-2.69-6-6v-1h2v1c0 2.21 1.79 4 4 4s4-1.79 4-4v-7c0-2.21-1.79-4-4-4-2.25 0-3.75 1.25-4 1.4V5s2.25-1 6-1 6 2 6 2v1h2V6s-2.67-4-8-4z"/></svg>
              <span>Piscine Privée</span>
            </div>
          </div>

          <div class="villa-card-footer">
            <div class="villa-price-wrap">
              <span class="price-from">À partir de</span>
              <div class="price-value">${formattedPrice} <span class="price-unit">${dict.perNight || "/ nuit"}</span></div>
            </div>
            <div class="villa-card-actions">
              <button class="btn-card-details" onclick="openVillaModal('${villa.id}')">
                ${dict.viewDetails || "Détails"}
              </button>
              <button class="btn-card-book" onclick="prefillBooking('${villa.id}')">
                ${dict.bookNow || "Réserver"}
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

// Villa Filters
function initVillaFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-filter");
      renderVillas(category);
    });
  });
}

// Booking Engine Logic & Price Calculator
function initBookingEngine() {
  const checkinInput = document.getElementById("bar-checkin");
  const checkoutInput = document.getElementById("bar-checkout");

  // Default dates: tomorrow and +3 days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const departure = new Date(today);
  departure.setDate(today.getDate() + 4);

  const formatDate = (d) => d.toISOString().split("T")[0];

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDate(tomorrow);
    checkinInput.value = formatDate(tomorrow);
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(departure);

    checkinInput.addEventListener("change", () => {
      const cin = new Date(checkinInput.value);
      cin.setDate(cin.getDate() + 1);
      checkoutInput.min = formatDate(cin);
      if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
        checkoutInput.value = formatDate(cin);
      }
      updateBookingSummary();
    });

    checkoutInput.addEventListener("change", () => {
      updateBookingSummary();
    });
  }

  // Bar search button
  const searchBtn = document.getElementById("bar-search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const selectedCategory = document.getElementById("bar-category").value;
      const villa = VILLAS_DATA.find(v => v.id === selectedCategory) || VILLAS_DATA[0];
      prefillBooking(villa.id);
    });
  }

  // Modal input listeners
  const modalVillaSelect = document.getElementById("modal-villa-select");
  const modalCheckin = document.getElementById("modal-checkin");
  const modalCheckout = document.getElementById("modal-checkout");
  const addonFloating = document.getElementById("addon-floating");
  const addonTransfer = document.getElementById("addon-transfer");
  const addonRomantic = document.getElementById("addon-romantic");

  if (modalVillaSelect) {
    modalVillaSelect.innerHTML = VILLAS_DATA.map(v => `
      <option value="${v.id}">${v.title.fr}</option>
    `).join("");
    modalVillaSelect.addEventListener("change", updateBookingSummary);
  }

  [modalCheckin, modalCheckout, addonFloating, addonTransfer, addonRomantic].forEach(el => {
    if (el) el.addEventListener("change", updateBookingSummary);
  });

  // Booking Form Submit
  const bookingForm = document.getElementById("booking-modal-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleBookingSubmission();
    });
  }
}

function updateBookingSummary() {
  const modalVillaSelect = document.getElementById("modal-villa-select");
  const modalCheckin = document.getElementById("modal-checkin");
  const modalCheckout = document.getElementById("modal-checkout");
  const nightsLabel = document.getElementById("summary-nights-count");
  const totalLabel = document.getElementById("summary-total-price");

  if (!modalVillaSelect || !modalCheckin || !modalCheckout) return;

  const villa = VILLAS_DATA.find(v => v.id === modalVillaSelect.value) || VILLAS_DATA[0];
  const cin = new Date(modalCheckin.value || new Date());
  const cout = new Date(modalCheckout.value || new Date());

  let diffTime = cout.getTime() - cin.getTime();
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays <= 0) diffDays = 1;

  let totalTHB = villa.priceTHB * diffDays;

  // Addons
  const addonFloating = document.getElementById("addon-floating");
  const addonTransfer = document.getElementById("addon-transfer");
  const addonRomantic = document.getElementById("addon-romantic");

  if (addonFloating && addonFloating.checked) {
    // If >= 3 nights, floating breakfast is offered free as per promotion!
    if (diffDays < 3) {
      totalTHB += 1500;
    }
  }
  if (addonTransfer && addonTransfer.checked) totalTHB += 1200;
  if (addonRomantic && addonRomantic.checked) totalTHB += 2500;

  if (nightsLabel) {
    const promoNote = diffDays >= 3 ? " (Promo: Petit-déjeuner flottant offert !)" : "";
    nightsLabel.textContent = `${diffDays} Nuit(s) • ${villa.title[currentLang] || villa.title.fr}${promoNote}`;
  }

  if (totalLabel) {
    totalLabel.textContent = formatPrice(totalTHB);
  }
}

// Open Villa Details Modal
window.openVillaModal = function(villaId) {
  const villa = VILLAS_DATA.find(v => v.id === villaId);
  if (!villa) return;

  const modal = document.getElementById("villa-details-modal");
  const content = document.getElementById("villa-details-content");
  if (!modal || !content) return;

  const title = villa.title[currentLang] || villa.title.fr;
  const longDesc = villa.longDesc[currentLang] || villa.longDesc.fr;
  const view = villa.view[currentLang] || villa.view.fr;
  const formattedPrice = formatPrice(villa.priceTHB);

  const featuresList = villa.features.map(f => {
    const text = f[currentLang] || f.fr;
    return `<li>✓ ${text}</li>`;
  }).join("");

  content.innerHTML = `
    <div style="position: relative; height: 320px; border-radius: 16px; overflow: hidden; margin-bottom: 24px;">
      <img src="${villa.image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
      <span class="villa-badge" style="position: absolute; bottom: 16px; left: 16px;">${view}</span>
    </div>
    
    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; flex-wrap: wrap; margin-bottom: 16px;">
      <div>
        <h2 style="font-size: 2rem; color: #fff; margin-bottom: 6px;">${title}</h2>
        <p style="color: var(--gold-light); font-size: 0.95rem;">${villa.size} • ${villa.guests} • ${villa.bed}</p>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 0.8rem; color: var(--text-dim); text-transform: uppercase;">Tarif Direct Garanti</span>
        <div style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 700; color: var(--gold-light);">${formattedPrice} <span style="font-size: 0.9rem; color: var(--text-muted);">/ nuit</span></div>
      </div>
    </div>

    <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin-bottom: 24px;">${longDesc}</p>

    <h4 style="font-size: 1.1rem; color: #fff; margin-bottom: 12px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">Équipements & Inclusions Exclusives</h4>
    <ul style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; list-style: none; margin-bottom: 30px; color: var(--text-muted); font-size: 0.9rem;">
      ${featuresList}
    </ul>

    <div style="display: flex; gap: 14px; justify-content: flex-end;">
      <button class="btn-secondary" onclick="closeModals()">Fermer</button>
      <button class="btn-luxury" onclick="closeModals(); prefillBooking('${villa.id}');">Réserver cette Villa</button>
    </div>
  `;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

// Prefill Booking Form & Open Modal
window.prefillBooking = function(villaId) {
  const modal = document.getElementById("booking-modal");
  const modalVillaSelect = document.getElementById("modal-villa-select");
  const barCheckin = document.getElementById("bar-checkin");
  const barCheckout = document.getElementById("bar-checkout");
  const modalCheckin = document.getElementById("modal-checkin");
  const modalCheckout = document.getElementById("modal-checkout");

  if (modalVillaSelect) modalVillaSelect.value = villaId;
  if (modalCheckin && barCheckin) modalCheckin.value = barCheckin.value;
  if (modalCheckout && barCheckout) modalCheckout.value = barCheckout.value;

  updateBookingSummary();

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

function initModals() {
  const overlays = document.querySelectorAll(".modal-overlay");
  overlays.forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeModals();
      }
    });
  });

  const closeBtns = document.querySelectorAll(".modal-close-btn");
  closeBtns.forEach(btn => {
    btn.addEventListener("click", closeModals);
  });
}

window.closeModals = function() {
  document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
  document.body.style.overflow = "auto";
};

// Handle Booking Form Submit
function handleBookingSubmission() {
  const fullName = document.getElementById("guest-name").value.trim();
  const email = document.getElementById("guest-email").value.trim();
  const phone = document.getElementById("guest-phone").value.trim();
  const villaId = document.getElementById("modal-villa-select").value;
  const checkin = document.getElementById("modal-checkin").value;
  const checkout = document.getElementById("modal-checkout").value;
  const total = document.getElementById("summary-total-price").textContent;
  const addonFloating = document.getElementById("addon-floating");
  const breakfastChoice = addonFloating && addonFloating.checked ? "Yes (Floating Breakfast in Pool)" : "Standard";

  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || fullName;
  const lastName = nameParts.slice(1).join(" ") || "-";

  const villa = VILLAS_DATA.find(v => v.id === villaId) || VILLAS_DATA[0];

  closeModals();
  showToast(`✨ Merci ${fullName} ! Votre demande pour ${villa.title.fr} (${checkin} au ${checkout}) a été enregistrée.`);

  // Exact official WhatsApp format used by Amala Grand Bleu Resort
  const whatsappText = `Reservation and Special Price Enquiry\n\nFirst Name: ${firstName}\nLast Name: ${lastName}\nCheck-in Date: ${checkin}\nCheck-out Date: ${checkout}\nRoom Type: ${villa.title.en}\nBreakfast: ${breakfastChoice}\nWhatsApp Contact: ${phone}\nEmail Address: ${email}\nEstimated Total: ${total}`;

  const whatsappUrl = `https://wa.me/${RESORT_CONTACT.whatsapp}?text=${encodeURIComponent(whatsappText)}`;

  setTimeout(() => {
    const confirmWhatsApp = confirm(
      `Votre demande de réservation a été enregistrée !\n\nSouhaitez-vous contacter directement la réception de l'Amala Grand Bleu Resort sur WhatsApp (+66 95 336 2244) pour une confirmation immédiate ?`
    );
    if (confirmWhatsApp) {
      window.open(whatsappUrl, "_blank");
    }
  }, 1000);
}

// FAQ Accordion
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) item.classList.add("active");
    });
  });
}

// Toast System
function showToast(message) {
  let toast = document.getElementById("site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "site-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 4500);
}

// Newsletter
function initNewsletter() {
  const form = document.querySelector(".newsletter-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector(".newsletter-input");
      if (input && input.value) {
        showToast("✨ Bienvenue au Club Privilège Amala ! Votre bon de réduction -10% vous a été envoyé par email.");
        input.value = "";
      }
    });
  }
}
