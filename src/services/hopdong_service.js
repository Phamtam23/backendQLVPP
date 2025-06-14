const { poolPromise } = require('../router/conect');

const get_all_hopdong_service = async () => {
   try {
        let query, params;
            query = "SELECT hopdong.*, tenNhaThau, maLinhVuc FROM hopdong inner join phiendauthau on hopdong.maPhienDauThau = phiendauthau.maPhienDauThau inner join nhathau on phiendauthau.maNhaThau = nhathau.maNhaThau"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_hopdong_service:', e);
        throw new Error("Unable to retrieve equipments");
    }
};

const get_detail_hopdong_service = async (id) => {
    try {
        query = "SELECT hopdong.*, tenNhaThau, nhathau.maNhaThau FROM hopdong inner join phiendauthau on hopdong.maPhienDauThau = phiendauthau.maPhienDauThau inner join nhathau on phiendauthau.maNhaThau = nhathau.maNhaThau where hopdong.maHopDong = ?"; 
        const params = [id];
        const [rows] = await poolPromise.query(query, params);
        if (rows.length === 0) {
            throw new Error(`hop dong với ID ${id} không tồn tại.`);
        }
        return rows[0]; // Trả về một hopdong
    } catch (e) {
        console.error('Error in get_hopdong_by_id_service:', e);
        throw new Error("Unable to retrieve nhathau by ID");
    }
};

const delete_hopdong_service = async (maHopDong) => {
  try {
    const query = 'DELETE FROM hopdong WHERE maHopDong = ?';
    const [result] = await poolPromise.query(query, [maHopDong]);

    if (result.affectedRows === 0) {
      return { errCode: 1, message: 'Không tìm thấy hợp đồng để xoá' };
    }

    return { errCode: 0, message: 'Xoá hợp đồng thành công' };
  } catch (e) {
    console.error('Lỗi khi xoá hợp đồng:', e);
    throw new Error('Không thể xoá hợp đồng');
  }
};

const create_hopdong_service = async (data) => {
  try {
    const {
      maHopDong,
      tenHopDong,
      moTa,
      ngayKy,
      noiDungHopDong,
      hinhThucThanhToan,
      thoiGianThucHien,
      thoiGianHoanThanh,
      maPhienDauThau,
      trangThai,
    } = data;

    const query = `
      INSERT INTO hopdong (
        maHopDong,
        tenHopDong,
        moTa,
        ngayKy,
        noiDungHopDong,
        hinhThucThanhToan,
        thoiGianThucHien,
        thoiGianHoanThanh,
        maPhienDauThau,
        trangThai
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      maHopDong,
      tenHopDong,
      moTa,
      ngayKy,
      noiDungHopDong,
      hinhThucThanhToan,
      thoiGianThucHien,
      thoiGianHoanThanh,
      maPhienDauThau,
      trangThai
    ];

    await poolPromise.query(query, params);
    return { errCode: 0, message: 'Tạo hợp đồng thành công!' };
  } catch (e) {
    console.error('Lỗi khi tạo hợp đồng:', e);
    throw new Error('Không thể tạo hợp đồng');
  }
};

const update_hopdong_service = async (maHopDong, moTa, trangThai) => {
  try {
    const query = `
      UPDATE hopdong
      SET moTa = ?, trangThai = ?
      WHERE maHopDong = ?
    `;
    const params = [moTa, trangThai, maHopDong];
    const [result] = await poolPromise.query(query, params);

    if (result.affectedRows === 0) {
      throw new Error(`Hợp đồng với mã ${maHopDong} không tồn tại.`);
    }

    return { errCode: 0, message: 'Cập nhật thành công!' };
  } catch (e) {
    console.error('Lỗi khi cập nhật hợp đồng:', e);
    throw new Error('Không thể cập nhật hợp đồng');
  }
};


module.exports = {
    get_all_hopdong_service,
    get_detail_hopdong_service,
    delete_hopdong_service,
    create_hopdong_service,
    update_hopdong_service
};