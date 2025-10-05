import express from 'express';

const router = express.Router();

let users = [
  { email: 'demo@nasa.com', password: 'demo123', name: 'Demo User', state: 'Gujarat', savedStates: [] }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(user);
});

router.post('/signup', (req, res) => {
  const { name, email, password, state } = req.body;
  if (users.find(u => u.email === email))
    return res.status(400).json({ error: 'Email already exists' });

  const newUser = { name, email, password, state, savedStates: [] };
  users.push(newUser);
  res.json(newUser);
});

export default router;