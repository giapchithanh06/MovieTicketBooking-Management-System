/* =========================================================
   LOGIC CÁC TRANG: Chọn rạp, Lịch chiếu, Khuyến mãi,
   Tổ chức sự kiện, Giới thiệu, Bắp nước, Đặt vé
   Cần nạp js/data.js trước file này.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    highlightActiveNav();
    initCinemaPage();
    initSchedulePage();
    initPromoPage();
    initEventPage();
    initAboutPage();
    initPopcornPage();
    initBookingPage();
});

/* ---------- Đánh dấu menu đang ở trang nào ---------- */
function highlightActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === page) a.classList.add('active');
    });
}

/* ---------- Thanh chọn ngày dùng chung ---------- */
function renderDateBar(container, selectedIso, onSelect) {
    container.innerHTML = nextDays(7).map(d => `
        <button type="button" class="date-pill ${d.iso === selectedIso ? 'active' : ''}" data-date="${d.iso}">
            <span class="date-pill-label">${d.label}</span>
            <span class="date-pill-day">${d.day}</span>
        </button>`).join('');
    container.querySelectorAll('.date-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.date-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onSelect(btn.dataset.date);
        });
    });
}

/* ---------- Khối lịch chiếu của 1 phim tại 1 rạp ---------- */
function movieScheduleRow(movie, cinemaId, isoDate, showtimes) {
    const times = showtimes.map(s => `
        <a class="showtime-btn" href="${bookingUrl(cinemaId, movie.id, isoDate, s.time, s.format)}">
            ${s.time}<small>${s.format}</small>
        </a>`).join('');
    return `
        <div class="schedule-row">
            <a href="movie.html?id=${movie.id}" class="schedule-poster">
                <img src="${movie.poster}" alt="${movie.title}">
            </a>
            <div class="schedule-body">
                <div class="d-flex align-items-center gap-2 flex-wrap mb-1">
                    <span class="tag-age ${ageClass(movie.age)} rounded">${movie.age}</span>
                    <a href="movie.html?id=${movie.id}" class="schedule-title">${movie.title}</a>
                </div>
                <p class="schedule-genre"><i class="fa fa-tag me-1"></i>${movie.genre}</p>
                <div class="showtime-list">${times}</div>
            </div>
        </div>`;
}

const EMPTY_SCHEDULE = `
    <div class="empty-state">
        <i class="fa-regular fa-calendar-xmark"></i>
        <p>Không còn suất chiếu phù hợp. Vui lòng chọn ngày hoặc rạp khác.</p>
    </div>`;

/* =========================================================
   1. TRANG CHỌN RẠP  (rap.html)
   ========================================================= */
function initCinemaPage() {
    const list = document.getElementById('cinemaList');
    if (!list) return;

    const cityBar = document.getElementById('cityFilter');
    let city = 'all';
    let selectedCinema = getParam('id');
    let selectedDate = toISODate(new Date());

    cityBar.innerHTML = [{ id: 'all', name: 'Tất cả' }, ...CITIES].map(c =>
        `<button type="button" class="filter-chip ${c.id === 'all' ? 'active' : ''}" data-city="${c.id}">${c.name}</button>`
    ).join('');
    cityBar.querySelectorAll('.filter-chip').forEach(btn => btn.addEventListener('click', () => {
        cityBar.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        city = btn.dataset.city;
        renderList();
    }));

    function renderList() {
        const items = CINEMAS.filter(c => city === 'all' || c.city === city);
        list.innerHTML = items.map(c => `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="cinema-card ${c.id === selectedCinema ? 'active' : ''}" data-id="${c.id}" tabindex="0">
                    <div class="cinema-card-icon"><i class="fa fa-building"></i></div>
                    <div>
                        <h5 class="cinema-card-name">${c.name}</h5>
                        <p class="cinema-card-addr"><i class="fa fa-map-marker-alt me-1"></i>${c.address}</p>
                        <p class="cinema-card-meta">${c.rooms} phòng chiếu · ${c.formats.join(' · ')}</p>
                    </div>
                </div>
            </div>`).join('');
        list.querySelectorAll('.cinema-card').forEach(card => {
            const choose = () => selectCinema(card.dataset.id, true);
            card.addEventListener('click', choose);
            card.addEventListener('keydown', e => { if (e.key === 'Enter') choose(); });
        });
    }

    function selectCinema(id, scroll) {
        selectedCinema = id;
        history.replaceState(null, '', 'rap.html?id=' + id);
        list.querySelectorAll('.cinema-card').forEach(c => c.classList.toggle('active', c.dataset.id === id));
        const c = findCinema(id);
        document.getElementById('cinemaDetail').classList.remove('d-none');
        document.getElementById('cinemaInfo').innerHTML = `
            <h2 class="cinema-detail-name">${c.name}</h2>
            <p class="mb-1"><i class="fa fa-map-marker-alt me-2 text-warning"></i>${c.address}</p>
            <p class="mb-0"><i class="fa fa-couch me-2 text-warning"></i>${c.rooms} phòng chiếu · ${c.seats} ghế · ${c.formats.join(', ')}</p>`;
        renderDateBar(document.getElementById('rapDateBar'), selectedDate, d => { selectedDate = d; renderSchedule(); });
        renderSchedule();
        if (scroll) document.getElementById('cinemaDetail').scrollIntoView({ behavior: 'smooth' });
    }

    function renderSchedule() {
        const rows = MOVIES.map(m => ({ m, s: getShowtimes(selectedCinema, m.id, selectedDate) }))
            .filter(x => x.s.length)
            .map(x => movieScheduleRow(x.m, selectedCinema, selectedDate, x.s)).join('');
        document.getElementById('rapSchedule').innerHTML = rows || EMPTY_SCHEDULE;
    }

    renderList();
    if (selectedCinema && findCinema(selectedCinema)) selectCinema(selectedCinema, false);
}

/* =========================================================
   2. TRANG LỊCH CHIẾU  (lich-chieu.html)
   ========================================================= */
function initSchedulePage() {
    const out = document.getElementById('lcSchedule');
    if (!out) return;

    const selCinema = document.getElementById('lcCinema');
    const selMovie = document.getElementById('lcMovie');
    let date = toISODate(new Date());

    selCinema.innerHTML = CITIES.map(city => `
        <optgroup label="${city.name}">
            ${CINEMAS.filter(c => c.city === city.id).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </optgroup>`).join('');
    selMovie.innerHTML = '<option value="all">Tất cả phim</option>' +
        MOVIES.map(m => `<option value="${m.id}">${m.title}</option>`).join('');

    // Nhận tham số từ trang khác (vd: movie.html → ĐẶT VÉ)
    const pRap = getParam('rap'), pMovie = getParam('movie');
    if (pRap && findCinema(pRap)) selCinema.value = pRap;
    if (pMovie && findMovie(pMovie)) selMovie.value = pMovie;

    renderDateBar(document.getElementById('lcDateBar'), date, d => { date = d; render(); });
    selCinema.addEventListener('change', render);
    selMovie.addEventListener('change', render);

    function render() {
        const cinema = findCinema(selCinema.value);
        const movies = selMovie.value === 'all' ? MOVIES : MOVIES.filter(m => m.id === selMovie.value);
        document.getElementById('lcHeading').innerHTML =
            `<i class="fa fa-map-marker-alt me-2 text-warning"></i>${cinema.name} — ${formatDateVN(date)}`;
        const rows = movies.map(m => ({ m, s: getShowtimes(cinema.id, m.id, date) }))
            .filter(x => x.s.length)
            .map(x => movieScheduleRow(x.m, cinema.id, date, x.s)).join('');
        out.innerHTML = rows || EMPTY_SCHEDULE;
    }
    render();
}

/* =========================================================
   3. TRANG KHUYẾN MÃI  (khuyen-mai.html)
   ========================================================= */
function initPromoPage() {
    const grid = document.getElementById('promoGrid');
    if (!grid) return;

    const tabs = document.getElementById('promoTabs');
    const cats = [
        { id: 'all', name: 'Tất cả' },
        { id: 've', name: 'Ưu đãi giá vé' },
        { id: 'member', name: 'Thành viên' },
        { id: 'food', name: 'Bắp nước' }
    ];
    tabs.innerHTML = cats.map(c => `<button type="button" class="filter-chip ${c.id === 'all' ? 'active' : ''}" data-cat="${c.id}">${c.name}</button>`).join('');
    tabs.querySelectorAll('.filter-chip').forEach(b => b.addEventListener('click', () => {
        tabs.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        render(b.dataset.cat);
    }));

    function render(cat) {
        grid.innerHTML = PROMOTIONS.filter(p => cat === 'all' || p.cat === cat).map(p => `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="promo-item" data-id="${p.id}" tabindex="0">
                    <div class="promo-item-media">
                        ${p.img ? `<img src="${p.img}" alt="${p.title}">`
                                : `<div class="promo-item-placeholder"><i class="fa ${p.icon}"></i></div>`}
                    </div>
                    <div class="promo-item-body">
                        <h5>${p.title}</h5>
                        <p>${p.short}</p>
                        <span class="promo-item-link">Xem chi tiết <i class="fa fa-arrow-right ms-1"></i></span>
                    </div>
                </div>
            </div>`).join('');
        grid.querySelectorAll('.promo-item').forEach(el => {
            el.addEventListener('click', () => openPromo(el.dataset.id));
            el.addEventListener('keydown', e => { if (e.key === 'Enter') openPromo(el.dataset.id); });
        });
    }

    function openPromo(id) {
        const p = PROMOTIONS.find(x => x.id === id);
        document.getElementById('promoModalTitle').innerText = p.title;
        document.getElementById('promoModalBody').innerHTML = `
            ${p.img ? `<img src="${p.img}" class="img-fluid rounded mb-3 w-100" alt="${p.title}">` : ''}
            <p>${p.short}</p>
            <h6 class="text-warning fw-bold mt-3">ĐIỀU KIỆN ÁP DỤNG</h6>
            <ul class="mb-0">${p.details.map(d => `<li>${d}</li>`).join('')}</ul>`;
        new bootstrap.Modal(document.getElementById('promoModal')).show();
    }

    render('all');
}

/* =========================================================
   4. TRANG TỔ CHỨC SỰ KIỆN  (su-kien.html)
   ========================================================= */
function initEventPage() {
    const form = document.getElementById('eventForm');
    if (!form) return;

    document.getElementById('serviceGrid').innerHTML = EVENT_SERVICES.map(s => `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="service-card">
                <div class="service-icon"><i class="fa ${s.icon}"></i></div>
                <h5>${s.name}</h5>
                <p>${s.desc}</p>
                <button type="button" class="btn btn-outline-yellow btn-sm px-3 py-2" data-service="${s.id}">NHẬN BÁO GIÁ</button>
            </div>
        </div>`).join('');

    const evType = document.getElementById('evType');
    const evCinema = document.getElementById('evCinema');
    evType.innerHTML = '<option value="" disabled selected hidden>Chọn loại sự kiện</option>' +
        EVENT_SERVICES.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
    evCinema.innerHTML = '<option value="" disabled selected hidden>Chọn rạp</option>' +
        CINEMAS.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    // Nút "Nhận báo giá" → điền sẵn loại sự kiện và cuộn tới form
    document.querySelectorAll('[data-service]').forEach(btn => btn.addEventListener('click', () => {
        evType.value = btn.dataset.service;
        form.scrollIntoView({ behavior: 'smooth' });
        document.getElementById('evName').focus({ preventScroll: true });
    }));

    const evDate = document.getElementById('evDate');
    const minDate = new Date(); minDate.setDate(minDate.getDate() + 3);   // đặt trước ít nhất 3 ngày
    evDate.min = toISODate(minDate);

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const v = id => document.getElementById(id).value.trim();
        const errors = [];
        if (v('evName').length < 2) errors.push('Vui lòng nhập họ tên.');
        if (!/^0\d{9}$/.test(v('evPhone'))) errors.push('Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('evEmail'))) errors.push('Email không hợp lệ.');
        if (!v('evType')) errors.push('Vui lòng chọn loại sự kiện.');
        if (!v('evCinema')) errors.push('Vui lòng chọn rạp.');
        if (!v('evDate') || v('evDate') < evDate.min) errors.push('Ngày tổ chức phải cách hôm nay ít nhất 3 ngày.');
        const guests = parseInt(v('evGuests'), 10);
        if (!(guests >= 10 && guests <= 500)) errors.push('Số khách từ 10 đến 500 người.');

        const box = document.getElementById('evErrors');
        if (errors.length) {
            box.innerHTML = errors.map(x => `<div><i class="fa fa-circle-exclamation me-1"></i>${x}</div>`).join('');
            box.classList.remove('d-none');
            return;
        }
        box.classList.add('d-none');

        const code = randomCode('SK');
        const requests = loadLocal('eventRequests', []);
        requests.push({ code, name: v('evName'), phone: v('evPhone'), email: v('evEmail'), type: v('evType'),
            cinema: v('evCinema'), date: v('evDate'), guests, note: v('evNote'), createdAt: new Date().toISOString() });
        saveLocal('eventRequests', requests);

        document.getElementById('evSuccessBody').innerHTML = `
            <p>Cảm ơn <strong>${v('evName')}</strong>! Yêu cầu của bạn đã được ghi nhận.</p>
            <p class="mb-1">Mã yêu cầu: <strong class="text-warning">${code}</strong></p>
            <p class="mb-1">Sự kiện: ${EVENT_SERVICES.find(s => s.id === v('evType')).name}</p>
            <p class="mb-1">Rạp: ${findCinema(v('evCinema')).name} · Ngày ${formatDateVN(v('evDate'))} · ${guests} khách</p>
            <p class="small text-secondary mt-3 mb-0">Bộ phận sự kiện sẽ liên hệ qua số ${v('evPhone')} trong vòng 24 giờ làm việc.</p>`;
        new bootstrap.Modal(document.getElementById('evSuccessModal')).show();
        form.reset();
    });
}

/* =========================================================
   5. TRANG GIỚI THIỆU  (gioi-thieu.html)
   ========================================================= */
function initAboutPage() {
    const stats = document.getElementById('aboutStats');
    if (!stats) return;

    const totalRooms = CINEMAS.reduce((s, c) => s + c.rooms, 0);
    const totalSeats = CINEMAS.reduce((s, c) => s + c.seats, 0);
    const items = [
        { n: CINEMAS.length, label: 'Cụm rạp' },
        { n: CITIES.length, label: 'Tỉnh / Thành phố' },
        { n: totalRooms, label: 'Phòng chiếu' },
        { n: totalSeats.toLocaleString('vi-VN'), label: 'Ghế ngồi' }
    ];
    stats.innerHTML = items.map(i => `
        <div class="col-6 col-md-3">
            <div class="stat-box"><div class="stat-number">${i.n}</div><div class="stat-label">${i.label}</div></div>
        </div>`).join('');

    document.getElementById('aboutCinemaList').innerHTML = CINEMAS.map(c => `
        <div class="col-12 col-md-6 col-lg-4">
            <a href="rap.html?id=${c.id}" class="about-cinema">
                <i class="fa fa-location-dot"></i>
                <span><strong>${c.name}</strong><br><small>${c.address}</small></span>
            </a>
        </div>`).join('');

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('ctName').value.trim();
        const email = document.getElementById('ctEmail').value.trim();
        const msg = document.getElementById('ctMessage').value.trim();
        if (name.length < 2) return alert('Vui lòng nhập họ tên.');
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Email không hợp lệ.');
        if (msg.length < 10) return alert('Nội dung tối thiểu 10 ký tự.');
        const list = loadLocal('contactMessages', []);
        list.push({ name, email, msg, createdAt: new Date().toISOString() });
        saveLocal('contactMessages', list);
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi qua email sớm nhất.');
        form.reset();
    });
}

/* =========================================================
   COMBO BẮP NƯỚC – dùng chung cho bap-nuoc.html và booking.html
   ========================================================= */
function renderComboGrid(container, cart, onChange) {
    container.innerHTML = COMBOS.map(c => `
        <div class="col-12 col-sm-6 col-xl-${container.dataset.cols || 3}">
            <div class="combo-card">
                ${c.tag ? `<span class="combo-tag">${c.tag}</span>` : ''}
                <div class="combo-icon"><i class="fa ${c.icon}"></i></div>
                <h6 class="combo-name">${c.name}</h6>
                <p class="combo-desc">${c.desc}</p>
                <div class="combo-price">${formatVND(c.price)}</div>
                <div class="qty-control" data-id="${c.id}">
                    <button type="button" class="qty-btn" data-op="-" aria-label="Giảm">−</button>
                    <span class="qty-value">${cart[c.id] || 0}</span>
                    <button type="button" class="qty-btn" data-op="+" aria-label="Tăng">+</button>
                </div>
            </div>
        </div>`).join('');

    container.querySelectorAll('.qty-control').forEach(ctrl => {
        ctrl.addEventListener('click', e => {
            const btn = e.target.closest('.qty-btn');
            if (!btn) return;
            const id = ctrl.dataset.id;
            let q = cart[id] || 0;
            q = btn.dataset.op === '+' ? Math.min(q + 1, 10) : Math.max(q - 1, 0);
            if (q) cart[id] = q; else delete cart[id];
            ctrl.querySelector('.qty-value').innerText = q;
            onChange(cart);
        });
    });
}

function comboTotal(cart) {
    return Object.entries(cart).reduce((s, [id, q]) => s + COMBOS.find(c => c.id === id).price * q, 0);
}

function comboLines(cart) {
    return Object.entries(cart).map(([id, q]) => {
        const c = COMBOS.find(x => x.id === id);
        return { name: c.name, qty: q, amount: c.price * q };
    });
}

/* =========================================================
   6. TRANG ĐẶT BẮP NƯỚC  (bap-nuoc.html)
   ========================================================= */
function initPopcornPage() {
    const grid = document.getElementById('comboGrid');
    if (!grid || document.getElementById('seatMap')) return;

    const selCinema = document.getElementById('bnCinema');
    selCinema.innerHTML = '<option value="" disabled selected hidden>Chọn rạp nhận bắp nước</option>' +
        CINEMAS.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    const cart = loadLocal('popcornCart', {});
    renderComboGrid(grid, cart, updateCart);
    updateCart(cart);

    function updateCart(c) {
        saveLocal('popcornCart', c);
        const lines = comboLines(c);
        document.getElementById('cartList').innerHTML = lines.length
            ? lines.map(l => `<li><span>${l.name} × ${l.qty}</span><span>${formatVND(l.amount)}</span></li>`).join('')
            : '<li class="text-secondary justify-content-center">Chưa chọn món nào</li>';
        document.getElementById('cartTotal').innerText = formatVND(comboTotal(c));
        const count = lines.reduce((s, l) => s + l.qty, 0);
        document.getElementById('cartCount').innerText = count;
    }

    document.getElementById('bnCheckout').addEventListener('click', () => {
        if (!selCinema.value) return alert('Vui lòng chọn rạp nhận bắp nước!');
        if (!Object.keys(cart).length) return alert('Giỏ hàng đang trống!');
        const lines = comboLines(cart);
        document.getElementById('bnModalBody').innerHTML = `
            <p class="mb-2"><strong>Rạp nhận:</strong> ${findCinema(selCinema.value).name}</p>
            <ul class="summary-list">${lines.map(l => `<li><span>${l.name} × ${l.qty}</span><span>${formatVND(l.amount)}</span></li>`).join('')}</ul>
            <div class="summary-total"><span>Tổng cộng</span><span>${formatVND(comboTotal(cart))}</span></div>
            ${paymentMethodsHTML('bnPay')}`;
        new bootstrap.Modal(document.getElementById('bnModal')).show();
    });

    document.getElementById('bnConfirm').addEventListener('click', () => {
        const code = randomCode('BN');
        alert(`Đặt bắp nước thành công!\nMã đơn: ${code}\nVui lòng đưa mã này tại quầy ${findCinema(selCinema.value).name} để nhận.`);
        Object.keys(cart).forEach(k => delete cart[k]);
        saveLocal('popcornCart', {});
        window.location.href = 'index.html';
    });
}

function paymentMethodsHTML(name) {
    const methods = [
        { id: 'momo', label: 'Ví MoMo', icon: 'fa-wallet' },
        { id: 'zalopay', label: 'ZaloPay', icon: 'fa-mobile-screen' },
        { id: 'card', label: 'Thẻ ATM / Visa', icon: 'fa-credit-card' },
        { id: 'counter', label: 'Thanh toán tại quầy', icon: 'fa-store' }
    ];
    return `
        <h6 class="text-warning fw-bold mt-3">PHƯƠNG THỨC THANH TOÁN</h6>
        <div class="pay-methods">
            ${methods.map((m, i) => `
                <label class="pay-method">
                    <input type="radio" name="${name}" value="${m.id}" ${i === 0 ? 'checked' : ''}>
                    <span><i class="fa ${m.icon} me-2"></i>${m.label}</span>
                </label>`).join('')}
        </div>
        <p class="small text-secondary mt-2 mb-0">* Đây là bản demo đồ án, không thực hiện giao dịch thật.</p>`;
}

/* =========================================================
   7. TRANG ĐẶT VÉ  (booking.html) – thông tin suất + combo
   ========================================================= */
let bookingCart = {};

function initBookingPage() {
    const info = document.getElementById('bookingInfo');
    if (!info) return;

    const movie = findMovie(getParam('movie'));
    const cinema = findCinema(getParam('rap'));
    const date = getParam('date');
    const time = getParam('time');
    const format = getParam('format') || '2D';

    if (movie && cinema && date && time) {
        info.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="booking-info-poster">
            <div>
                <div class="d-flex align-items-center gap-2 mb-1">
                    <span class="tag-age ${ageClass(movie.age)} rounded">${movie.age}</span>
                    <h4 class="mb-0 fw-bold">${movie.title}</h4>
                </div>
                <p class="mb-1"><i class="fa fa-map-marker-alt me-2 text-warning"></i>${cinema.name}</p>
                <p class="mb-0"><i class="fa fa-clock me-2 text-warning"></i>${time} · ${formatDateVN(date)} · ${format}</p>
            </div>
            <a href="lich-chieu.html?rap=${cinema.id}&movie=${movie.id}" class="btn btn-outline-white ms-md-auto">ĐỔI SUẤT</a>`;
    } else {
        info.innerHTML = `
            <div class="w-100 text-center">
                <p class="mb-3">Bạn chưa chọn suất chiếu. Hãy chọn phim, rạp và giờ chiếu trước khi chọn ghế.</p>
                <a href="lich-chieu.html" class="btn btn-yellow">XEM LỊCH CHIẾU</a>
            </div>`;
    }

    const grid = document.getElementById('bookingComboGrid');
    if (grid) renderComboGrid(grid, bookingCart, () => updateSelectedCountAndPrice());
}

// Thông tin suất chiếu hiện tại (dùng trong modal thanh toán)
function currentShowInfo() {
    const movie = findMovie(getParam('movie'));
    const cinema = findCinema(getParam('rap'));
    return {
        movie: movie ? movie.title : null,
        cinema: cinema ? cinema.name : null,
        date: getParam('date'),
        time: getParam('time'),
        format: getParam('format') || '2D'
    };
}

/* ---------- Nút "ĐẶT NGAY" ở thanh đặt vé nhanh (index.html) ---------- */
function handleBooking() {
    const rap = document.getElementById('selectRap');
    const phim = document.getElementById('selectPhim');
    const ngay = document.getElementById('selectNgay');
    const suat = document.getElementById('selectSuat');
    if (!rap.value || !phim.value || !ngay.value || !suat.value) {
        return alert('Vui lòng chọn đủ Rạp, Phim, Ngày và Suất chiếu!');
    }
    window.location.href = bookingUrl(rap.value, phim.value, ngay.value, suat.value, '2D');
}

/* ---------- Ô tìm kiếm trên header ---------- */
function normalizeVN(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').trim();
}

function doSiteSearch(e) {
    e.preventDefault();
    const q = normalizeVN(document.getElementById('siteSearch').value);
    if (!q) return false;
    const movie = MOVIES.find(m => normalizeVN(m.title).includes(q));
    if (movie) { window.location.href = 'movie.html?id=' + movie.id; return false; }
    const cinema = CINEMAS.find(c => normalizeVN(c.name + ' ' + c.address).includes(q));
    if (cinema) { window.location.href = 'rap.html?id=' + cinema.id; return false; }
    alert('Không tìm thấy phim hoặc rạp phù hợp với "' + document.getElementById('siteSearch').value + '".');
    return false;
}
