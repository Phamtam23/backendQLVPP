const { getTatCaNhaThau, getNhaThauByMa } = require('../services/chonnhathau_service');

const getChonTatCaNhaThau = async (req, res) => {
    try {
        const data = await getTatCaNhaThau();
        res.status(200).json({ errCode: 0, message: 'Thành công', danhsachnhathau: data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thầu:', error);
        res.status(500).json({ errCode: 3, message: error.message, danhsachnhathau: [] });
    }
};

const getChiTietNhaThau = async (req, res) => {
    try {
        const data = await getNhaThauByMa(req.params.id);
        res.status(200).json({ errCode: 0, message: 'Thành công', chitietnhathau: data });
    } catch (error) {
        console.error('Lỗi khi lấy nhà thầu:', error);
        res.status(500).json({ errCode: 3, message: error.message, chitietnhathau: {} });
    }
};

module.exports = { getChonTatCaNhaThau, getChiTietNhaThau };