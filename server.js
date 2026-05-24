const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── JSON Database helpers ──
function readDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = {
      poll: { votes: [62, 28, 10] },
      forum: [
        { id: 1, user: '@ChallengerFan99', text: "Virat's batting today was just surreal. That cover drive — pure class! 🔥", time: Date.now() - 120000 },
        { id: 2, user: '@RCBDieHard',      text: "Siraj is bowling on fire this season. Proper match-winner! 💪",             time: Date.now() - 300000 },
        { id: 3, user: '@BengaluruBold',   text: "Chinnaswamy is PACKED. Ee Sala Cup Namde!! 🏆🔴",                           time: Date.now() - 660000 }
      ],
      nextId: 4
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ── HEALTH ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RCB Backend is running! 🔴', time: new Date().toISOString() });
});

// ── POLL ──
app.get('/api/poll', (req, res) => {
  const db = readDB();
  const total = db.poll.votes.reduce((a, b) => a + b, 0);
  const percentages = db.poll.votes.map(v => Math.round((v / total) * 100));
  res.json({ votes: db.poll.votes, percentages, total });
});

app.post('/api/poll', (req, res) => {
  const { option } = req.body;
  if (option === undefined || option < 0 || option > 2)
    return res.status(400).json({ error: 'Invalid option. Must be 0, 1, or 2.' });
  const db = readDB();
  db.poll.votes[option] += 1;
  writeDB(db);
  const total = db.poll.votes.reduce((a, b) => a + b, 0);
  const percentages = db.poll.votes.map(v => Math.round((v / total) * 100));
  res.json({ success: true, votes: db.poll.votes, percentages, total });
});

// ── FORUM ──
app.get('/api/forum', (req, res) => {
  const db = readDB();
  res.json([...db.forum].reverse().slice(0, 20));
});

app.post('/api/forum', (req, res) => {
  const { user, text } = req.body;
  if (!text || text.trim().length === 0)
    return res.status(400).json({ error: 'Post text is required.' });
  if (text.trim().length > 200)
    return res.status(400).json({ error: 'Post too long (max 200 chars).' });
  const db = readDB();
  const post = {
    id: db.nextId++,
    user: (user || 'Fan').substring(0, 30),
    text: text.trim(),
    time: Date.now()
  };
  db.forum.push(post);
  if (db.forum.length > 100) db.forum = db.forum.slice(-100);
  writeDB(db);
  res.status(201).json({ success: true, post });
});

app.delete('/api/forum/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const db = readDB();
  const before = db.forum.length;
  db.forum = db.forum.filter(p => p.id !== id);
  if (db.forum.length === before)
    return res.status(404).json({ error: 'Post not found.' });
  writeDB(db);
  res.json({ success: true });
});

// ── START ──
app.listen(PORT, () => {
  console.log(`\n🔴 RCB Backend running → http://localhost:${PORT}`);
  console.log(`📡 API: /api/health | /api/poll | /api/forum\n`);
});
