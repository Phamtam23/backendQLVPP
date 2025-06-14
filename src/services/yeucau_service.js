const { poolPromise } = require('../router/conect');

// Lấy toàn bộ yêu cầu (YeuCau)
const get_all_yeucau_service = async () => {
  try {
    const query = `
      SELECT yc.*, nv.hoTen AS tenNguoiTao, tb.tenThietBi
      FROM yeucau yc
      LEFT JOIN thietbi tb ON yc.mathietbi = tb.mathietbi 
      LEFT JOIN taikhoan nv ON yc.maTaiKhoan = nv.id
    `;
    const [rows] = await poolPromise.query(query);
    return rows;
  } catch (e) {
    console.error('Error occurred in get_all_yeucau_service:', e);
    throw new Error('Unable to retrieve YeuCau');
  }
};

//Duyệt yêu cầu: cập nhật trạng thái = "Đã duyệt", cập nhật ngày duyệt
const duyet_yeucau_service = async (maYeuCau, ngayDuyet) => {
    try {
        const query = `
            UPDATE yeucau 
            SET trangThai = 'Đã duyệt', ngayDuyet = ? 
            WHERE maYeuCau = ?
        `;
        const [result] = await poolPromise.query(query, [ngayDuyet, maYeuCau]);
        return result.affectedRows > 0;
    } catch (e) {
        console.error('Lỗi khi duyệt yêu cầu:', e);
        throw new Error('Không thể duyệt yêu cầu');
    }
};

//Từ chối yêu cầu: cập nhật trạng thái = "Đã từ chối", cập nhật ngày duyệt
const tu_choi_yeucau_service = async (maYeuCau, ngayDuyet, lyDoTuChoi) => {
    try {
        const query = `
            UPDATE yeucau 
            SET trangThai = 'Đã từ chối', ngayDuyet = ?, lyDoTuChoi = ?
            WHERE maYeuCau = ?
        `;
        const [result] = await poolPromise.query(query, [ngayDuyet, lyDoTuChoi, maYeuCau]);
        return result.affectedRows > 0;
    } catch (e) {
        console.error('Lỗi khi từ chối yêu cầu:', e);
        throw new Error('Không thể từ chối yêu cầu');
    }
};


const get_chi_tiet_yeucau_service = async (id) => {
  try {
    const query = `
      SELECT yc.*, nv.hoTen AS tenNguoiTao, tb.tenThietBi
      FROM yeucau yc
      LEFT JOIN thietbi tb ON yc.mathietbi = tb.mathietbi 
      LEFT JOIN taikhoan nv ON yc.maTaiKhoan = nv.id
      WHERE yc.maYeuCau = ?
    `;
    const [rows] = await poolPromise.query(query, [id]);
    return rows[0]; // Trả về 1 object duy nhất
  } catch (e) {
    console.error('Error occurred in get_chi_tiet_yeucau_service:', e);
    throw new Error('Unable to retrieve YeuCau detail');
  }
};

const delete_yeucau_service = async (maYeuCau) => {
  try {
    const query = 'DELETE FROM yeucau WHERE maYeuCau = ?';
    const [result] = await poolPromise.query(query, [maYeuCau]);

    if (result.affectedRows === 0) {
      return { errCode: 1, message: 'Không tìm thấy yêu cầu để xoá' };
    }

    return { errCode: 0, message: 'Xoá yêu cầu thành công' };
  } catch (e) {
    console.error('Lỗi khi xoá yêu cầu:', e);
    throw new Error('Không thể xoá yêu cầu');
  }
};


module.exports = {
    get_all_yeucau_service,
    get_chi_tiet_yeucau_service,
    duyet_yeucau_service,
    tu_choi_yeucau_service,
    delete_yeucau_service
};