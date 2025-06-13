const express = require('express');
const routerAPI = express.Router();
<<<<<<< HEAD
const { create_user,get_user,handlogin,get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach, get_dsyeucau, create_kehoach, update_kehoach, delete_kehoach } = require('../controller/kehoach_controller');
const { get_dsnghiemthu, get_chitietnghiemthu, xacNhanNghiemThu } = require('../controller/Nghiemthu');
const { get_dsmoithau, get_chitietmoithau, get_dsgoithau, get_dsnhathaulv, creategoithau, createphiendathau_controller } = require('../controller/moithau.controller');
const { create_phiendauthau_service } = require('../services/moithau_service');
=======
const { change_role, get_role, create_user, get_user, edit_user, delete_user, handlogin, get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach } = require('../controller/kehoach_controller');
const { create_yeucau } = require('../controller/guiyeucau_controller');
>>>>>>> b8e49bb690f299b90f1cc1f66272ad9c6388abb1

const { get_thietbi, get_phong, get_danhmuc, create_thietbi, edit_thietbi, delete_thietbi } = require('../controller/thietbi_controller');

const { get_nhathau, get_nhathauById } = require('../controller/nhathau_controller');
const { get_hopdong, get_hopdongById } = require('../controller/hopdong_controller');
const { get_linhvuc } = require('../controller/linhvuc_controller');
const { getDashboardData } = require('../controller/dashboard_controller');

const { getChonTatCaNhaThau, getChiTietNhaThau } = require('../controller/chonnhathau_controller')
//const auth=require('../midderwaler/auth')
//const delay=require('../midderwaler/delay')
//routerAPI.all("*",auth)
const { get_dsyeucau, get_chitietyeucau, duyet_yeucau, tu_choi_yeucau } = require('../controller/yeucau_controller');
const { get_dsthongbao, get_chitietthongbao, create_thongbao } = require('../controller/thongbao_controller');
const { getTatCaNhaThau } = require('../services/chonnhathau_service');
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
routerAPI.post('/create-new-thietbi', upload.single('file'), create_thietbi);
routerAPI.put('/edit-thietbi', upload.single('file'), edit_thietbi);
routerAPI.delete('/delete-thietbi', delete_thietbi);


// Account
routerAPI.get('/account', get_account);

// Kế hoạch
routerAPI.get('/getdskehoach', get_dskehoach);
routerAPI.get('/getkehoach', get_chitietkehoach);

//kế hoạch

routerAPI.get('/getdskehoach',get_dskehoach)
routerAPI.get('/getkehoach',get_chitietkehoach)
routerAPI.post('/kehoach/creater',create_kehoach)
routerAPI.put('/kehoach/update',update_kehoach)
routerAPI.delete('/kehoach/delete',delete_kehoach)
//yêu cầu 
routerAPI.get('/dsyeucau',get_dsyeucau)

//nghiệm thu

routerAPI.get('/dsnghiemthu',get_dsnghiemthu)
routerAPI.post('/xacnhannghiemthu',xacNhanNghiemThu)
routerAPI.get('/detailnghiemthu',get_chitietnghiemthu)

//moithau

routerAPI.get('/dsmoithau',get_dsmoithau)
routerAPI.get('/dsgoithau',get_dsgoithau)
routerAPI.get('/dsnhathaulv',get_dsnhathaulv)
routerAPI.get('/detailmoithau',get_chitietmoithau)
routerAPI.post('/taomoithau',createphiendathau_controller)
module.exports = routerAPI;


//Nha thau
routerAPI.get('/getDsNhaThau', get_nhathau)
routerAPI.get('/getChiTietNhaThau/:id', get_nhathauById)
//Hop dong
routerAPI.get('/getDsHopDong', get_hopdong)
routerAPI.get('/getChiTietHopDong/:id', get_hopdongById)

//Linh vuc
routerAPI.get('/getDsLinhVuc', get_linhvuc)

//Yeu cau
routerAPI.get('/getDsYeuCau', get_dsyeucau)
routerAPI.get('/getChiTietYeuCau/:id', get_chitietyeucau)
routerAPI.post('/duyetYeuCau', duyet_yeucau)
routerAPI.post('/tuChoiYeuCau', tu_choi_yeucau)

//Thong bao
routerAPI.get('/getDsThongBao/:id', get_dsthongbao)
routerAPI.get('/getChiTietThongBao/:id', get_chitietthongbao)
routerAPI.post('/themThongBao', create_thongbao)

//Dashboard
routerAPI.get('/dashboard', getDashboardData);

// chon nha thau 
routerAPI.get('/getChonNhaThau', getTatCaNhaThau)
routerAPI.get('/getXemChiTietNhaThau/:id', getChiTietNhaThau)

module.exports = routerAPI;

