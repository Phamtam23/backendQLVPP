const { poolPromise } = require('../router/conect');

const get_all_nhathau_service = async () => {
   try {
        let query, params;
            query = "SELECT nhathau.*, tenLinhVuc FROM nhathau inner join linhvuc on nhathau.maLinhVuc = linhvuc.maLinhVuc"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_nhathau_service:', e);
        throw new Error("Unable to retrieve equipments");
    }
};

const get_nhathau_by_id_service = async (id) => {
    try {
        const query = `
            SELECT nhathau.*, tenLinhVuc 
            FROM nhathau 
            INNER JOIN linhvuc ON nhathau.maLinhVuc = linhvuc.maLinhVuc 
            WHERE nhathau.maNhaThau = ?
        `;
        const params = [id];
        const [rows] = await poolPromise.query(query, params);
        if (rows.length === 0) {
            throw new Error(`Nhà thầu với ID ${id} không tồn tại.`);
        }
        return rows[0]; // Trả về một nhà thầu
    } catch (e) {
        console.error('Error in get_nhathau_by_id_service:', e);
        throw new Error("Unable to retrieve nhathau by ID");
    }
};

const delete_nhathau_service = async (maNhaThau) => {
  try {
    const query = 'DELETE FROM nhathau WHERE maNhaThau = ?';
    const params = [maNhaThau];

    const [result] = await poolPromise.query(query, params);

    if (result.affectedRows === 0) {
      return { errCode: 1, message: 'Không tìm thấy nhà thầu để xoá' };
    }

    return { errCode: 0, message: 'Xoá nhà thầu thành công' };
  } catch (e) {
    console.error('Lỗi khi xoá nhà thầu:', e);
    throw new Error('Không thể xoá nhà thầu');
  }
};

const create_nhathau_service = async (data) => {
  const {
    maNhaThau,
    maSoThue,
    noiCap,
    tenNhaThau,
    tenVietTat,
    loaiHinhDoanhNghiep,
    soGiayPhepKinhDoanh,
    diaChi,
    website,
    hoTenNguoiDaiDien,
    chucVuNguoiDaiDien,
    soDienDanh,
    ngaySinh,
    maLinhVuc
  } = data;

  try {
    const query = `
      INSERT INTO nhathau (
        maNhaThau, maSoThue, noiCap, tenNhaThau, tenVietTat, loaiHinhDoanhNghiep,
        soGiayPhepKinhDoanh, diaChi, website, hoTenNguoiDaiDien, chucVuNguoiDaiDien,
        soDienDanh, ngaySinh, maLinhVuc
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      maNhaThau,
      maSoThue,
      noiCap,
      tenNhaThau,
      tenVietTat,
      loaiHinhDoanhNghiep,
      soGiayPhepKinhDoanh,
      diaChi,
      website,
      hoTenNguoiDaiDien,
      chucVuNguoiDaiDien,
      soDienDanh,
      ngaySinh,
      maLinhVuc
    ];

    await poolPromise.query(query, params);
    return { errCode: 0, message: 'Thêm nhà thầu thành công!' };
  } catch (e) {
    console.error('Lỗi khi thêm nhà thầu:', e);
    throw new Error('Không thể thêm nhà thầu');
  }
};


module.exports = {
    get_all_nhathau_service,
    get_nhathau_by_id_service,
    delete_nhathau_service,
    create_nhathau_service
};
