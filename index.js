const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.get('/', (req, res) => {
    res.send('backend!');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ error: 'All fields are required' });
    }
    // Here you would typically handle the registration logic, e.g., saving to a database
    res.status(201).send({ message: 'User registered successfully', user: { name, email } });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
