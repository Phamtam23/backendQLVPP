const express = require('express');
const { poolPromise, sql } = require('../router/conect');
const { PollingQuery } = require('msnodesqlv8');
const {
    create_user_service,
    login_user_service,
    get_user_service
} = require('../services/user_service');

// Lấy danh sách tất cả user
const get_user = async (req, res) => {
    try {
        const data = await get_user_service();
        if (!data || data.length === 0) {
            return res.status(404).send('No users found');
        }
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
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
const create_user = async (req, res) => {
    try {
        const { name, pass } = req.body;
        await create_user_service(name, pass);
        return res.status(200).send('User created successfully');
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred');
    }
};

// Xử lý đăng nhập
const handlogin = async (req, res) => {
    try {
        const { name, pass } = req.body;
        const data = await login_user_service(name, pass);
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
    handlogin,
    get_account
};