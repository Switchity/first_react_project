const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Existing route
app.get('/api/message', (req, res) => {
    console.log("Node /api/message hit ✅");

    res.json({
        text: "Hello! The Node.js server is successfully connected."
    });
});

// ✅ NEW route (used by Django)
app.get('/api/test', (req, res) => {
    console.log("Node /api/test hit ✅");

    res.json({
        status: "Success",
        source: "Node.js",
        message: "Node backend working"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} 🚀`);
});