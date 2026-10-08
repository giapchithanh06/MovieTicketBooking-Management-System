# Movie Ticket Booking

Đồ án Thiết kế Web — Website đặt vé xem phim (Nhóm 7), mô phỏng theo bố cục Cinestar.
Website chỉ phục vụ học tập, không thực hiện giao dịch thật.

## Các trang
| Trang | File |
|---|---|
| Trang chủ (đặt vé nhanh) | `index.html` |
| Phim đang chiếu / sắp chiếu | `onplaying.html`, `upcoming.html` |
| Chi tiết phim | `movie.html?id=...` |
| Chọn rạp + lịch chiếu theo rạp | `rap.html?id=...` |
| Lịch chiếu (lọc rạp, phim, ngày) | `lich-chieu.html` |
| Chọn ghế + bắp nước + thanh toán | `booking.html?rap=&movie=&date=&time=` |
| Đặt bắp nước riêng | `bap-nuoc.html` |
| Khuyến mãi | `khuyen-mai.html` |
| Tổ chức sự kiện (form báo giá) | `su-kien.html` |
| Giới thiệu + liên hệ | `gioi-thieu.html` |
| Đăng nhập / Đăng ký | `login.html`, `register.html` |

## Luồng đặt vé
Lịch chiếu / Chọn rạp / Đặt vé nhanh → bấm giờ chiếu → chọn ghế → chọn bắp nước → thanh toán (demo).

## Cấu trúc code
- `js/data.js` — dữ liệu dùng chung: rạp, phim, combo, khuyến mãi, dịch vụ sự kiện, hàm tiện ích
- `js/main.js` — sơ đồ ghế, tính tiền, đặt vé nhanh, đăng ký
- `js/pages.js` — xử lý các trang mới, tìm kiếm trên header
- `css/style.css` — giao diện chung

Muốn thêm rạp, phim hoặc combo: chỉ cần sửa `js/data.js`.
Lịch chiếu và ghế đã bán được sinh tự động (cố định theo rạp/phim/ngày).

## Chạy
Mở `index.html` bằng trình duyệt, hoặc dùng Live Server trong VS Code.
