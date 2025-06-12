const { poolPromise } = require('../router/conect');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salthash = 3;

const checkUserEmail = async (email) => {
    try {
        const [rows] = await poolPromise.query("SELECT * FROM taikhoan WHERE email = ?", [email]);
        return rows.length > 0;
    } catch (error) {
        console.error('Lỗi khi kiểm tra email:', error);
        throw error;
    }
};
// Tạo user
const create_user_service = async (data) => {
    const { hoTen, email, chucVu, donViCongTac, trangThai } = data;

    if (!hoTen || !email || !chucVu || !donViCongTac || !trangThai) {
        return {
            errCode: 1,
            message: 'Thiếu một hoặc nhiều tham số đầu vào'
        };
    }

    try {
        const emailExists = await checkUserEmail(email);
        if (emailExists) {
            return {
                errCode: 1,
                errMessage: "Địa chỉ email đã được sử dụng, vui lòng nhập email khác"
            };
        }

        const defaultPassword = '123456';
        const hashedPassword = await bcrypt.hash(defaultPassword, salthash);

        const sql = `
            INSERT INTO taikhoan (hoTen, email, matKhau, chucVu, donViCongTac, trangThai,maVaiTro, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const [result] = await poolPromise.query(sql, [
            hoTen, email, hashedPassword, chucVu, donViCongTac, trangThai,7, new Date(), new Date() // Mặc định maVaiTro là 7
        ]);

        return {
            errCode: 0,
            message: 'Tạo người dùng thành công',
            insertId: result.insertId
        };

    } catch (e) {
        console.error('Lỗi khi tạo người dùng:', e);
        throw new Error('Đã xảy ra lỗi khi tạo người dùng');
    }
};

const edit_user_service = async (data) => {
    const { id, hoTen, email, chucVu, donViCongTac, trangThai } = data;

    if (!id || !hoTen || !email || !chucVu || !donViCongTac || !trangThai) {
        return {
            errCode: 1,
            message: 'Thiếu một hoặc nhiều tham số đầu vào'
        };
    }

    try {
        const sql = `
            UPDATE taikhoan
            SET hoTen = ?, email = ?, chucVu = ?, donViCongTac = ?, trangThai = ?
            WHERE id = ?
        `;
        const [result] = await poolPromise.query(sql, [
            hoTen, email, chucVu, donViCongTac, trangThai, id
        ]);

        if (result.affectedRows === 0) {
            return {
                errCode: 1,
                message: 'Không tìm thấy người dùng để cập nhật'
            };
        }

        return {
            errCode: 0,
            message: 'Cập nhật người dùng thành công'
        };

    } catch (e) {
        console.error('Lỗi khi cập nhật người dùng:', e);
        throw new Error('Đã xảy ra lỗi khi cập nhật người dùng');
    }
};
const change_role_service = async (userId, maVaiTro) => {
    if (!userId || !maVaiTro) {
        return {
            errCode: 1,
            message: 'Thiếu userId hoặc maVaiTro'
        };
    }

    try {
        const sql = `
            UPDATE taikhoan
            SET maVaiTro = ?
            WHERE id = ?
        `;

        const [result] = await poolPromise.query(sql, [maVaiTro, userId]);

        if (result.affectedRows === 0) {
            return {
                errCode: 1,
                message: 'Không tìm thấy người dùng để cập nhật vai trò'
            };
        }

        return {
            errCode: 0,
            message: 'Cập nhật vai trò người dùng thành công'
        };

    } catch (e) {
        console.error('Lỗi khi cập nhật vai trò người dùng:', e);
        throw new Error('Đã xảy ra lỗi khi cập nhật vai trò người dùng');
    }
};
// Lấy tất cả user
const get_user_service = async (userId) => {
    try {
        let query, params;

        if (userId === 'ALL') {
            query = "SELECT id, hoTen, email,chucVu,donViCongTac,trangThai,maVaiTro FROM taikhoan"; // không lấy mật khẩu
            params = [];
        } else {
            query = "SELECT id, hoTen, email,chucVu,donViCongTac,trangThai,maVaiTro FROM taikhoan WHERE id = ?";
            params = [userId];
        }

        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
};
const get_role_users_service = async (userId) => {
    try {
        let query, params;

        if (userId === 'ALL') {
            query = "SELECT tk.id, tk.hoTen, tk.email, pq.tenVaiTro, pq.Quyen FROM taikhoan tk JOIN phanquyen pq ON tk.maVaiTro = pq.maVaiTro";
            params = [];
        } else {
            query = "SELECT tk.id, tk.hoTen, tk.email, pq.tenVaiTro, pq.Quyen FROM taikhoan tk JOIN phanquyen pq ON tk.maVaiTro = pq.maVaiTro WHERE tk.id = ?";
            params = [userId];
        }

        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
};

const delete_user_service = async (userId) => {
    try {
        // Kiểm tra xem user có tồn tại không
        const [rows] = await poolPromise.query("SELECT * FROM TaiKhoan WHERE id = ?", [userId]);
        if (rows.length === 0) {
            return {
                errCode: 2,
                errMessage: 'Người dùng không tồn tại',
            };
        }

        // Xóa user
        await poolPromise.query("DELETE FROM TaiKhoan WHERE id = ?", [userId]);

        return {
            errCode: 0,
            message: 'Người dùng đã được xóa',
        };
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
        throw new Error('Đã xảy ra lỗi khi xóa người dùng');
    }
};

// Đăng nhập user
const login_user_service = async (email, password) => {
    try {
        const [rows] = await poolPromise.query(
            "SELECT * FROM taikhoan WHERE email = ?",
            [email]
        );

        const user = rows[0];

        if (!user) {
            return { EC: 1, EM: "Tên đăng nhập không tồn tại" };
        }

        const isMatch = await bcrypt.compare(password, user.matKhau);

        if (!isMatch) {
            return { EC: 2, EM: "Mật khẩu không đúng" };
        }

        const payload = {
            id: user.id,
            email: user.email,
            hoTen:user.hoTen,
            chucVu: user.chucVu,
            donViCongTac: user.donViCongTac,
            trangThai: user.trangThai,
            maVaiTro: user.maVaiTro,
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
        console.error(e.stack); // Thêm dòng này
        return { EC: 3, EM: "Lỗi server khi đăng nhập" };
    }

};

module.exports = {
    create_user_service,
    edit_user_service,
    delete_user_service,
    login_user_service,
    get_user_service,
    get_role_users_service,
    change_role_service
};
