const {
    get_all_hopdong_service,
    get_detail_hopdong_service,
    delete_hopdong_service,
    create_hopdong_service,
    update_hopdong_service,
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

let get_hopdongById = async (req, res) => {
    try {
        const data = await get_detail_hopdong_service(req.params.id);
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            chitiethopdong: data
        });
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu nha thau:', error);
        return res.status(500).json({
            errCode: 3,
            message: 'Đã xảy ra lỗi phía server: ' + error.message,
            chitiethopdong: {}
        });
    }
};

const delete_hopdong = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await delete_hopdong_service(id);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ errCode: -1, message: err.message });
  }
};

const create_hopdong = async (req, res) => {
  try {
    const result = await create_hopdong_service(req.body);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ errCode: -1, message: err.message });
  }
};

const update_hopdong = async (req, res) => {
  const { maHopDong, moTa, trangThai } = req.body;
  try {
    const result = await update_hopdong_service(maHopDong, moTa, trangThai);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: e.message });
  }
};



module.exports = {
    get_hopdong,
    get_hopdongById,
    delete_hopdong,
    create_hopdong,
    update_hopdong
};