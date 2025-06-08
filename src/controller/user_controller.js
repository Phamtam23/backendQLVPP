const express = require('express');
const { poolPromise, sql } = require('../router/conect');
const { PollingQuery } = require('msnodesqlv8');
const {
    create_user_service,
    edit_user_service,
    delete_user_service,
    login_user_service,
    get_user_service,
    get_role_users_service,
    change_role_service
} = require('../services/user_service');

// Lấy danh sách tất cả user
const get_user = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Thiếu tham số đầu vào (id)',
            users: []
        });
    }

    try {
        const data = await get_user_service(id);

        if (!data || data.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'Không tìm thấy người dùng',
                users: []
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            users: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            users: []
        });
    }
};
const get_role = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Thiếu tham số đầu vào (id)',
            users: []
        });
    }

    try {
        const data = await get_role_users_service(id);

        if (!data || data.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'Không tìm thấy người dùng',
                users: []
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            users: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            users: []
        });
    }
};

// Lấy thông tin tài khoản đã xác thực (từ middleware JWT)
const get_account = async (req, res) => {
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }
    return res.status(200).json(req.user);
};

// Tạo user mới
let create_user = async (req, res) => {
    try {
        const message = await create_user_service(req.body);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error occurred in create_user:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi tạo người dùng',
            error: error.message
        });
    }
};

let edit_user = async (req, res) => {
    try {
        const message = await edit_user_service(req.body);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error in edit_user:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi cập nhật người dùng',
            error: error.message
        });
    }
};
const change_role = async (req, res) => {
    try {
        const { userId, maVaiTro } = req.body;
        const message = await change_role_service(userId, maVaiTro);
        return res.status(200).json(message); 
    } catch (error) {
        console.error('Error in change_role:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi đổi quyền người dùng',
            error: error.message
        });
    }
};

let delete_user = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
           errCode:1,
           message:"Thiếu tham số đầu vào" 
        })
    }
    let message = await delete_user_service(req.body.id);
    return res.status(200).json(message);
}   


// Xử lý đăng nhập
const handlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await login_user_service(email, password);
        if (data.EC === 0) {    
            return res.status(200).json(data);
        } else {
            return res.status(401).json(data);
        }
    } catch (e) {
        console.error('Login error:', e);
        return res.status(500).send('An error occurred');
    }
};

module.exports = {
    get_user,
    create_user,
    edit_user,
    delete_user,
    handlogin,
    get_account,
    get_role,
    change_role
};