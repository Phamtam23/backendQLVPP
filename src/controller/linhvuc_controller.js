const {
    get_all_linhvuc_service,
} = require('../services/linhvuc_service');

let get_linhvuc = async (req, res) => {
    try {
        const data = await get_all_linhvuc_service();
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachlinhvuc: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hop dong:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachlinhvuc: []
        });
    }
};
module.exports = {
    get_linhvuc
};