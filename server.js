const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const routerAPI = require('./src/router/api');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const PORT = 5005;

// Middleware để serve static files từ thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sử dụng router API
app.use('/v1/api', routerAPI);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});