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


const addNhathau_service = async (
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
) => {
  try {
    const timestamp = Date.now().toString().slice(-8); 
    const maNhaThau = `NT${timestamp}`; 
    const sql = `
      INSERT INTO nhathau (
        maNhaThau,
        tenNhaThau,
        hoTenNguoiDaiDien,
        chucVuNguoiDaiDien,
        loaiHinhDoanhNGhiep,
        diaChi,
        website,
        soDienDanh,
        soGiayPhepKinhDoanh,
        Email,
        malinhVuc
      ) VALUES (? ,? , ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      maNhaThau,
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
    ];

    const [result] = await poolPromise.query(sql, values);
    return result.insertId; // trả về ID nhà thầu mới
  } catch (error) {
    console.error(error);
    throw new Error('Lỗi khi thêm nhà thầu mới');
  }
};


module.exports = {
    get_all_nhathau_service,
    get_nhathau_by_id_service,
    addNhathau_service
};
