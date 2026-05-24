# 🔴 Royal Challengers Bangalore — Fan Website

A full-stack fan website for **Royal Challengers Bangalore (RCB)** built with HTML, CSS, JavaScript (frontend) and Node.js + Express (backend).

![RCB](https://img.shields.io/badge/Team-RCB-red) ![Node](https://img.shields.io/badge/Backend-Node.js-green) ![License](https://img.shields.io/badge/License-ISC-blue)

---

## 🌟 Features

- 🏠 **Hero Section** — Full-screen RCB themed landing with live season stats
- 📅 **Match Schedule** — Upcoming & past matches with live/won/lost badges
- 👥 **Player Profiles** — Squad cards with stats (runs, wickets, averages)
- 📊 **Team Statistics** — Season stats with animated bar charts
- 📰 **News Section** — Latest RCB news and updates
- 🗳️ **Fan Poll** — Vote and see real-time results (saved to server)
- 💬 **Fan Forum** — Post messages, synced across all users via backend
- 📡 **Live Ticker** — Scrolling news/stats banner

---

## 🗂️ Project Structure

```
rcb-fan-website/
├── server.js           ← Node.js + Express backend
├── package.json        ← Dependencies
├── .gitignore
├── README.md
└── public/
    └── index.html      ← Full frontend (HTML + CSS + JS)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or above)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/rcb-fan-website.git

# 2. Go into the project folder
cd rcb-fan-website

# 3. Install dependencies
npm install

# 4. Start the server
npm start
```

### Open in Browser
```
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/poll` | Get poll vote counts |
| POST | `/api/poll` | Cast a vote `{ "option": 0/1/2 }` |
| GET | `/api/forum` | Get latest forum posts |
| POST | `/api/forum` | Post a message `{ "user": "name", "text": "msg" }` |
| DELETE | `/api/forum/:id` | Delete a post by ID |

---

## 💾 How Data is Stored

Data is saved in `db.json` (auto-created on first run, excluded from git):

```json
{
  "poll": { "votes": [65, 30, 12] },
  "forum": [
    { "id": 1, "user": "@Fan", "text": "Go RCB!", "time": 1716000000000 }
  ],
  "nextId": 5
}
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | JSON file (via fs module) |
| Fonts | Google Fonts (Bebas Neue, Barlow) |

---

## 📸 Sections Preview

- **Navbar** — Sticky with smooth scroll links
- **Hero** — Dark red/gold theme, RCB branding
- **Schedule** — 5 match cards with status badges
- **Squad** — 6 player cards (Kohli, Faf, Siraj, Maxwell, DK, Hasaranga)
- **Stats** — Big number cards + animated bar charts
- **News** — Featured story + side news cards
- **Fan Zone** — Interactive poll + social links + live forum

---

## 🙌 Credits

Built as part of **ShadowFox Internship** — Web Development Project.

> *Ee Sala Cup Namde! 🏆🔴*
