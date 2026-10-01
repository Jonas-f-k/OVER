
const toast = (msg) => {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
};

document.addEventListener('click', (e) => {
  const like = e.target.closest('.like-btn');
  if (like) {
    like.classList.toggle('liked');
    const n = like.querySelector('[data-count]');
    if (n) n.textContent = Number(n.textContent) + (like.classList.contains('liked') ? 1 : -1);
    toast(like.classList.contains('liked') ? 'Liked setup' : 'Like removed');
  }

  const chip = e.target.closest('.chip[data-filter]');
  if (chip) {
    document.querySelectorAll('.chip[data-filter]').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.setup-card').forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
    });
  }
});

const search = document.querySelector('[data-search]');
if (search) {
  search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    document.querySelectorAll('.setup-card').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(q) ? '' : 'none';
    });
  });
}

const fileInput = document.querySelector('#imageInput');
const preview = document.querySelector('#preview');
if (fileInput && preview) {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    preview.src = URL.createObjectURL(file);
    preview.hidden = false;
    toast('Image preview loaded');
  });
}

document.querySelectorAll('form[data-demo-form]').forEach(form => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    toast('Demo only — form submitted');
  });
});
