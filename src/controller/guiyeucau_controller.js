const {
    create_yeucau_service,
} = require('../services/guiyeucau_service');

let create_yeucau = async (req, res) => {
    try {
        console.log('Dữ liệu nhận từ frontend:', req.body);
        console.log('File nhận được:', req.file);

        // Xử lý file nếu có
        let fileInfo = null;
        if (req.file) {
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            fileInfo = {
                originalName: req.file.originalname,
                fileName: req.file.filename,
                fileUrl: fileUrl
            };
        }

        // Gộp thông tin file vào data nếu cần
        const requestData = {
            ...req.body,
            // Nếu là yêu cầu sửa chữa và có file, gán URL file vào hinhAnhSuaChua
            ...(req.body.loaiYeuCau?.toLowerCase() === 'sửa chữa' && fileInfo && {
                hinhAnhSuaChua: fileInfo.fileUrl
            })
        };

        const message = await create_yeucau_service(requestData);
        
        // Trả về kết quả bao gồm cả thông tin file nếu có
        return res.status(200).json({
            ...message,
            fileInfo: fileInfo
        });
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