const express = require('express');
const routerAPI = express.Router();
const { change_role, get_role, create_user, get_user, edit_user, delete_user, handlogin, get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach } = require('../controller/kehoach_controller');
const { create_yeucau } = require('../controller/guiyeucau_controller');
const { get_thietbi, get_phong, get_danhmuc } = require('../controller/thietbi_controller');
const { get_nhathau, get_nhathauById } = require('../controller/nhathau_controller');
const { get_hopdong, get_hopdongById } = require('../controller/hopdong_controller');
const { get_linhvuc } = require('../controller/linhvuc_controller');
const { getDashboardData } = require('../controller/dashboard_controller');
//const auth=require('../midderwaler/auth')
//const delay=require('../midderwaler/delay')
//routerAPI.all("*",auth)

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

//kế hoạch

routerAPI.get('/getdskehoach',get_dskehoach)
routerAPI.get('/getkehoach',get_chitietkehoach)

//Nha thau
routerAPI.get('/getDsNhaThau', get_nhathau)
routerAPI.get('/getChiTietNhaThau/:id', get_nhathauById)
//Hop dong
routerAPI.get('/getDsHopDong', get_hopdong)
routerAPI.get('/getChiTietHopDong/:id', get_hopdongById)

//Linh vuc
routerAPI.get('/getDsLinhVuc', get_linhvuc)

//Dashboard
routerAPI.get('/dashboard', getDashboardData);
module.exports = routerAPI;
