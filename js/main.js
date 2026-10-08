/* =========================================================
   MAIN.JS – Sơ đồ ghế, thanh đặt vé nhanh, đăng ký
   Cần nạp js/data.js trước file này.
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    /* ---------------- SƠ ĐỒ GHẾ (booking.html) ---------------- */
    const seatMap = document.getElementById('seatMap');
    if (seatMap) {
        const rows = 10;
        const cols = 14;
        // Ghế đã bán: sinh cố định theo suất chiếu để F5 không thay đổi
        const showKey = [getParam('rap'), getParam('movie'), getParam('date'), getParam('time')].join('|');
        const isSold = label => seededNumber(showKey + label) % 100 < 18;   // ~18% ghế đã bán

        for (let i = 0; i < rows; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'd-flex justify-content-center gap-2 mb-2';
            const rowChar = String.fromCharCode(65 + i);

            if (i < 9) {
                for (let j = 1; j <= cols; j++) {
                    const seat = document.createElement('div');
                    const type = i < 2 ? 'standard' : 'vip';
                    seat.className = 'seat ' + type;
                    seat.setAttribute('data-price', SEAT_PRICES[type]);
                    seat.innerText = rowChar + j;
                    if (isSold(seat.innerText)) seat.classList.add('sold');
                    seat.addEventListener('click', toggleSeat);
                    rowDiv.appendChild(seat);
                }
            } else {
                for (let k = 0; k < cols / 2; k++) {
                    const seat = document.createElement('div');
                    seat.className = 'seat couple';
                    seat.setAttribute('data-price', SEAT_PRICES.couple);
                    seat.innerText = `${rowChar}${k * 2 + 1} - ${rowChar}${k * 2 + 2}`;
                    if (isSold(seat.innerText)) seat.classList.add('sold');
                    seat.addEventListener('click', toggleSeat);
                    rowDiv.appendChild(seat);
                }
            }
            seatMap.appendChild(rowDiv);
        }
    }

    /* ---------------- ĐẶT VÉ NHANH (index.html) ---------------- */
    const selectRap = document.getElementById('selectRap');
    const selectPhim = document.getElementById('selectPhim');
    const selectNgay = document.getElementById('selectNgay');
    const selectSuat = document.getElementById('selectSuat');

    if (selectRap) {
        CINEMAS.forEach(c => selectRap.innerHTML += `<option value="${c.id}">${c.name}</option>`);
        selectRap.addEventListener('change', updateShowtimes);
    }
    if (selectPhim) {
        MOVIES.forEach(m => selectPhim.innerHTML += `<option value="${m.id}">${m.title}</option>`);
        selectPhim.addEventListener('change', updateShowtimes);
    }
    if (selectNgay) {
        nextDays(7).forEach((d, i) => {
            selectNgay.innerHTML += `<option value="${d.iso}">${i === 0 ? "Hôm nay - " : d.label + " - "}${formatDateVN(d.iso)}</option>`;
        });
        selectNgay.addEventListener('change', updateShowtimes);
    }

    function updateShowtimes() {
        if (!selectSuat) return;
        selectSuat.innerHTML = '<option value="" disabled selected hidden>4. Chọn Suất</option>';
        if (!selectRap.value || !selectPhim.value || !selectNgay.value) return;
        const list = getShowtimes(selectRap.value, selectPhim.value, selectNgay.value);
        if (!list.length) {
            selectSuat.innerHTML += '<option value="" disabled>Không có suất chiếu</option>';
            return;
        }
        list.forEach(s => selectSuat.innerHTML += `<option value="${s.time}">${s.time} (${s.format})</option>`);
    }

    /* ---------------- ĐĂNG KÝ (register.html) ---------------- */
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirmPassword').value;
            const policy = document.getElementById('policy');

            if (!/^\d{10}$/.test(phone)) return alert("Số điện thoại phải là 10 chữ số!");
            if (password.length < 6) return alert("Mật khẩu tối thiểu 6 ký tự!");
            if (password !== confirm) return alert("Mật khẩu xác nhận không khớp!");
            if (!policy.checked) return alert("Bạn cần đồng ý điều khoản!");

            alert('Đăng ký thành công!');
            window.location.href = 'login.html';
        });
    }
});

/* ---------------- CHỌN GHẾ & TÍNH TIỀN ---------------- */
function toggleSeat() {
    if (this.classList.contains('sold')) return;
    if (!this.classList.contains('selected') && document.querySelectorAll('.seat.selected').length >= 8) {
        return alert('Mỗi lần đặt tối đa 8 ghế.');
    }
    this.classList.toggle('selected');
    updateSelectedCountAndPrice();
}

function seatTotal() {
    let total = 0;
    document.querySelectorAll('.seat.selected').forEach(s => total += parseInt(s.getAttribute('data-price')));
    return total;
}

function updateSelectedCountAndPrice() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    const selectedSeatsText = document.getElementById('selected-seats');
    const totalPriceText = document.getElementById('total-price');
    if (!selectedSeatsText || !totalPriceText) return;

    const labels = [...selectedSeats].map(seat => seat.innerText);
    const comboSum = typeof bookingCart !== 'undefined' ? comboTotal(bookingCart) : 0;
    selectedSeatsText.innerText = labels.length ? labels.join(', ') : 'Chưa chọn';

    const seatSumEl = document.getElementById('seat-price');
    const comboSumEl = document.getElementById('combo-price');
    if (seatSumEl) seatSumEl.innerText = formatVND(seatTotal());
    if (comboSumEl) comboSumEl.innerText = formatVND(comboSum);
    totalPriceText.innerText = formatVND(seatTotal() + comboSum);
}

function showPaymentModal() {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert("Vui lòng chọn ghế trước khi thanh toán!");
        return;
    }
    const show = currentShowInfo();
    if (!show.movie) {
        alert("Bạn chưa chọn suất chiếu. Chuyển đến trang Lịch chiếu.");
        window.location.href = 'lich-chieu.html';
        return;
    }

    const seats = [...selectedSeats].map(s => s.innerText).join(', ');
    const lines = comboLines(bookingCart);

    document.getElementById('paymentDetails').innerHTML = `
        <p class="mb-1"><strong>Phim:</strong> ${show.movie}</p>
        <p class="mb-1"><strong>Rạp:</strong> ${show.cinema}</p>
        <p class="mb-1"><strong>Suất:</strong> ${show.time} · ${formatDateVN(show.date)} · ${show.format}</p>
        <p class="mb-2"><strong>Ghế:</strong> ${seats}</p>
        <ul class="summary-list">
            <li><span>Tiền vé (${selectedSeats.length} ghế)</span><span>${formatVND(seatTotal())}</span></li>
            ${lines.map(l => `<li><span>${l.name} × ${l.qty}</span><span>${formatVND(l.amount)}</span></li>`).join('')}
        </ul>
        <div class="summary-total"><span>Tổng cộng</span><span>${formatVND(seatTotal() + comboTotal(bookingCart))}</span></div>
        ${paymentMethodsHTML('ticketPay')}`;

    new bootstrap.Modal(document.getElementById('paymentModal')).show();
}

function finishPayment() {
    const show = currentShowInfo();
    const code = randomCode('CS');
    const seats = [...document.querySelectorAll('.seat.selected')].map(s => s.innerText);
    const history = loadLocal('ticketHistory', []);
    history.push({ code, ...show, seats, combos: comboLines(bookingCart),
        total: seatTotal() + comboTotal(bookingCart), createdAt: new Date().toISOString() });
    saveLocal('ticketHistory', history);

    alert(`Thanh toán thành công!\nMã vé: ${code}\n${show.movie} – ${show.time} ${formatDateVN(show.date)}\nGhế: ${seats.join(', ')}`);
    window.location.href = 'index.html';
}
