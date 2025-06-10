const {
    get_all_hopdong_service,
} = require('../services/hopdong_service');

let get_hopdong = async (req, res) => {
    try {
        const data = await get_all_hopdong_service();
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachhopdong: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu hop dong:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachhopdong: []
        });
    }
};
module.exports = {
    get_hopdong
};