const { rows } = require('mssql');
const { poolPromise } = require('../router/conect');
require('dotenv').config

const { getkehoachchitiet_services } = require("./kehoach_service");

const getnghiemthu_services = async () => {
  try {
    // Lấy tất cả bản ghi từ bảng kehoach
    const [data] = await poolPromise.query("SELECT * FROM kehoach");

    // Lấy thông tin nghiệm thu cho từng kế hoạch
    const dataResult = await Promise.all(
      data.map(async (item) => {
        // Truy vấn bảng nghiemthu để lấy thông tin nghiệm thu (nếu có)
        const [result] = await poolPromise.query(
          `SELECT * FROM nghiemthu WHERE maKeHoach = ?`,
          [item.maKeHoach]
        );

       
        if (result.length > 0) {
          return {
            ...item, // Giữ tất cả các cột từ kehoach (bao gồm tenKeHoach, ngayYeuCau, v.v.)
            nghiemThu: result[0], // Thêm toàn bộ thông tin nghiệm thu
            daNghiemThu: true, // Đánh dấu đã nghiệm thu
          };
        }

        // Nếu không có bản ghi nghiệm thu
        return {
          ...item,
          nghiemThu: null, // Không có thông tin nghiệm thu
          daNghiemThu: false, // Chưa nghiệm thu
        };
      })
    );

    return dataResult;
  } catch (error) {
    console.error('Error occurred in getNghiemThuServices:', error);
    throw new Error('Unable to retrieve kehoach data');
  }
};

const getnghiemthuchitiet_services = async (manghiemthu) => {
  try {
    // Lấy một bản ghi từ bảng kehoach
    const item = await getkehoachchitiet_services(manghiemthu);

    // Kiểm tra nếu không có dữ liệu
    if (!item || !item.maKeHoach) {
      throw new Error("Không tìm thấy kế hoạch tương ứng");
    }

    // Truy vấn bảng nghiemthu để lấy thông tin nghiệm thu
    const [result] = await poolPromise.query(
      `SELECT * FROM nghiemthu WHERE maKeHoach = ?`,
      [item.maKeHoach]
    );

    // Trả về dữ liệu có gắn thông tin nghiệm thu
    if (result.length > 0) {
      return {
        ...item,
        nghiemThu: result[0],
        daNghiemThu: true,
      };
    } else {
      return {
        ...item,
        nghiemThu: null,
        daNghiemThu: false,
      };
    }
  } catch (e) {
    console.error('Error occurred in getnghiemthuchitiet_services:', e);
    throw new Error("Unable to retrieve users");
  }
};


const xacNhanNghiemThu_service = async (data) => {
  const {
    maNghiemThu,
    maKeHoach,
    hinhAnhNghiemThu = '',
    trangThai,
    noiDung,
    ngayTao = new Date(),
  } = data;

  if (!maNghiemThu || !maKeHoach || !trangThai || !noiDung) {
    throw new Error("Thiếu dữ liệu bắt buộc");
  }

  const [existing] = await poolPromise.query(
    "SELECT * FROM nghiemthu WHERE maNghiemThu = ?",
    [maNghiemThu]
  );

  if (existing.length > 0) {
    // Cập nhật nếu đã tồn tại
    await poolPromise.query(
      `UPDATE nghiemthu SET 
        maKeHoach = ?, 
        hinhAnhNghiemThu = ?, 
        trangThai = ?, 
        noiDung = ?, 
        ngayTao = ?
      WHERE maNghiemThu = ?`,
      [maKeHoach, hinhAnhNghiemThu, trangThai, noiDung, ngayTao, maNghiemThu]
    );
  } else {
    // Thêm mới nếu chưa có
    await poolPromise.query(
      `INSERT INTO nghiemthu 
        (maNghiemThu, maKeHoach, hinhAnhNghiemThu, trangThai, noiDung, ngayTao) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [maNghiemThu, maKeHoach, hinhAnhNghiemThu, trangThai, noiDung, ngayTao]
    );
  }

  return { message: "Xử lý nghiệm thu thành công" };
};



module.exports={
   getnghiemthu_services,
   getnghiemthuchitiet_services,
   xacNhanNghiemThu_service
}