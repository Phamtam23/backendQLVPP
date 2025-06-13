const { rows } = require('mssql');
const { poolPromise } = require('../router/conect');
require('dotenv').config


const { getkehoachchitiet_services } = require('./kehoach_service');

  const get_dsmoithau_service =async()=> {
     try
    {
        const [data]=await poolPromise.query("select * from phiendauthau,kehoach where phiendauthau.maKeHoach=kehoach.maKeHoach");
        return data
    }
    catch(e)
    {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
  }





const get_chitietmoithau_service = async (maPhienDauThau) => {
  try {
    console.log("🔍 Đang tìm phiên đấu thầu với mã:", maPhienDauThau);

    const [rows] = await poolPromise.query(`
      SELECT * 
      FROM phiendauthau
      JOIN goithau ON phiendauthau.maGoiThau = goithau.maGoiThau
      JOIN linhvuc ON goithau.maLinhVuc = linhvuc.maLinhVuc
      JOIN nhathau ON phiendauthau.maNhaThau = nhathau.maNhaThau
      WHERE phiendauthau.maPhienDauThau = ?
    `, [maPhienDauThau]);

    if (rows.length === 0) {
      throw new Error("Không tìm thấy phiên đấu thầu");
    }

    const phienDauThau = rows[0];
    console.log(phienDauThau.maKehoach); // Sẽ in ra đúng nếu có trường này

    const kehoach = await getkehoachchitiet_services(phienDauThau.maKehoach);
    phienDauThau.kehoach = kehoach;

    return phienDauThau;

  } catch (e) {
    console.error('❌ Lỗi chi tiết trong get_chitietmoithau_service:', e.message);
    console.error('❌ Stack:', e.stack);
    throw new Error("Unable to retrieve moithau details");
  }
};

  const get_dsgoithau_service =async()=> {
     try
    {
        const [data]=await poolPromise.query("select * from goithau,linhvuc where goithau.maLinhVuc=linhvuc.maLinhvuc");
    
        return data
    }
    catch(e)
    {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
  }


   const get_dsnhathaulv_service =async(maLinhVuc)=> {
     try
    {
        const [data]=await poolPromise.query(`select * from nhathau where maLinhVuc='${maLinhVuc}'`);
        return data
    }
    catch(e)
    {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
  }
const create_phiendauthau_service = async (data) => {
  try {
    const {
      maKeHoach,
      maGoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc
    } = data;

    const maPhiendauthau = "PDTT" + maKeHoach.slice(-6);

    await poolPromise.query(
      `INSERT INTO phiendauthau 
        (maPhienDauThau, maGoiThau, maKeHoach, trangThai, maNhaThau, ngayDauThau, ngayNopHoSo, ngayKetthuc, giaTrungThau, duToanKinhPhi) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        maPhiendauthau,
        maGoiThau,
        maKeHoach,
        'Chờ đấu thầu',
        'NT00000001',
        ngayDauThau,
        ngayNopHoSo,
        ngayKetThuc,
        0,
        duToanKinhPhi
      ]
    );

    await poolPromise.query(
      `UPDATE kehoach SET trangThai = 'Đã mời thầu' WHERE maKeHoach = ?`,
      [maKeHoach]
    );

    return { message: "Tạo phiên đấu thầu thành công" };
  } catch (e) {
    console.error('Lỗi khi tạo phiên đấu thầu:', e);
    throw new Error("Không thể tạo phiên đấu thầu");
  }
};

  module.exports ={
    get_dsmoithau_service,
    get_chitietmoithau_service,
    get_dsgoithau_service,
   create_phiendauthau_service,
    get_dsnhathaulv_service
  }