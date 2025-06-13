const { rows } = require('mssql');
const { poolPromise } = require('../router/conect');
require('dotenv').config
const getkehoach_services = async () => {
  try {
    const [keHoachList] = await poolPromise.query("SELECT * FROM kehoach");

    // Duyệt từng kế hoạch để lấy danh sách yêu cầu
    for (const keHoach of keHoachList) {
      if (keHoach.TongHopYeuCau) {
        const listyeucau = keHoach.TongHopYeuCau.split(',').map(item => item.trim());
        const placeholders = listyeucau.map(() => '?').join(',');
        const query = `
          SELECT * FROM yeucau 
          JOIN thietbi ON yeucau.maThietBi = thietbi.maThietBi 
          WHERE maYeuCau IN (${placeholders})
        `;
        const [yeuCauRows] = await poolPromise.query(query, listyeucau);
        keHoach.yeucau = yeuCauRows;
      } else {
        keHoach.yeucau = [];
      }
    }

    return keHoachList;

  } catch (e) {
    console.error('Error occurred in getkehoach_services:', e);
    throw new Error("Unable to retrieve kế hoạch");
  }
};


const getkehoachchitiet_services = async (maKeHoach) => {
    try {
        const [keHoachRows] = await poolPromise.query(
            `SELECT * FROM kehoach WHERE maKeHoach = ?`, [maKeHoach]
        );

        if (!keHoachRows || keHoachRows.length === 0) {
            throw new Error("Không tìm thấy kế hoạch với mã này.");
        }
        const data = keHoachRows[0];
        const listyeucau=data.TongHopYeuCau.split(',').map(item=>item.trim());
        const place=listyeucau.map(()=>'?').join(',');
        const query = `select * from yeucau , thietbi where yeucau.maThietBi=thietbi.maThietBi and maYeuCau in (${place})`
        const datayc=await poolPromise.query(query,listyeucau)
        data.yeucau = datayc[0];
        return data;

    } catch (e) {
        console.error('Error occurred in getkehoachchitiet_services:', e);
        throw new Error("Unable to retrieve users");
    }
};

const getyeucau_services = async () => {
  try {
    const [rows] = await poolPromise.query(
      "SELECT * FROM yeucau WHERE trangThai = 'Đang chờ duyệt'"
    );

    const result = [];

    for (const item of rows) {
      let thietbi = [];

      if (item.loaiYeuCau === "Mua sắm") {
        const [res] = await poolPromise.query(
          `SELECT * FROM yeucau_muasam WHERE maYeuCau = ?`,
          [item.maYeuCau]
        );
        thietbi = res;
      } else if (item.loaiYeuCau === "Sửa chữa") {
        const [res] = await poolPromise.query(
          `SELECT * FROM yeucau_suachua ys 
           JOIN thietbi tb ON ys.maSanPham = tb.maThietBi 
           WHERE ys.maYeuCau = ?`,
          [item.maYeuCau]
        );
        thietbi = res;
      }

      result.push({
        ...item,
        thietbi,
      });
    }

    return result;
  } catch (e) {
    console.error('Error occurred in getyeucau_services:', e);
    throw new Error("Unable to retrieve requests");
  }
};


const createkehoach_service = async (
  tenKeHoach,
  TongHopYeuCau,
  chuDautu,
  tgbatdau,
  tgketthuc,
  donVi,
  matk,
  loaiyc,
  trangThai,
  chiPhiKeHoach
) => {
  try {
   
  const yc=TongHopYeuCau.split(',') 
    const maKeHoach = yc[0].toString().padStart(10, '0');


    // ✅ Câu lệnh SQL
    const sql = `
      INSERT INTO kehoach (
        maKeHoach, tenKeHoach, TongHopYeuCau, chuBuTu,
        thoiGianBatDau, thoiGianKetThuc, donVi,
        maTaiKhoan, loaiyeucau, trangThai,chiPhiKeHoach
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const values = [
      maKeHoach,
      tenKeHoach,
      TongHopYeuCau,
      chuDautu,
      tgbatdau,
      tgketthuc,
      donVi,
      matk,
      loaiyc,
      trangThai,
      chiPhiKeHoach
    ];

    const [result] = await poolPromise.query(sql, values);
      const dsyeucau=TongHopYeuCau.split(',')
    const place=dsyeucau.map(()=>'?').join(',');
    const sqlyc=`update yeucau set trangThai='Đã tạo kế hoạch' where maYeuCau in(${place})`;
  
    await poolPromise.query(sqlyc,dsyeucau)
    return result;
  } catch (e) {
    console.error(e);
    throw new Error('Error while creating kế hoạch');
  }
};

const updateKeHoach_service = async (
  maKeHoach,
  tenKeHoach,
  TongHopYeuCau,
  chuDautu,
  tgbatdau,
  tgketthuc,
  donVi,
  matk,
  loaiyeucau,
  trangThai,
  chiPhiKeHoach
) => {
  try {
    const dsYeuCau = TongHopYeuCau.split(',');

    // ✅ Cập nhật kế hoạch
    const sql = `
      UPDATE kehoach
      SET tenKeHoach = ?, 
          TongHopYeuCau = ?, 
          chuBuTu = ?, 
          thoiGianBatDau = ?, 
          thoiGianKetThuc = ?, 
          donVi = ?, 
          maTaiKhoan = ?, 
          loaiyeucau = ?, 
          trangThai = ?, 
          chiPhiKeHoach = ?
      WHERE maKeHoach = ?
    `;

    const values = [
      tenKeHoach,
      TongHopYeuCau,
      chuDautu,
      tgbatdau,
      tgketthuc,
      donVi,
      matk,
      loaiyeucau,
      trangThai,
      chiPhiKeHoach,
      maKeHoach
    ];

    const [result] = await poolPromise.query(sql, values);

    // ✅ Cập nhật trạng thái các yêu cầu liên quan
    const placeholders = dsYeuCau.map(() => '?').join(',');
    const sqlyc = `
      UPDATE yeucau 
      SET trangThai = 'Đã tạo kế hoạch' 
      WHERE maYeuCau IN (${placeholders})
    `;

    await poolPromise.query(sqlyc, dsYeuCau);

    return result;
  } catch (e) {
    console.error(e);
    throw new Error('Error while updating kế hoạch');
  }
};

const deletekehoahc_services = async (maKeHoach) => {
    try {
        const sql =`delete kehoach where maKeHoach='${maKeHoach}'`
      poolPromise.query(sql)
    } catch (e) {
        console.error('Error occurred in getkehoachchitiet_services:', e);
        throw new Error("Unable to retrieve users");
    }
};


module.exports={
   getkehoach_services,
   getkehoachchitiet_services,
   getyeucau_services,
   createkehoach_service,
   updateKeHoach_service,
   deletekehoahc_services
}