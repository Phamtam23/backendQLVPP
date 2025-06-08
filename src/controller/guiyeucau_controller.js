const {
    create_yeucau_service,
} = require('../services/guiyeucau_service');

let create_yeucau = async (req, res) => {
    try {
        console.log('Dữ liệu nhận từ frontend:', req.body);
        const message = await create_yeucau_service(req.body);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error occurred in create request:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi tạo yêu cầu',
            error: error.message
        });
    }
};
module.exports = {
    create_yeucau
};