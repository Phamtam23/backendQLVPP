const { poolPromise } = require('../router/conect');
require('dotenv').config();

// Tạo yêu cầu
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
        maThietBi,
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

    // Xử lý loại yêu cầu
    let finalTenVatDung = tenVatDung || null;

    if (loaiYeuCau.toLowerCase() === 'mua sắm') {
        if (!moTaChiTiet || !finalTenVatDung) {
            return {
                errCode: 1,
                message: 'Thiếu mô tả chi tiết hoặc tên vật dụng cho yêu cầu mua sắm'
            };
        }
    } else if (loaiYeuCau.toLowerCase() === 'sửa chữa') {
        if (!maThietBi || !tinhTrangThietBi) {
            return {
                errCode: 1,
                message: 'Thiếu mã sản phẩm hoặc tình trạng thiết bị cho yêu cầu sửa chữa'
            };
        }

        // Nếu tenVatDung không được truyền, lấy từ bảng thietbi
        if (!finalTenVatDung) {
            try {
                const [rows] = await poolPromise.query(
                    `SELECT tenThietBi FROM thietbi WHERE maThietBi = ?`,
                    [maThietBi]
                );

                if (rows.length > 0) {
                    finalTenVatDung = rows[0].tenThietBi;
                } else {
                    return {
                        errCode: 1,
                        message: 'Không tìm thấy thiết bị tương ứng với mã đã cho'
                    };
                }
            } catch (e) {
                console.error('Lỗi khi lấy tên thiết bị:', e);
                return {
                    errCode: 1,
                    message: 'Lỗi hệ thống khi lấy tên thiết bị'
                };
            }
        }
    } else {
        return {
            errCode: 1,
            message: 'Loại yêu cầu không hợp lệ. Vui lòng chọn "mua sắm" hoặc "sửa chữa"'
        };
    }

    // Tiến hành insert
    try {
        const sql = `
            INSERT INTO yeucau (
                lyDoDeXuat, maTaiKhoan, trangThai, ngayDuyet, loaiYeuCau,
                moTaChiTiet, tenVatDung, soLuong, maThietBi, tinhTrangThietBi,
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
            finalTenVatDung,
            soLuong || 1,
            maThietBi || null,
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