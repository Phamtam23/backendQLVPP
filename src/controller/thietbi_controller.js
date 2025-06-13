const {
    get_all_thietbi_service,
    get_all_phong_service,
    get_all_danhmuc_service,
    create_thietbi_service,
    edit_thietbi_service,
    delete_thietbi_service,
} = require('../services/thietbi_service');

let get_thietbi = async (req, res) => {
    try {
        const idDanhMuc = req.query.idDanhMuc; // 👈 Lấy từ query string

        const data = await get_all_thietbi_service(idDanhMuc); // 👈 Truyền tham số vào service

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
let get_danhmuc = async (req, res) => {
    try {
        const idDanhMuc = req.query.idDanhMuc; // 👈 Lấy từ query string

        const data = await get_all_danhmuc_service(idDanhMuc);
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachdanhmuc: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu danh mục:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            danhsachdanhmuc: []
        });
    }
};
let create_thietbi = async (req, res) => {
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
            hinhAnh: fileInfo ? fileInfo.fileUrl : ''
        };


        const message = await create_thietbi_service(requestData);
        
        // Trả về kết quả bao gồm cả thông tin file nếu có
        return res.status(200).json({
            ...message,
            fileInfo: fileInfo
        });
    } catch (error) {
        console.error('Error occurred in create device:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi tạo thiết bị',
            error: error.message
        });
    }
};
let edit_thietbi = async (req, res) => {
    try {
        console.log('Dữ liệu nhận từ frontend (update):', req.body);
        console.log('File nhận được (update):', req.file);

        let fileInfo = null;
        let hinhAnhUrl = req.body.existingImageUrl || null;

        // Nếu có file mới, tạo URL ảnh mới
        if (req.file) {
            const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
            fileInfo = {
                originalName: req.file.originalname,
                fileName: req.file.filename,
                fileUrl: fileUrl
            };
            hinhAnhUrl = fileUrl; // Ghi đè hình ảnh cũ
        }

        const requestData = {
            ...req.body,
            hinhAnh: hinhAnhUrl
        };

        const message = await edit_thietbi_service(requestData);

        return res.status(200).json({
            ...message,
            fileInfo: fileInfo
        });
    } catch (error) {
        console.error('Error occurred in update device:', error);
        return res.status(500).json({
            errCode: 2,
            message: 'Đã xảy ra lỗi khi cập nhật thiết bị',
            error: error.message
        });
    }
};
let delete_thietbi = async(req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
           errCode:1,
           message:"Thiếu tham số đầu vào" 
        })
    }
    let message = await delete_thietbi_service(req.body.id);
    return res.status(200).json(message);
}   

module.exports = {
    get_thietbi,
    get_phong,
    get_danhmuc,
    create_thietbi,
    edit_thietbi,
    delete_thietbi,
};


