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
