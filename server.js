const express = require('express');
const app = express();
const cors=require('cors')
const routerAPI=require('./src/router/api')
app.use(express.json());  // Giúp xử lý dữ liệu JSON
app.use(express.urlencoded({ extended: true }));
const PORT = 5005;
app.use(express.json());
app.use(cors());
app.use('/v1/api',routerAPI)    
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});