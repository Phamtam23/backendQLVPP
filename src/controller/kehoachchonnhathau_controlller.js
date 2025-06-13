const {
    get_all_kehoachchonnhathau_service,
    get_kehoachchonnhathau_by_id_service,
    approve_kehoachchonnhathau_service,
    reject_kehoachchonnhathau_service,
    approve_all_kehoachchonnhathau_service,
    reject_all_kehoachchonnhathau_service,
} = require('../services/kehoachchonnhathau');

// Lấy toàn bộ danh sách kế hoạch
let get_kehoachchonnhathau = async (req, res) => {
    try {
        const data = await get_all_kehoachchonnhathau_service();
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachkehoach: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu kế hoạch:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachkehoach: []
        });
    }
};

// Lấy chi tiết kế hoạch theo id
let get_kehoachchonnhathau_by_id = async (req, res) => {
    try {
        const data = await get_kehoachchonnhathau_by_id_service(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            kehoach: data
        });
    } catch (error) {
        console.error('Lỗi lấy chi tiết kế hoạch:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            kehoach: null
        });
    }
};

// Duyệt một kế hoạch
let approve_kehoachchonnhathau = async (req, res) => {
    try {
        await approve_kehoachchonnhathau_service(req.params.id);
        return res.status(200).json({ errCode: 0, message: "Duyệt thành công" });
    } catch (error) {
        return res.status(500).json({ errCode: 3, message: 'Lỗi server: ' + error.message });
    }
};

// Từ chối một kế hoạch
let reject_kehoachchonnhathau = async (req, res) => {
    try {
        await reject_kehoachchonnhathau_service(req.params.id);
        return res.status(200).json({ errCode: 0, message: "Từ chối thành công" });
    } catch (error) {
        return res.status(500).json({ errCode: 3, message: 'Lỗi server: ' + error.message });
    }
};

// Duyệt tất cả
let approve_all_kehoachchonnhathau = async (req, res) => {
    try {
        await approve_all_kehoachchonnhathau_service();
        return res.status(200).json({ errCode: 0, message: "Duyệt tất cả thành công" });
    } catch (error) {
        return res.status(500).json({ errCode: 3, message: 'Lỗi server: ' + error.message });
    }
};

// Từ chối tất cả
let reject_all_kehoachchonnhathau = async (req, res) => {
    try {
        await reject_all_kehoachchonnhathau_service();
        return res.status(200).json({ errCode: 0, message: "Từ chối tất cả thành công" });
    } catch (error) {
        return res.status(500).json({ errCode: 3, message: 'Lỗi server: ' + error.message });
    }
};

module.exports = {
    get_kehoachchonnhathau,
    get_kehoachchonnhathau_by_id,
    approve_kehoachchonnhathau,
    reject_kehoachchonnhathau,
    approve_all_kehoachchonnhathau,
    reject_all_kehoachchonnhathau
};