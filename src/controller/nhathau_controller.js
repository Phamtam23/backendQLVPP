const {
    get_all_nhathau_service,
    get_nhathau_by_id_service,
    addNhathau_service,
    delete_nhathau_service,
    create_nhathau_service

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

let get_nhathauById = async (req, res) => {
    try {
        const data = await get_nhathau_by_id_service(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            chitietnhathau: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nha thau:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            chitietnhathau: {}
        });
    }
};



const addNhaThauController = async (req, res) => {
  try {
    const {
      tenNhaThau,
      hoTenNguoiDaiDien,
      chucVuNguoiDaiDien,
      loaiHinhDoanhNGhiep,
      diaChi,
      website,
      soDieDanh,
      soGiayPhepKinhDoanh,
      Email,
      linhVuc,
    } = req.body;

    // Kiểm tra đầu vào
    

    // Gọi service để thêm nhà thầu
    const insertId = await addNhathau_service (
      tenNhaThau,
      hoTenNguoiDaiDien,
      chucVuNguoiDaiDien,
      loaiHinhDoanhNGhiep,
      diaChi,
      website,
      soDieDanh,
      soGiayPhepKinhDoanh,
      Email,
      linhVuc
    );

    return res.status(201).json({
      errCode: 0,
      message: 'Thêm nhà thầu thành công',
      maNhaThau: insertId,
    });
  } catch (error) {
    console.error('Lỗi khi thêm nhà thầu:', error);
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server khi thêm nhà thầu',
    });
  }
};



const delete_nhathau = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await delete_nhathau_service(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ errCode: -1, message: err.message });
  }
};

const createNhaThau = async (req, res) => {
  try {
    const result = await create_nhathau_service(req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ errCode: -1, message: err.message });
  }
};


module.exports = {
    get_nhathau,
    delete_nhathau,
    get_nhathauById,
    createNhaThau,
    addNhaThauController

};