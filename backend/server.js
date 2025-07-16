const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const webHooksRoutes = require('./routes/webHooksRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Connect MongoDB
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS setup for development/local testing
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "https://donarex-client.onrender.com"];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);

// API Routes
app.use('/', orderRoutes);
app.use('/api', webHooksRoutes);
app.use('/api', contactRoutes);
app.use('/api', adminRoutes);

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, '../client/dist');
    app.use(express.static(buildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'));
    });
} else {
    app.get("/", (req, res) => {
        res.send("🚀 API is running successfully.");
    });
}

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
