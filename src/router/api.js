const express = require('express');
const routerAPI = express.Router();
const { change_role, get_role, create_user, get_user, edit_user, delete_user, handlogin, get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach } = require('../controller/kehoach_controller');
const { create_yeucau } = require('../controller/guiyeucau_controller');
const { get_thietbi, get_phong,get_danhmuc } = require('../controller/thietbi_controller');

// Import upload middleware
const upload = require('../middleware/upload');

// Xử lý đăng nhập
routerAPI.post('/login', handlogin);

// Quản lý người dùng
routerAPI.get('/get-all-users', get_user);
routerAPI.post('/create-new-user', create_user);
routerAPI.put('/edit-user', edit_user);
routerAPI.delete('/delete-user', delete_user);

// Lấy role users
routerAPI.get('/get-role-users', get_role);
routerAPI.put('/change-role-user', change_role);

// Gửi yêu cầu mua sắm hoặc sửa chữa
routerAPI.post('/create-yeucau', upload.single('file'), create_yeucau);

// Lấy danh sách thiết bị
routerAPI.get('/get_thietbi', get_thietbi);
routerAPI.get('/get_phong', get_phong);
routerAPI.get('/get_danhmuc', get_danhmuc);


// Account
routerAPI.get('/account', get_account);

// Kế hoạch
routerAPI.get('/getdskehoach', get_dskehoach);
routerAPI.get('/getkehoach', get_chitietkehoach);

module.exports = routerAPI;