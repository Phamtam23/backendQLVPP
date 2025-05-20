const { poolPromise } = require('../router/conect');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salthash = 3;

// Tạo user
const create_user_service = async (name, pass) => {
    try {
        const hashedPass = await bcrypt.hash(pass, salthash);
        const sql = `INSERT INTO usera (username, pass, age) VALUES (?, ?, ?)`;
        const [result] = await poolPromise.query(sql, [name, hashedPass, 18]);
        return result;
    } catch (e) {
        console.error(e);
        throw new Error('Error while creating user');
    }
};

// Lấy tất cả user
const get_user_service = async () => {
    try {
        const [rows] = await poolPromise.query("SELECT * FROM usera");
        return rows;
    } catch (e) {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
};

// Đăng nhập user
const login_user_service = async (name, pass) => {
    try {
        const [rows] = await poolPromise.query(
            "SELECT * FROM usera WHERE username = ?",
            [name]
        );

        const user = rows[0];

        if (!user) {
            return { EC: 1, EM: "Tên đăng nhập không tồn tại" };
        }

        const isMatch = await bcrypt.compare(pass, user.pass);

        if (!isMatch) {
            return { EC: 2, EM: "Mật khẩu không đúng" };
        }

        const payload = {
            name: user.username,
            age: user.age
        };

        const access_token = jwt.sign(
            payload,
            process.env.JWT_key,
            { expiresIn: process.env.JWT_expire }
        );

        return {
            EC: 0,
            access_token,
            user: payload
        };
    } catch (e) {
        console.error("Login service error:", e);
        return { EC: 3, EM: "Lỗi server khi đăng nhập" };
    }
};

module.exports = {
    create_user_service,
    login_user_service,
    get_user_service
};
