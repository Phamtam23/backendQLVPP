const express = require('express');
const routerAPI = express.Router();

// Kế hoạch
const { get_dskehoach, get_chitietkehoach, create_kehoach, update_kehoach, delete_kehoach } = require('../controller/kehoach_controller');

// Nghiệm thu
const { get_dsnghiemthu, get_chitietnghiemthu, xacNhanNghiemThu } = require('../controller/Nghiemthu');

// Mời thầu
const { get_dsmoithau, get_chitietmoithau, get_dsgoithau, get_dsnhathaulv, creategoithau, createphiendathau_controller } = require('../controller/moithau.controller');
const { create_phiendauthau_service } = require('../services/moithau_service');

// User
const { change_role, get_role, create_user, get_user, edit_user, delete_user, handlogin, get_account } = require('../controller/user_controller');

// Gửi yêu cầu
const { create_yeucau } = require('../controller/guiyeucau_controller');

// Thiết bị
const { get_thietbi, get_phong, get_danhmuc, create_thietbi, edit_thietbi, delete_thietbi } = require('../controller/thietbi_controller');

//const auth=require('../midderwaler/auth')
//const delay=require('../midderwaler/delay')
//routerAPI.all("*",auth)

// Nhà thầu
const { get_nhathau, get_nhathauById, delete_nhathau, createNhaThau } = require('../controller/nhathau_controller');

// Hợp đồng
const { get_hopdong, get_hopdongById, create_hopdong, delete_hopdong, update_hopdong } = require('../controller/hopdong_controller');

// Lĩnh vực
const { get_linhvuc } = require('../controller/linhvuc_controller');

// Dashboard
const { getDashboardData } = require('../controller/dashboard_controller');

// Chọn nhà thầu
const { getChonTatCaNhaThau, getChiTietNhaThau } = require('../controller/chonnhathau_controller');
const { getTatCaNhaThau } = require('../services/chonnhathau_service');

// Yêu cầu
const { get_dsyeucau, get_chitietyeucau, duyet_yeucau, tu_choi_yeucau, delete_yeucau } = require('../controller/yeucau_controller');

// Thông báo
const { get_dsthongbao, get_chitietthongbao, create_thongbao } = require('../controller/thongbao_controller');

// chon mua sam 
const { getChonMuaSam } = require('../controller/duyetmuasam_controller');

//ngan sach
const { getlistMuaSam, getlistthietbi } = require('../controller/duyetngansach_controller');

// thanh toan hop dong 
const { getChonHopDong, getThongTinHopDongController } = require('../controller/thanhtoanhopdong_controller');

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

// Thiết bị
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
routerAPI.post('/kehoach/creater', create_kehoach);
routerAPI.put('/kehoach/update', update_kehoach);
routerAPI.delete('/kehoach/delete', delete_kehoach);

// Nghiệm thu
routerAPI.get('/dsnghiemthu', get_dsnghiemthu);
routerAPI.post('/xacnhannghiemthu', xacNhanNghiemThu);
routerAPI.get('/detailnghiemthu', get_chitietnghiemthu);

// Mời thầu
routerAPI.get('/dsmoithau', get_dsmoithau);
routerAPI.get('/dsgoithau', get_dsgoithau);
routerAPI.get('/dsnhathaulv', get_dsnhathaulv);
routerAPI.get('/detailmoithau', get_chitietmoithau);
routerAPI.post('/taomoithau', createphiendathau_controller);

//Nha thau
routerAPI.get('/getDsNhaThau', get_nhathau)
routerAPI.get('/getChiTietNhaThau/:id', get_nhathauById)
routerAPI.delete('/deleteNhaThau/:id', delete_nhathau)
routerAPI.post('/createNhathau', createNhaThau);

//Hop dong
routerAPI.get('/getDsHopDong', get_hopdong)
routerAPI.get('/getChiTietHopDong/:id', get_hopdongById)
routerAPI.delete('/deleteHopDong/:id', delete_hopdong)
routerAPI.post('/createHopDong', create_hopdong)
routerAPI.put('/updateHopDong', update_hopdong)
//Linh vuc
routerAPI.get('/getDsLinhVuc', get_linhvuc)

//Yeu cau
routerAPI.get('/getDsYeuCau', get_dsyeucau)
routerAPI.get('/getChiTietYeuCau/:id', get_chitietyeucau)
routerAPI.post('/duyetYeuCau', duyet_yeucau)
routerAPI.post('/tuChoiYeuCau', tu_choi_yeucau)
routerAPI.delete('/deleteYeuCau/:id', delete_yeucau)

// Thông báo
routerAPI.get('/getDsThongBao/:id', get_dsthongbao);
routerAPI.get('/getChiTietThongBao/:id', get_chitietthongbao);
routerAPI.post('/themThongBao', create_thongbao);

// Dashboard
routerAPI.get('/dashboard', getDashboardData);

// Chọn nhà thầu
routerAPI.get('/getChonNhaThau', getTatCaNhaThau);
routerAPI.get('/getXemChiTietNhaThau/:id', getChiTietNhaThau);

// Chon mua sam 
routerAPI.get('/getChonKeHoachMuaSam', getChonMuaSam);

//ngan sach
routerAPI.get('/getlistMuaSam', getlistMuaSam);
routerAPI.get('/getlistthietbi/:maKeHoach', getlistthietbi);

// thanh toans hop dong
routerAPI.get('/getlisthopdong', getChonHopDong);
routerAPI.get('/getThongTinHopDong/:maHopDong', getThongTinHopDongController);
module.exports = routerAPI;