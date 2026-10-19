# 🎬 Movie Ticket Booking - Cinema Ticket Booking Website

## 📌 Description

**Movie Ticket Booking** is a cinema ticket booking website developed to give moviegoers a convenient way to browse movies, check showtimes, choose seats and order snacks online.

The system allows users to explore now-showing and upcoming movies, select a cinema, view showtimes for the next 7 days, pick seats on an interactive seat map, add popcorn & drink combos, and confirm the booking through a payment summary.

The project was built using **HTML5, CSS3, JavaScript (ES6) and Bootstrap 5**, focusing on responsive design, user experience and front-end development best practices. Its layout and visual style are inspired by the Cinestar cinema website.

The website also includes pages for **promotions, event & cinema rental services, and company introduction & contact**, all sharing one consistent header, footer and data source.

## 🌐 Live Demo

**Website**
[https://giapchithanh06.github.io/MovieTicketBooking/](https://giapchithanh06.github.io/MovieTicketBooking/)

**GitHub Repository**
[https://github.com/giapchithanh06/MovieTicketBooking](https://github.com/giapchithanh06/MovieTicketBooking)

## 🚀 Features

### 🎟️ Movie & Showtime Browsing

**Home Page**
- Hero banner slider
- Now-showing and upcoming movie carousels
- Quick booking bar (Cinema → Movie → Date → Showtime)
- Promotion and membership sections

**Movies**
- Now-showing movie list
- Upcoming movie list
- Movie detail page (director, cast, release date, synopsis)
- Age rating tags (P, K, T13, T16, T18)

**Cinema Selection**
- Browse all cinemas in the system
- Filter cinemas by city / province
- View cinema information (address, number of rooms, supported formats)
- View showtimes of the selected cinema

**Showtimes**
- Filter by cinema and movie
- 7-day date selector
- Showtimes with 2D / 3D format
- Past showtimes of the current day are hidden automatically
- Click a showtime to go straight to seat selection

**Search**
- Search movies or cinemas from the header
- Vietnamese accent-insensitive search (e.g. "quoc thanh" finds "Quốc Thanh")

### 💺 Booking & Payment

**Seat Selection**
- Interactive seat map with Standard, VIP and Couple seats
- Sold seats displayed and locked
- Maximum 8 seats per booking
- Booking summary showing movie, cinema, date and showtime
- Change showtime option

**Popcorn & Drinks**
- Add combos while booking tickets
- Separate popcorn ordering page with pickup cinema selection
- Quantity controls and live shopping cart

**Checkout**
- Automatic price calculation (tickets + combos)
- Order summary modal
- Payment method selection (MoMo, ZaloPay, ATM/Visa card, pay at counter)
- Booking code generated after confirmation

### 🎁 Promotions & Services

**Promotions**
- Filter by category: ticket deals, membership, food & drinks
- Promotion detail popup with terms and conditions
- C'Friend and C'VIP membership information

**Event Organization**
- Service list: cinema rental, conferences, birthdays, movie premieres, in-cinema advertising, bulk ticket purchase
- 4-step booking process
- Quote request form with validation (name, phone, email, event type, cinema, date, number of guests)
- Request code generated after submission

**About & Contact**
- System statistics (cinemas, provinces, rooms, seats)
- Core values
- Cinema list linked to each cinema's showtimes
- Contact form with validation

### 👤 Account

- Login page
- Registration page with validation:
  - Phone number must be 10 digits
  - Password must be at least 6 characters
  - Password confirmation must match
  - Terms of use must be accepted

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Bootstrap 5.3
- Font Awesome 6
- LocalStorage

## ✨ Modern Techniques Applied

### 📱 Responsive Web Design
- Bootstrap Grid System
- Flexible layouts with CSS Flexbox and Grid
- Cross-device compatibility
- Adaptive layouts for Mobile, Tablet and Desktop
- No horizontal scrolling on small screens

### 🗂️ Centralized Data Management
All cinemas, movies, combos, promotions and event services are stored in one file (`js/data.js`).
Every page reads from the same source, so adding a new cinema, movie or combo only requires editing one place.

### 🎲 Generated Showtimes & Seat Maps
- Showtimes are generated automatically for each cinema, movie and date
- Sold seats are generated from the selected showtime
- A deterministic hash is used, so the data stays the same when the page is reloaded

### 🔗 URL Parameters Between Pages
Booking information is passed between pages through the URL, for example:

```
booking.html?rap=quoc-thanh&movie=ma-xo&date=2026-10-20&time=19:30&format=2D
```

Benefits:
- Users can reload or share a booking page without losing the selected showtime
- Pages stay independent and easy to maintain

### 💾 Client-side Data Storage

**LocalStorage** is used to store:
- Ticket booking history
- Popcorn shopping cart
- Event quote requests
- Contact messages

All storage access is wrapped in `try/catch`, so the website still works when the browser blocks storage.

## 📂 Project Structure

```
MovieTicketBooking/
│
├── index.html            # Home page + quick booking
├── onplaying.html        # Now-showing movies
├── upcoming.html         # Upcoming movies
├── movie.html            # Movie details
├── rap.html              # Cinema selection
├── lich-chieu.html       # Showtimes
├── booking.html          # Seat selection + combos + checkout
├── bap-nuoc.html         # Popcorn & drinks ordering
├── khuyen-mai.html       # Promotions
├── su-kien.html          # Event organization
├── gioi-thieu.html       # About & contact
├── login.html            # Login
├── register.html         # Registration
│
├── css/
│   ├── layout.css        # Base layout
│   └── style.css         # Theme, components and page styles
│
├── js/
│   ├── data.js           # Shared data + utility functions
│   ├── main.js           # Seat map, pricing, quick booking, registration
│   └── pages.js          # Logic for cinema, showtime, promotion, event, about and popcorn pages
│
└── images/
    ├── onplaying/        # Now-showing movie posters
    ├── upcoming/         # Upcoming movie posters
    ├── Banner Images
    ├── Promotion Images
    └── Membership Images
```

## 🎨 User Interface

The website interface was designed with:
- Modern cinema website style
- Dark theme with yellow & purple accent colors
- Responsive layout
- Hero banner slider
- Interactive movie cards and showtime buttons
- Interactive seat map
- Consistent header and footer across all pages
- Clean and user-friendly navigation

## ⚙️ System Architecture

```
HTML5
   ↓
CSS3 + Bootstrap 5
   ↓
JavaScript (ES6)
   ↓
Shared Data (data.js) + LocalStorage
```

The project separates:
- User Interface
- Styling Components
- Business Logic
- Data & Client-side Storage

Benefits:
- Maintainability
- Scalability
- Code Reusability
- Better Project Organization

## 🔄 Booking Flow

```
Showtimes / Cinema / Quick Booking
        ↓
  Select a showtime
        ↓
   Choose seats
        ↓
 Add popcorn & drinks (optional)
        ↓
 Review order & choose payment method
        ↓
   Booking code
```

## ▶️ How to Run

**1. Clone the Repository**

```bash
git clone https://github.com/giapchithanh06/MovieTicketBooking.git
```

**2. Open the Project**

Recommended Tools:
- Visual Studio Code
- Any Modern Browser

**3. Run the Website**

Open:

```
index.html
```

or

Use **Live Server** for a better development experience.

## 🎯 Purpose

This project was developed for educational purposes to practice:
- Front-end Web Development
- Responsive Web Design
- JavaScript Programming
- Bootstrap Framework
- Online Booking Website Development
- User Interface Design
- LocalStorage Management
- Git & GitHub

## 🚀 Future Improvements

- Database Integration
- RESTful API Development
- Real User Authentication
- Online Payment Gateway Integration
- Real-time Seat Reservation
- Movie Trailer Playback
- Movie Reviews and Ratings
- E-ticket with QR Code
- Booking History Page
- Admin Dashboard for movies, showtimes and cinemas

## 👨‍💻 Authors

**Group 7** – giapchithanh06

Student Project – Web Design Course

## 📄 License

This project is intended for educational and learning purposes only.

It is a simulation inspired by the Cinestar website and is **not** the official Cinestar website. All movie posters, logos and brand names belong to their respective owners. No real transactions are made.
