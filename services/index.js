const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // This allows your React app (on port 5173 or 3000) to talk to this server
app.use(express.json()); // This allows the server to read JSON data from requests

// A simple test route
app.get('/api/message', (req, res) => {
    res.json({ text: "Hello! The Node.js server is successfully connected." });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
