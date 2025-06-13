const express = require('express');
const routerAPI = express.Router();
const { create_user,get_user,handlogin,get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach, get_dsyeucau, create_kehoach, update_kehoach, delete_kehoach } = require('../controller/kehoach_controller');
const { get_dsnghiemthu, get_chitietnghiemthu, xacNhanNghiemThu } = require('../controller/Nghiemthu');
const { get_dsmoithau, get_chitietmoithau, get_dsgoithau, get_dsnhathaulv, creategoithau, createphiendathau_controller } = require('../controller/moithau.controller');
const { create_phiendauthau_service } = require('../services/moithau_service');

//const auth=require('../midderwaler/auth')
//const delay=require('../midderwaler/delay')
//routerAPI.all("*",auth)

routerAPI.get('/show', get_user); // Gọi hàm create_user khi có yêu cầu đến /show
routerAPI.post('/createuser', create_user);
routerAPI.post('/login',handlogin)

routerAPI.get('/account',get_account)


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
