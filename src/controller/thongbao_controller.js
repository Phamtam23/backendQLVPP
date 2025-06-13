const {
    get_thongbao_by_taikhoan_service,
    get_thongbao_by_id_service,
    create_thongbao_service
} = require("../services/thongbao_service");

// 1. Lấy danh sách thông báo theo mã tài khoản
const get_dsthongbao = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await get_thongbao_by_taikhoan_service(id);
        if (!data || data.length === 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Không có thông báo nào!',
                danhsachthongbao: []
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy danh sách thông báo thành công',
            danhsachthongbao: data
        });

    } catch (error) {
        console.error('Lỗi khi lấy danh sách thông báo:', error);
        return res.status(500).send('Đã xảy ra lỗi: ' + error.message);
    }
};

// 2. Lấy chi tiết thông báo
const get_chitietthongbao = async (req, res) => {
    try {
        const maThongBao = req.params.maThongBao;
        const data = await get_thongbao_by_id_service(maThongBao);

        if (!data) {
            return res.status(400).json({
                errCode: 1,
                message: 'Không tìm thấy thông báo!',
                chitietthongbao: {}
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy chi tiết thông báo thành công',
            chitietthongbao: data
        });

    } catch (error) {
        console.error('Lỗi khi lấy chi tiết thông báo:', error);
        return res.status(500).send('Đã xảy ra lỗi: ' + error.message);
    }
};

// 3. Thêm mới thông báo
const create_thongbao = async (req, res) => {
    try {
        const data = req.body;
        const result = await create_thongbao_service(data);

        return res.status(200).json({
            errCode: 0,
            message: result.message
        });

    } catch (error) {
        console.error('Lỗi khi thêm thông báo:', error);
        return res.status(500).send('Đã xảy ra lỗi: ' + error.message);
    }
};

module.exports = {
    get_dsthongbao,
    get_chitietthongbao,
    create_thongbao
};
