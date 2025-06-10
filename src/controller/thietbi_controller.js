const {
    get_all_thietbi_service,
    get_all_phong_service,
} = require('../services/thietbi_service');

let get_thietbi = async (req, res) => {
    try {
        const data = await get_all_thietbi_service();
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
let upload_file = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                errCode: 1,
                message: 'Không có file nào được upload',
                data: null
            });
        }

        // Tạo URL để truy cập file
        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        return res.status(200).json({
            errCode: 0,
            message: 'Upload file thành công',
            data: {
                originalName: req.file.originalname,
                fileName: req.file.filename,
                fileUrl: fileUrl
            }
        });

    } catch (error) {
        console.error('Lỗi khi upload file:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi khi upload file: ' + error.message,
            data: null
        });
    }
};
module.exports = {
    get_thietbi,
    get_phong,
    upload_file
};