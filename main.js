const favoritesKey = "menuFavorites";
let favorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];

function saveFavorites() {
  localStorage.setItem(favoritesKey, JSON.stringify(favorites));
}

const filters = document.querySelectorAll(".filter");
const items = document.querySelectorAll(".menu-item");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((btn) => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;

    items.forEach((item) => {
      item.style.display =
        category === "all" || item.dataset.category === category
          ? "flex"
          : "none";
    });
  });
});

const modal = document.getElementById("menuModal");
const closeBtn = modal.querySelector(".close");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalPrice = document.getElementById("modalPrice");
const modalWeight = document.getElementById("modalWeight");
const modalImage = document.getElementById("modalImage");
const modalFav = document.querySelector(".modal-fav");

let count = 1;
let basePrice = 0;
let borderPrice = 0;
const countEl = document.getElementById("count");
const totalPriceEl = document.getElementById("totalPrice");
const borderRadios = document.querySelectorAll('input[name="border"]');

function updateTotalPrice() {
  countEl.innerText = count;
  totalPriceEl.innerText = (basePrice + borderPrice) * count + " грн";
}

items.forEach((item) => {
  const itemId = item.dataset.id;
  const favBtn = item.querySelector(".fav-btn");

  if (favorites.includes(itemId)) {
    favBtn.classList.add("active");
  }

  favBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (favorites.includes(itemId)) {
      favorites = favorites.filter((id) => id !== itemId);
      favBtn.classList.remove("active");
    } else {
      favorites.push(itemId);
      favBtn.classList.add("active");
    }

    if (modal.style.display === "flex" && modal.dataset.id === itemId) {
      modalFav.classList.toggle("active", favorites.includes(itemId));
    }

    saveFavorites();
  });

  item.addEventListener("click", (e) => {
    if (e.target.closest(".fav-btn")) return;

    const name = item.querySelector(".item-name").innerText;
    const desc = item.querySelector(".item-desc").innerText;
    const price = item.querySelector(".item-price").innerText;
    const weight = item.querySelector(".item-weight").innerText;
    const imgSrc = item.querySelector("img").src;

    modalTitle.innerText = name;
    modalDesc.innerText = desc;
    modalPrice.innerText = price;
    modalWeight.innerText = weight;
    modalImage.src = imgSrc;

    modal.dataset.id = itemId;
    modal.style.display = "flex";

    modalFav.classList.toggle("active", favorites.includes(itemId));

    basePrice = parseInt(price.replace(/\D/g, ""));
    count = 1;
    countEl.innerText = count;
    const checkedBorder = document.querySelector(
      'input[name="border"]:checked',
    );
    borderPrice = parseInt(checkedBorder.dataset.price);
    updateTotalPrice();
  });
});

modalFav.addEventListener("click", () => {
  const itemId = modal.dataset.id;
  if (!itemId) return;

  if (favorites.includes(itemId)) {
    favorites = favorites.filter((id) => id !== itemId);
    modalFav.classList.remove("active");
  } else {
    favorites.push(itemId);
    modalFav.classList.add("active");
  }

  const cardFavBtn = document.querySelector(
    `.menu-item[data-id="${itemId}"] .fav-btn`,
  );
  if (cardFavBtn)
    cardFavBtn.classList.toggle("active", favorites.includes(itemId));

  saveFavorites();
});

closeBtn.addEventListener("click", () => (modal.style.display = "none"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.style.display = "none";
});

document.getElementById("plus").onclick = () => {
  count++;
  updateTotalPrice();
};
document.getElementById("minus").onclick = () => {
  if (count > 1) {
    count--;
    updateTotalPrice();
  }
};
borderRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    borderPrice = parseInt(radio.dataset.price);
    updateTotalPrice();
  });
});
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
let scrollPosition = 0;

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("open");

  if (mobileMenu.classList.contains("open")) {
    scrollPosition = window.scrollY;

    document.body.classList.add("menu-open");
    document.body.style.top = `-${scrollPosition}px`;
  } else {
    document.body.classList.remove("menu-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  }
});

const mobileLinks = document.querySelectorAll("#mobileMenu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    burger.classList.remove("active");
    document.body.classList.remove("menu-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
  });
});
