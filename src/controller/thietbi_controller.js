const {
    get_all_thietbi_service,
    get_all_phong_service,
    get_all_danhmuc_service,
} = require('../services/thietbi_service');

let get_thietbi = async (req, res) => {
    try {
        const idDanhMuc = req.query.idDanhMuc; // 👈 Lấy từ query string

        const data = await get_all_thietbi_service(idDanhMuc); // 👈 Truyền tham số vào service

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachthietbi: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu thiết bị:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachthietbi: []
        });
    }
};

let get_phong = async (req, res) => {
    try {
        const data = await get_all_phong_service();
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachphong: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu phòng:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachphong: []
        });
    }
};
let get_danhmuc = async (req, res) => {
    try {
        const idDanhMuc = req.query.idDanhMuc; // 👈 Lấy từ query string

        const data = await get_all_danhmuc_service(idDanhMuc);
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachdanhmuc: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachdanhmuc: []
        });
    }
};
module.exports = {
    get_thietbi,
    get_phong,
    get_danhmuc,
};