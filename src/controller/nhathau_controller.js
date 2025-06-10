const {
    get_all_nhathau_service,
} = require('../services/nhathau_service');

let get_nhathau = async (req, res) => {
    try {
        const data = await get_all_nhathau_service();
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachnhathau: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nha thau:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachnhathau: []
        });
    }
};

module.exports = {
    get_nhathau
};