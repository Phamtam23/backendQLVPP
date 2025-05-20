const express = require('express');
const routerAPI = express.Router();
const { create_user,get_user,handlogin,get_account } = require('../controller/user_controller');
const { get_dskehoach, get_chitietkehoach } = require('../controller/kehoach_controller');

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

module.exports = routerAPI;
