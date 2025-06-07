const express = require('express');
const routerAPI = express.Router();
const { change_role,get_role,create_user,get_user,edit_user,delete_user,handlogin,get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach } = require('../controller/kehoach_controller');

//const auth=require('../midderwaler/auth')
//const delay=require('../midderwaler/delay')
//routerAPI.all("*",auth)

// Xử lý đăng nhập
routerAPI.post('/login',handlogin)

//Quản lý người dùng
routerAPI.get('/get-all-users', get_user); // Gọi hàm create_user khi có yêu cầu đến /show
routerAPI.post('/create-new-user', create_user);
routerAPI.put('/edit-user', edit_user);
routerAPI.delete('/delete-user', delete_user);

//Lấy role users
routerAPI.get('/get-role-users', get_role); 
routerAPI.put('/change-role-user',change_role); 

routerAPI.get('/account',get_account)


//kế hoạch

routerAPI.get('/getdskehoach',get_dskehoach)
routerAPI.get('/getkehoach',get_chitietkehoach)

module.exports = routerAPI;
