const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');
const webHooksRoutes = require('./routes/webHooksRoutes');
const contactRoutes = require('./routes/ContactRoutes');

const path = require('path');
const dotenv = require('dotenv');

dotenv.config();
const connectDB = require('./config/db');

const app = express();


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());


app.use('/', orderRoutes);
app.use('/api', webHooksRoutes);
app.use('/api', contactRoutes);


const __dirname1 = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, "../frontend/dist")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "../frontend", "dist", "index.html"));
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
