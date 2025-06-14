const { getdanhsachhopdong, getThongTinHopDong } = require('../services/thanhtoanhopdong_service');

const getChonHopDong = async (req, res) => {
    try {
        const data = await getdanhsachhopdong();
        res.status(200).json({ errCode: 0, message: 'Thành công', danhsachhopdong: data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thầu:', error);
        res.status(500).json({ errCode: 3, message: error.message, danhsachhopdong: [] });
    }
};
const getThongTinHopDongController = async (req, res) => {
    try {
        const { maHopDong } = req.params;
        if (!maHopDong) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu mã hợp đồng',
                thongTinHopDong: []
            });
        }
        const data = await getThongTinHopDong(maHopDong);
        res.status(200).json({ errCode: 0, message: 'Thành công', thongTinHopDong: data });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin hợp đồng:', error);
        res.status(500).json({ errCode: 3, message: error.message, thongTinHopDong: [] });
    }
};


module.exports = {
    getChonHopDong,
    getThongTinHopDongController
};