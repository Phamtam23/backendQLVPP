const { poolPromise } = require('../router/conect');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salthash = 3;
// Tạo user
const create_yeucau_service = async (data) => {
    const {
        lyDoDeXuat,
        maTaiKhoan,
        trangThai,
        ngayDuyet,
        loaiYeuCau,
        moTaChiTiet,
        tenVatDung,
        soLuong,
        maSanPham,
        tinhTrangThietBi,
        hinhAnhSuaChua,
        createdAt
    } = data;

    // Kiểm tra các trường bắt buộc chung
    if (!lyDoDeXuat || !maTaiKhoan || !trangThai || !loaiYeuCau) {
        return {
            errCode: 1,
            message: 'Thiếu một hoặc nhiều tham số đầu vào bắt buộc (chung)'
        };
    }

    // Kiểm tra theo loại yêu cầu
    if (loaiYeuCau.toLowerCase() === 'mua sắm') {
        if (!moTaChiTiet || !tenVatDung || !soLuong) {
            return {
                errCode: 1,
                message: 'Thiếu mô tả chi tiết, tên vật dụng hoặc số lượng cho yêu cầu mua sắm'
            };
        }
    } else if (loaiYeuCau.toLowerCase() === 'sửa chữa') {
        if (!maSanPham || !tinhTrangThietBi || !hinhAnhSuaChua) {
            return {
                errCode: 1,
                message: 'Thiếu mã sản phẩm, tình trạng thiết bị hoặc hình ảnh sản phẩm cho yêu cầu sửa chữa'
            };
        }
    } else {
        return {
            errCode: 1,
            message: 'Loại yêu cầu không hợp lệ. Vui lòng chọn "mua sắm" hoặc "sửa chữa"'
        };
    }

    try {
        const sql = `
            INSERT INTO yeucau (
                lyDoDeXuat, maTaiKhoan, trangThai, ngayDuyet, loaiYeuCau,
                moTaChiTiet, tenVatDung, soLuong, maSanPham, tinhTrangThietBi,
                hinhAnhSuaChua, createdAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await poolPromise.query(sql, [
            lyDoDeXuat,
            maTaiKhoan,
            trangThai,
            ngayDuyet || null,
            loaiYeuCau,
            moTaChiTiet || null,
            tenVatDung || null,
            soLuong || null,
            maSanPham || null,
            tinhTrangThietBi || null,
            hinhAnhSuaChua || null,
            createdAt || new Date()
        ]);

        return {
            errCode: 0,
            message: 'Tạo yêu cầu thành công',
            insertId: result.insertId
        };

    } catch (e) {
        console.error('Lỗi khi tạo yêu cầu:', e);
        throw new Error('Đã xảy ra lỗi khi tạo yêu cầu');
    }
};


module.exports = {
    create_yeucau_service,
};
