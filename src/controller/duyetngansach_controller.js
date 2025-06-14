const { getdanhsachkehoach, getdanhsachthietbi } = require('../services/duyetngansach_service');

const getlistMuaSam = async (req, res) => {
    try {
        const data = await getdanhsachkehoach();  // Sửa tên hàm cho khớp
        res.status(200).json({ errCode: 0, message: 'Thành công', danhsachkehoach: data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách mua sắm:', error);
        res.status(500).json({ errCode: 3, message: error.message, danhsachkehoach: [] });
    }
};

const getlistthietbi = async (req, res) => {
    try {
        const { maKeHoach } = req.params;
        if (!maKeHoach) {
            return res.status(400).json({
                errCode: 1,
                message: 'Thiếu mã kế hoạch',
                listthietbi: []
            });
        }
        const data = await getdanhsachthietbi(maKeHoach);
        res.status(200).json({ errCode: 0, message: 'Thành công', listthietbi: data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách thiết bị:', error);
        res.status(500).json({ errCode: 3, message: error.message, listthietbi: [] });
    }
};

module.exports = {
    getlistMuaSam,
    getlistthietbi
};