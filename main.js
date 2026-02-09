const filters = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.menu-item');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    filter.classList.add('active');

    const category = filter.dataset.filter;

    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

const modal = document.getElementById('menuModal');
const closeBtn = modal.querySelector('.close');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalWeight = document.getElementById('modalWeight');
const modalImage = document.getElementById('modalImage');

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.querySelector('.item-name').innerText;
    const desc = item.querySelector('.item-desc').innerText;
    const price = item.querySelector('.item-price').innerText;
    const weight = item.querySelector('.item-weight').innerText;
    const imgSrc = item.querySelector('img').src;

    modalTitle.innerText = name;
    modalDesc.innerText = desc;
    modalPrice.innerText = `${price}`;
    modalWeight.innerText = weight;
    modalImage.src = imgSrc;

    modal.style.display = 'flex';
  });
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

let count = 1;
let basePrice = 0;
let borderPrice = 0;

const countEl = document.getElementById('count');
const totalPriceEl = document.getElementById('totalPrice');
const borderRadios = document.querySelectorAll('input[name="border"]');

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const priceText = item.querySelector('.item-price').innerText;
    basePrice = parseInt(priceText.replace(/\D/g, ''));

    count = 1;
    countEl.innerText = count;

    const checkedBorder = document.querySelector('input[name="border"]:checked');
    borderPrice = parseInt(checkedBorder.dataset.price);

    updateTotalPrice();
  });
});

document.getElementById('plus').onclick = () => {
  count++;
  updateTotalPrice();
};

document.getElementById('minus').onclick = () => {
  if (count > 1) {
    count--;
    updateTotalPrice();
  }
};

borderRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    borderPrice = parseInt(radio.dataset.price);
    updateTotalPrice();
  });
});

function updateTotalPrice() {
  countEl.innerText = count;
  const total = (basePrice + borderPrice) * count;
  totalPriceEl.innerText = total + ' грн';
}

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");

burger.addEventListener("click", () => {
  nav.classList.toggle("open");
  document.body.classList.toggle("menu-open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});
