const { poolPromise } = require('../router/conect');

// 1. Lấy danh sách thông báo theo maTaiKhoan
const get_thongbao_by_taikhoan_service = async (maTaiKhoanNhan) => {
    try {
        const query = `
            SELECT * FROM thongbao 
            WHERE maTaiKhoanNhan = ? 
            ORDER BY ngayThongBao DESC
        `;
        const [rows] = await poolPromise.query(query, [maTaiKhoanNhan]);
        return rows;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách thông báo:', error);
        throw new Error('Không thể lấy danh sách thông báo');
    }
};

// 2. Lấy chi tiết thông báo theo maThongBao
const get_thongbao_by_id_service = async (maThongBao) => {
    try {
        const query = `
            SELECT * FROM thongbao 
            WHERE maThongBao = ?
        `;
        const [rows] = await poolPromise.query(query, [maThongBao]);
        if (rows.length === 0) {
            throw new Error(`Không tìm thấy thông báo với mã ${maThongBao}`);
        }
        return rows[0];
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông báo:', error);
        throw new Error('Không thể lấy chi tiết thông báo');
    }
};

// 3. Thêm thông báo mới
const create_thongbao_service = async (thongBao) => {
    const { maThongBao, maTaiKhoan, ngayThongBao, noiDungThongBao, trangThai, maTaiKhoanNhan } = thongBao;

    try {
        const query = `
            INSERT INTO thongbao 
            (maThongBao, maTaiKhoan, ngayThongBao, noiDungThongBao, trangThai, maTaiKhoanNhan)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const params = [maThongBao, maTaiKhoan, ngayThongBao, noiDungThongBao, trangThai, maTaiKhoanNhan];
        await poolPromise.query(query, params);
        return { message: 'Thêm thông báo thành công!' };
    } catch (error) {
        console.error('Lỗi khi thêm thông báo:', error);
        throw new Error('Không thể thêm thông báo');
    }
};

module.exports = {
    get_thongbao_by_taikhoan_service,
    get_thongbao_by_id_service,
    create_thongbao_service,
};
