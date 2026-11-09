const products = [
    { id: 1, name: 'Aero Buds Pro', cat: 'Аудио', price: 7990, old: 9990, emoji: '🎧', tint: '#e8edff', badge: '−20%' },
    { id: 2, name: 'Pulse Watch 5', cat: 'Носимые', price: 18990, emoji: '⌚', tint: '#e3f6ec', badge: 'Новинка' },
    { id: 3, name: 'Nova X Phone', cat: 'Смартфоны', price: 64990, emoji: '📱', tint: '#fdeee3' },
    { id: 4, name: 'Slate Book 14', cat: 'Ноутбуки', price: 89990, emoji: '💻', tint: '#efe9fb' },
    { id: 5, name: 'Lens One 4K', cat: 'Фото', price: 42990, old: 49990, emoji: '📷', tint: '#e8edff', badge: 'Хит' },
    { id: 6, name: 'Orbit Speaker', cat: 'Аудио', price: 5490, emoji: '🔊', tint: '#e3f6ec' },
    { id: 7, name: 'Tab Air 11', cat: 'Планшеты', price: 38990, emoji: '📲', tint: '#fdeee3' },
    { id: 8, name: 'Pad Pro Keyboard', cat: 'Аксессуары', price: 6990, emoji: '⌨️', tint: '#efe9fb' },
];

const fmt = n => n.toLocaleString('ru-RU') + ' ₽';
const grid = document.getElementById('grid');
const filters = document.getElementById('filters');
const search = document.getElementById('search');
const cartCount = document.getElementById('cartCount');

let category = 'Все';
let query = '';
let cart = 0;

const categories = ['Все', ...new Set(products.map(p => p.cat))];

function renderFilters() {
    filters.innerHTML = categories.map(c =>
        `<button class="chip" aria-pressed="${c === category}" data-cat="${c}">${c}</button>`
    ).join('');
}

function renderGrid() {
    const list = products.filter(p =>
        (category === 'Все' || p.cat === category) &&
        p.name.toLowerCase().includes(query.toLowerCase())
    );

    grid.innerHTML = list.length
        ? list.map(p => `
            <article class="card">
                <div class="card-media" style="--tint:${p.tint}">
                    ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
                    <span aria-hidden="true">${p.emoji}</span>
                </div>
                <div class="card-body">
                    <span class="card-cat">${p.cat}</span>
                    <h3 class="card-title">${p.name}</h3>
                    <div class="card-foot">
                        <div class="price">${p.old ? `<s>${fmt(p.old)}</s>` : ''}${fmt(p.price)}</div>
                        <button class="add-btn" data-id="${p.id}">В корзину</button>
                    </div>
                </div>
            </article>`).join('')
        : '<p class="empty">Ничего не найдено. Попробуйте изменить запрос.</p>';
}

filters.addEventListener('click', e => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    category = btn.dataset.cat;
    renderFilters();
    renderGrid();
});

search.addEventListener('input', e => {
    query = e.target.value.trim();
    renderGrid();
});

grid.addEventListener('click', e => {
    const btn = e.target.closest('.add-btn');
    if (!btn) return;
    cart++;
    cartCount.textContent = cart;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
    btn.textContent = 'Добавлено ✓';
    setTimeout(() => (btn.textContent = 'В корзину'), 1200);
});

renderFilters();
renderGrid();
