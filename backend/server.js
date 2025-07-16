const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const webHooksRoutes = require('./routes/webHooksRoutes');
const contactRoutes = require('./routes/ContactRoutes');
const adminRoutes = require('./routes/adminRoutes');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const app = express();


connectDB();


app.use(express.json());

app.use(cookieParser());


app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

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
); app.use(bodyParser.json());


app.use('/', orderRoutes);
app.use('/api', webHooksRoutes);
app.use('/api', contactRoutes);
app.use('/api', adminRoutes)


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "../client/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "../client", "dist", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running successfully");
    });
}


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
