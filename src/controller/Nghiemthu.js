const {
  getnghiemthu_services,
  getnghiemthuchitiet_services,
  xacNhanNghiemThu_service,
  capNhatNghiemThu_service,
  deleteNghiemThu_service
} = require("../services/nghiemthu_service");

const multer = require("multer");
const path = require("path");

// ⚙️ Cấu hình lưu file
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});


const upload = multer({ storage: storage });

const uploadMultiFields = upload.any(); 
// ✅ GET danh sách nghiệm thu
const get_dsnghiemthu = async (req, res) => {
  try {
    const data = await getnghiemthu_services();
    if (!data) return res.status(404).send("Not found");
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('An error occurred: ' + error.message);
  }
};

// ✅ GET chi tiết nghiệm thu
const get_chitietnghiemthu = async (req, res) => {
  try {
    const manghiemthu = req.query.maNghiemthu;
    const data = await getnghiemthuchitiet_services(manghiemthu);
    if (!data) return res.status(404).send("Not found");
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error occurred:', error);
    return res.status(500).send('An error occurred: ' + error.message);
  }
};

const xacNhanNghiemThu = async (req, res) => {
  try {
    
    const result = await xacNhanNghiemThu_service( req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Lỗi xác nhận nghiệm thu:', error);
    return res.status(500).json({ message: 'Lỗi server khi xác nhận nghiệm thu' });
  }
};


const capNhatNghiemThu = async (req, res) => {
  try {
   

    const result = await capNhatNghiemThu_service( req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error('Lỗi xác nhận nghiệm thu:', error);
    return res.status(500).json({ message: 'Lỗi server khi xác nhận nghiệm thu' });
  }
};

const delete_nghiemthu= async (req, res) => {
    try {
        const maNghiemThu = req.query.maNghiemThu;
        const data = await deleteNghiemThu_service(maNghiemThu)
        if (!data) {
            return res.status(404).send("Not found");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};
// ✅ Export controller và middleware upload
module.exports = {
  get_dsnghiemthu,
  get_chitietnghiemthu,
  xacNhanNghiemThu,
  upload,capNhatNghiemThu,
  delete_nghiemthu
};
