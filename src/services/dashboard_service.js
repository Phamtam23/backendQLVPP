const { poolPromise } = require('../router/conect');

const getDashboardDataService = async (month, year) => {
  try {
    // Filters theo tháng/năm cho các bảng có trường ngày
    const whereDateFilter = (field) => {
      if (month && year) return `WHERE MONTH(${field}) = ${month} AND YEAR(${field}) = ${year}`;
      if (year) return `WHERE YEAR(${field}) = ${year}`;
      return '';
    };

    const queries = {
      totalNhaThau: `SELECT COUNT(*) AS total FROM nhathau`, // Không có ngày
      totalHopDong: `SELECT COUNT(*) AS total FROM hopdong ${whereDateFilter('ngayKy')}`,
      totalPhienDauThau: `SELECT COUNT(*) AS total FROM phiendauthau ${whereDateFilter('ngayDauThau')}`,
      totalThietBi: `SELECT COUNT(*) AS total FROM thietbi ${whereDateFilter('createdAt')}`,
      totalYeuCau: `SELECT COUNT(*) AS total FROM yeucau ${whereDateFilter('createdAt')}`,

      nhaThauByLinhVuc: `
        SELECT linhvuc.tenLinhVuc, COUNT(*) as total 
        FROM nhathau 
        INNER JOIN linhvuc ON nhathau.maLinhVuc = linhvuc.maLinhVuc 
        GROUP BY linhvuc.tenLinhVuc`,

      hopDongByTrangThai: `
        SELECT trangThai, COUNT(*) as total 
        FROM hopdong 
        ${whereDateFilter('ngayKy')}
        GROUP BY trangThai`,

      hopDongByMonth: `
        SELECT MONTH(ngayKy) as month, COUNT(*) as total 
        FROM hopdong 
        ${year ? `WHERE YEAR(ngayKy) = ${year}` : ''}
        GROUP BY MONTH(ngayKy)`,

      thietBiByDanhMuc: `
        SELECT danhmuc.tenDanhMuc, COUNT(*) as total
        FROM thietbi 
        INNER JOIN danhmuc ON thietbi.maDanhMuc = danhmuc.maDanhMuc 
        GROUP BY danhmuc.tenDanhMuc`,

      yeuCauByLoai: `
        SELECT loaiYeuCau, COUNT(*) as total 
        FROM yeucau 
        GROUP BY loaiYeuCau`
    };

    const results = await Promise.all(Object.values(queries).map(q => poolPromise.query(q)));

    return {
        totalNhaThau: results[0][0][0].total,
        totalHopDong: results[1][0][0].total,
        totalPhienDauThau: results[2][0][0].total,
        totalThietBi: results[3][0][0].total,
        totalYeuCau: results[4][0][0].total,
        nhaThauByLinhVuc: results[5][0],
        hopDongByTrangThai: results[6][0],
        hopDongByMonth: results[7][0],
        thietBiByDanhMuc: results[8][0],
        yeuCauByLoai: results[9][0],
    };
  } catch (err) {
    console.error('[Dashboard Service Error]', err);
    return {
    };
  }
};

module.exports = {
  getDashboardDataService,
};
