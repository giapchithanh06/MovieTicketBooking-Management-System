/* =========================================================
   DỮ LIỆU DÙNG CHUNG CHO TOÀN WEBSITE (dữ liệu mẫu cho đồ án)
   Sửa ở đây là tất cả các trang tự cập nhật theo.
   ========================================================= */

const CITIES = [
    { id: "hcm", name: "TP. Hồ Chí Minh" },
    { id: "hn", name: "Hà Nội" },
    { id: "hue", name: "TP. Huế" },
    { id: "lamdong", name: "Lâm Đồng" },
    { id: "dongthap", name: "Đồng Tháp" },
    { id: "angiang", name: "An Giang" }
];

// Địa chỉ ở mức quận/thành phố – cập nhật chi tiết theo thực tế nếu cần
const CINEMAS = [
    { id: "quoc-thanh", name: "Cinestar Quốc Thanh", city: "hcm", address: "271 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh", rooms: 7, seats: 980, formats: ["2D", "3D", "Ghế giường nằm"] },
    { id: "sinh-vien", name: "Cinestar Sinh Viên", city: "hcm", address: "Nhà Văn hóa Sinh viên, TP. Thủ Đức, TP. Hồ Chí Minh", rooms: 5, seats: 700, formats: ["2D", "3D"] },
    { id: "satra-q6", name: "Cinestar Satra Quận 6", city: "hcm", address: "Quận 6, TP. Hồ Chí Minh", rooms: 6, seats: 820, formats: ["2D", "3D", "Ghế giường nằm"] },
    { id: "parkcity", name: "Cinestar Parkcity Hà Nội", city: "hn", address: "Khu đô thị ParkCity, Hà Đông, Hà Nội", rooms: 6, seats: 850, formats: ["2D", "3D"] },
    { id: "hue", name: "Cinestar Huế", city: "hue", address: "TP. Huế", rooms: 5, seats: 650, formats: ["2D", "3D"] },
    { id: "da-lat", name: "Cinestar Đà Lạt", city: "lamdong", address: "TP. Đà Lạt, Lâm Đồng", rooms: 4, seats: 520, formats: ["2D"] },
    { id: "duc-trong", name: "Cinestar Lâm Đồng", city: "lamdong", address: "Đức Trọng, Lâm Đồng", rooms: 4, seats: 480, formats: ["2D"] },
    { id: "my-tho", name: "Cinestar Mỹ Tho", city: "dongthap", address: "Mỹ Tho, Đồng Tháp", rooms: 5, seats: 640, formats: ["2D", "3D"] },
    { id: "kien-giang", name: "Cinestar Kiên Giang", city: "angiang", address: "Rạch Giá, An Giang", rooms: 5, seats: 620, formats: ["2D", "3D"] }
];

// Phim đang chiếu – id trùng với movie.html?id=...
const MOVIES = [
    { id: "ma-xo", title: "MA XÓ", age: "T18", poster: "images/onplaying/ma-xo_1.png", genre: "Kinh dị" },
    { id: "lau-chu-hoa", title: "LẦU CHÚ HỎA", age: "T18", poster: "images/onplaying/lauchuhoa.png", genre: "Kinh dị" },
    { id: "bay-xac-song", title: "BẦY XÁC SỐNG", age: "T18", poster: "images/onplaying/poster-colony.png", genre: "Kinh dị, Hành động" },
    { id: "doraemon", title: "PHIM DORAEMON: NOBITA VÀ LÂU ĐÀI DƯỚI ĐÁY BIỂN", age: "P", poster: "images/onplaying/doraemon-2026.png", genre: "Hoạt hình" },
    { id: "ngoi-den-ky-quai", title: "NGÔI ĐỀN KỲ QUÁI", age: "T18", poster: "images/onplaying/peenak.png", genre: "Kinh dị, Hài" },
    { id: "oc-muon-hon", title: "ỐC MƯỢN HỒN", age: "T16", poster: "images/onplaying/oc.png", genre: "Tâm lý, Kinh dị" },
    { id: "he-man", title: "HE-MAN VÀ NHỮNG CHIẾN BINH VŨ TRỤ", age: "T13", poster: "images/onplaying/heman.png", genre: "Hành động, Phiêu lưu" },
    { id: "marsupilami", title: "SIÊU QUẬY MARSUPILAMI", age: "P", poster: "images/onplaying/marsupilami-poster.png", genre: "Hài, Gia đình" },
    { id: "your-name", title: "YOUR NAME: TÊN CẬU LÀ GÌ?", age: "T13", poster: "images/onplaying/your-name-poster.png", genre: "Hoạt hình, Tình cảm" },
    { id: "lop-hoc-am-sat", title: "LỚP HỌC ÁM SÁT: GIỜ CỦA CHÚNG TA", age: "T16", poster: "images/onplaying/lop-hoc-am-sat.png", genre: "Hoạt hình" },
    { id: "kumathong", title: "KUMATHONG ÁC QUỶ DẪN ĐƯỜNG", age: "T18", poster: "images/onplaying/alas.png", genre: "Kinh dị" },
    { id: "digital-circus", title: "THE AMAZING DIGITAL CIRCUS: HỒI KẾT", age: "K", poster: "images/onplaying/hoi-ket.png", genre: "Hoạt hình" }
];

// Giá vé theo loại ghế (đồng bộ với sơ đồ ghế)
const SEAT_PRICES = { standard: 90000, vip: 110000, couple: 250000 };

// Combo bắp nước
const COMBOS = [
    { id: "single", name: "Combo Solo", desc: "1 Bắp ngọt lớn + 1 Nước ngọt lớn", price: 89000, icon: "fa-user", tag: "Bán chạy" },
    { id: "couple", name: "Combo Couple", desc: "1 Bắp ngọt lớn + 2 Nước ngọt lớn", price: 119000, icon: "fa-heart", tag: "Hẹn hò" },
    { id: "party", name: "Combo Party", desc: "2 Bắp ngọt lớn + 4 Nước ngọt lớn", price: 219000, icon: "fa-users", tag: "Nhóm bạn" },
    { id: "family", name: "Combo Gia Đình", desc: "2 Bắp phô mai + 3 Nước ngọt + 1 Snack", price: 249000, icon: "fa-house-user", tag: "Tiết kiệm" },
    { id: "popcorn", name: "Bắp Ngọt Lớn", desc: "Bắp rang bơ vị caramel, ly lớn", price: 59000, icon: "fa-bowl-food", tag: "" },
    { id: "cheese", name: "Bắp Phô Mai Lớn", desc: "Bắp rang vị phô mai, ly lớn", price: 65000, icon: "fa-cheese", tag: "" },
    { id: "drink", name: "Nước Ngọt Lớn", desc: "Coca / Fanta / Sprite – 32oz", price: 39000, icon: "fa-glass-water", tag: "" },
    { id: "snack", name: "Snack / Xúc Xích", desc: "Xúc xích nướng hoặc snack khoai tây", price: 45000, icon: "fa-hotdog", tag: "" }
];

// Khuyến mãi
const PROMOTIONS = [
    { id: "happy-wed", cat: "ve", title: "Thứ 4 Happy Day – 45K/vé", img: "images/THU_4.jpg", short: "Đồng giá 45K/vé 2D dành riêng cho thành viên vào thứ 4 hằng tuần.",
      details: ["Áp dụng cho khách hàng là Thành viên Cinestar.", "Đồng giá 45.000đ/vé 2D; 55.000đ/vé 3D.", "Đồng giá 95.000đ/vé ghế giường nằm (C'MÊ).", "Áp dụng vào thứ 4 hằng tuần."] },
    { id: "c-school", cat: "ve", title: "C'School – HSSV chỉ từ 45K", img: "images/HSSV-2.jpg", short: "Giá vé ưu đãi cho học sinh, sinh viên, U22 và giáo viên cả tuần.",
      details: ["Áp dụng cho học sinh, sinh viên, U22 và giáo viên.", "Xuất trình thẻ HSSV / CCCD khi mua vé tại quầy.", "Giá vé ưu đãi chỉ từ 45.000đ/vé 2D tùy suất chiếu.", "Không áp dụng đồng thời với khuyến mãi khác."] },
    { id: "happy-hour", cat: "ve", title: "Happy Hour – Chỉ từ 45K", img: "images/C_TEN.jpg", short: "Ưu đãi giá vé cho suất chiếu trước 10:00 và sau 22:00.",
      details: ["Giá vé 45.000đ (2D) cho suất chiếu trước 10:00.", "Giá vé 49.000đ (2D) cho suất chiếu sau 22:00.", "Áp dụng tất cả các ngày trong tuần."] },
    { id: "happy-mon", cat: "ve", title: "Thứ 2 Vui Vẻ – 45K/vé", img: "images/MONDAY.jpg", short: "Đồng giá 45K/vé 2D cho mọi khách hàng vào thứ 2.",
      details: ["Áp dụng cho mọi khách hàng, không cần thẻ thành viên.", "Đồng giá 45.000đ/vé 2D; 55.000đ/vé 3D.", "Đồng giá 95.000đ/vé ghế giường nằm (C'MÊ).", "Áp dụng vào thứ 2 hằng tuần."] },
    { id: "c-friend", cat: "member", title: "Thành viên C'Friend", img: "images/Desktop519x282_CMember.jpg", short: "Đăng ký miễn phí, tích điểm mỗi lần xem phim và nhận ưu đãi sinh nhật.",
      details: ["Đăng ký miễn phí tại quầy hoặc trên website.", "Tích điểm cho mỗi giao dịch vé và bắp nước.", "Nhận quà tặng trong tháng sinh nhật.", "Được tham gia các chương trình dành riêng cho thành viên."] },
    { id: "c-vip", cat: "member", title: "Thành viên C'VIP", img: "images/c-vip.jpg", short: "Đặc quyền dành riêng cho khách hàng thân thiết với mức tích điểm cao hơn.",
      details: ["Nâng hạng khi đạt mức chi tiêu theo quy định.", "Tỷ lệ tích điểm cao hơn thành viên thường.", "Ưu tiên tham dự suất chiếu sớm và sự kiện ra mắt phim.", "Quà tặng đặc biệt dịp sinh nhật."] },
    { id: "combo-couple", cat: "food", title: "Combo Couple chỉ 119K", img: "", icon: "fa-heart", short: "1 bắp ngọt lớn + 2 nước ngọt lớn – lựa chọn hoàn hảo cho buổi hẹn hò.",
      details: ["Áp dụng khi đặt kèm vé online hoặc tại quầy.", "Có thể đổi bắp ngọt sang bắp phô mai (+10.000đ).", "Áp dụng tại tất cả các rạp trong hệ thống."] },
    { id: "combo-party", cat: "food", title: "Đi nhóm vui hơn – Combo Party", img: "", icon: "fa-users", short: "Tiết kiệm đến 20% khi mua Combo Party cho nhóm từ 4 người.",
      details: ["Gồm 2 bắp ngọt lớn + 4 nước ngọt lớn.", "Phù hợp nhóm bạn, gia đình từ 4 người.", "Áp dụng tại tất cả các rạp trong hệ thống."] }
];

// Dịch vụ tổ chức sự kiện
const EVENT_SERVICES = [
    { id: "thue-rap", icon: "fa-film", name: "Thuê rạp chiếu phim", desc: "Thuê trọn phòng chiếu cho buổi xem phim riêng của công ty, lớp học, câu lạc bộ." },
    { id: "hoi-nghi", icon: "fa-chalkboard-user", name: "Hội nghị – Hội thảo", desc: "Màn hình lớn, âm thanh chuẩn rạp, sức chứa linh hoạt cho hội nghị, đào tạo, ra mắt sản phẩm." },
    { id: "sinh-nhat", icon: "fa-cake-candles", name: "Sinh nhật – Fan meeting", desc: "Không gian riêng tư, trang trí theo chủ đề, kèm combo bắp nước cho khách mời." },
    { id: "ra-mat-phim", icon: "fa-star", name: "Ra mắt phim – Họp báo", desc: "Thảm đỏ, khu vực chụp ảnh, hỗ trợ kỹ thuật trình chiếu cho đoàn phim và truyền thông." },
    { id: "quang-cao", icon: "fa-bullhorn", name: "Quảng cáo tại rạp", desc: "Quảng cáo trên màn hình trước suất chiếu, standee, sampling sản phẩm tại sảnh." },
    { id: "ve-doan", icon: "fa-ticket", name: "Mua vé số lượng lớn", desc: "Ưu đãi giá vé và voucher cho doanh nghiệp làm quà tặng nhân viên, khách hàng." }
];

/* ================= HÀM TIỆN ÍCH ================= */

function formatVND(n) {
    return Number(n).toLocaleString('vi-VN') + ' đ';
}

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function findCinema(id) { return CINEMAS.find(c => c.id === id); }
function findMovie(id) { return MOVIES.find(m => m.id === id); }

// Chuỗi ngày dạng YYYY-MM-DD theo giờ máy người dùng
function toISODate(d) {
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function formatDateVN(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
}

// 7 ngày tới cho thanh chọn ngày
function nextDays(count = 7) {
    const thu = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    const days = [];
    for (let i = 0; i < count; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        days.push({
            iso: toISODate(d),
            label: i === 0 ? "Hôm nay" : thu[d.getDay()],
            day: String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0')
        });
    }
    return days;
}

// Hàm băm đơn giản để sinh dữ liệu "ngẫu nhiên" nhưng cố định (F5 không đổi)
function seededNumber(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0);
}

const ALL_SLOTS = ["08:30", "09:45", "10:30", "12:00", "13:15", "14:30", "15:45", "17:00", "18:15", "19:30", "20:45", "22:00", "23:15"];

// Sinh lịch chiếu cho 1 phim tại 1 rạp trong 1 ngày
function getShowtimes(cinemaId, movieId, isoDate) {
    const seed = seededNumber(cinemaId + '|' + movieId + '|' + isoDate);
    if (seed % 5 === 0) return [];                         // ~20% phim không chiếu tại rạp/ngày đó
    const cinema = findCinema(cinemaId);
    const count = 3 + (seed % 4);                           // 3–6 suất
    const start = seed % (ALL_SLOTS.length - count);
    const result = [];
    for (let i = 0; i < count; i++) {
        const time = ALL_SLOTS[(start + i * 2) % ALL_SLOTS.length];
        const fmtSeed = seededNumber(time + seed);
        const format = cinema && cinema.formats.includes("3D") && fmtSeed % 4 === 0 ? "3D" : "2D";
        result.push({ time, format });
    }
    result.sort((a, b) => a.time.localeCompare(b.time));
    // Bỏ các suất đã qua nếu là hôm nay
    if (isoDate === toISODate(new Date())) {
        const now = new Date();
        const mins = now.getHours() * 60 + now.getMinutes();
        return result.filter(s => {
            const [h, m] = s.time.split(':').map(Number);
            return h * 60 + m > mins;
        });
    }
    return result;
}

function ageClass(age) {
    return { P: "bg-p", K: "bg-k", T13: "bg-t13", T16: "bg-t16", T18: "bg-t18" }[age] || "bg-chuaphanloai";
}

function bookingUrl(cinemaId, movieId, isoDate, time, format) {
    const q = new URLSearchParams({ rap: cinemaId, movie: movieId, date: isoDate, time, format: format || "2D" });
    return 'booking.html?' + q.toString();
}

// Lưu/đọc localStorage an toàn (trình duyệt chặn thì bỏ qua)
function saveLocal(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* bỏ qua */ }
}
function loadLocal(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}

function randomCode(prefix) {
    return prefix + Date.now().toString().slice(-6) + Math.floor(Math.random() * 90 + 10);
}
