const { poolPromise } = require('../router/conect');

const getdanhsachkehoach = async () => {
    try {
        const query = `
            SELECT kehoach.*, taikhoan.* 
            FROM kehoach 
            INNER JOIN taikhoan ON kehoach.maTaiKhoan = taikhoan.id
        `;
        const [rows] = await poolPromise.query(query);
        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách kế hoạch: ' + error.message);
    }
};

const getdanhsachthietbi = async (maKeHoach) => {
    try {
        if (!maKeHoach) {
            throw new Error('Thiếu mã kế hoạch');
        }
        const query = `
            SELECT 
                tb.maThietBi,
                tb.tenThietBi,
                tb.giaBan,
                tb.viTriTrongPhong,
                tb.moTa,
                tb.Hang,
                tb.xuatXu,
                tb.hinhAnh,
                tb.tenPhong,
                yc.soLuong,
                yc.maYeuCau,
                dm.tenDanhMuc,
                dm.maDanhMuc
            FROM kehoach k
            INNER JOIN yeucau yc ON k.TongHopYeuCau LIKE CONCAT('%', yc.maYeuCau, '%')
            INNER JOIN thietbi tb ON yc.maThietBi = tb.maThietBi
            INNER JOIN danhmuc dm ON tb.maDanhMuc = dm.maDanhMuc
            WHERE k.maKeHoach = ?
        `;
        const [rows] = await poolPromise.query(query, [maKeHoach]);
        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách thiết bị: ' + error.message);
    }
};

module.exports = {
    getdanhsachkehoach,
    getdanhsachthietbi
};