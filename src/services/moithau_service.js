const { rows } = require('mssql');
const { poolPromise } = require('../router/conect');
require('dotenv').config
const dayjs = require('dayjs');
const { getkehoachchitiet_services } = require('./kehoach_service');
const { sendEmailService } = require('./email_services');

  const get_dsmoithau_service =async()=> {
     try
    {
        const [data]=await poolPromise.query("select maPhienDauThau,maGoiThau,phiendauthau.maKehoach,phiendauthau.trangThai,maNhaThau,ngayDauThau,ngayNopHoSo,ngayKetthuc,giaTrungThau,duToanKinhPhi,kehoach.maKeHoach,TongHopYeuCau,chuBuTu,thoiGianBatDau,thoiGianKetThuc,donVi,lyDoTuChoi,loaiyeucau,maTaiKhoan,chiPhiKeHoach from phiendauthau,kehoach where phiendauthau.maKeHoach=kehoach.maKeHoach");
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
      SELECT maPhienDauThau,phiendauthau.maGoiThau,maKehoach,phiendauthau.trangThai,phiendauthau.maNhaThau,ngayDauThau,ngayNopHoSo,ngayKetthuc,giaTrungThau,duToanKinhPhi,tenGoiThau,moTaChiTiet,ngayTao,goithau.maLinhVuc,tenLinhVuc,nhathau.*
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

const get_chitietgoithau_service = async (maGoiThau) => {
  try {
    
    const [rows] = await poolPromise.query(`
      SELECT maGoiThau,tenGoiThau,moTaChiTiet,goithau.trangThai,linhvuc.maLinhVuc,tenLinhVuc,ngayTao
      FROM goithau
      JOIN linhvuc ON goithau.maLinhVuc = linhvuc.maLinhVuc
      WHERE goithau.maGoiThau = ?
    `, [maGoiThau]);

    if (rows.length === 0) {
      throw new Error("Không tìm thấy phiên đấu thầu");
    }

    return rows;

  } catch (e) {
    console.error('❌ Lỗi chi tiết trong get_chitietmoithau_service:', e.message);
    console.error('❌ Stack:', e.stack);
    throw new Error("Unable to retrieve moithau details");
  }
};


const update_goithau_service = async (maGoiThau, data) => {
  try {
    const { tenGoiThau,  moTaChiTiet, maLinhVuc,trangThai } = data;

    
    const [result] = await poolPromise.query(
      `
      UPDATE goithau 
      SET tenGoiThau = ?, moTaChiTiet = ?, maLinhVuc = ?,trangThai=?
      WHERE maGoiThau = ?
      `,
      [tenGoiThau,moTaChiTiet, maLinhVuc,trangThai, maGoiThau]
    );

    if (result.affectedRows === 0) {
      throw new Error("Không tìm thấy gói thầu để cập nhật");
    }

    return {
      errCode: 0,
      message: "✔️ Cập nhật gói thầu thành công",
    };
  } catch (e) {
    console.error("❌ Lỗi khi cập nhật gói thầu:", e.message);
    throw new Error("❌ Cập nhật gói thầu thất bại");
  }
};

  const get_dsgoithau_service =async()=> {
     try
    {
        const [data]=await poolPromise.query("select maGoiThau,tenGoiThau,moTaChiTiet,goithau.trangThai,linhvuc.maLinhVuc,tenLinhVuc,ngayTao from goithau,linhvuc where goithau.maLinhVuc=linhvuc.maLinhvuc");
    
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
      KeHoach,
      GoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc,
      nhathau
    } = data;

    const maPhiendauthau = "PDTT" + KeHoach.maKeHoach.slice(-6);

    await poolPromise.query(
      `INSERT INTO phiendauthau 
        (maPhienDauThau, maGoiThau, maKeHoach, trangThai, maNhaThau, ngayDauThau, ngayNopHoSo, ngayKetthuc, giaTrungThau, duToanKinhPhi) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        maPhiendauthau,
        GoiThau.maGoiThau,
        KeHoach.maKeHoach,
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
      [KeHoach.maKeHoach]
    );
const dsnhathau = nhathau.map(item => {
  return item.Email;
}).join(',');

   console.log(dsnhathau)


const danhSachHTML = `
<p><strong>📌 Danh sách thiết bị yêu cầu</strong></p>
${KeHoach.yeucau.map(item => `
  <ul>
    <li><strong>${item.tenThietBi} – Số lượng: ${item.soLuong}</strong></li>
    <ul>
      <li>▸ Lý do đề xuất: ${item.lyDoDeXuat}</li>
      <li>▸ Mô tả: ${item.moTaChiTiet}</li>
      <li>▸ Tình trạng: ${item.tinhTrangThietBi}</li>
      <li>▸ Vị trí: ${item.tenPhong || 'Không xác định'}</li>
    </ul>
  </ul>
`).join('')}
`;
   const html = `
<p>Kính gửi: <strong>Quý Nhà thầu</strong></p>

<p>Trường Sư phạm Kỹ thuật Đà Nẵng trân trọng kính mời Quý Nhà thầu tham gia đấu thầu cho gói thầu sau:</p>

<ul>
  <li><strong>🔹 Tên gói thầu:</strong> ${GoiThau.tenGoiThau}</li>
  <li><strong>🔹 Mô tả chi tiết:</strong> ${GoiThau.moTaChiTiet}</li>
  <li><strong>🔹 Lĩnh vực:</strong> ${GoiThau.tenLinhVuc}</li>
</ul>

<ul>
  <li><strong>🔹 Thuộc kế hoạch:</strong> ${KeHoach.tenKeHoach}</li>
  <li><strong>🔹 Chủ đầu tư:</strong>${KeHoach.chuBuTu}</li>
  <li><strong>🔹 Loại yêu cầu:</strong>${KeHoach.loaiYeuCau}</li>
  <li><strong>🔹 Đơn vị tổ chức:</strong> ${KeHoach.donVi}</li>

</ul>

<hr>

<p><strong>📌 Thông tin phiên đấu thầu</strong></p>
<ul>
  <li><strong>🔹 Hạn nộp hồ sơ:</strong> ${ngayNopHoSo}</li>
  <li><strong>🔹 Ngày mời thầu:</strong> ${ngayDauThau}</li>
  <li><strong>🔹 Ngày kết thúc đấu thầu:</strong> ${ngayKetThuc}</li>
  <li><strong>🔹 Dự toán kinh phí:</strong>  ${duToanKinhPhi} VND</li>
  <li><strong>🔹 Hình thức đấu thầu:</strong> Đấu thầu rộng rãi</li>
  <li><strong>🔹 Loại hợp đồng:</strong> Hợp đồng trọn gói</li>
</ul>

<hr>


${danhSachHTML}

<hr>

<p>Kính mong Quý Nhà thầu quan tâm, chuẩn bị hồ sơ dự thầu và gửi về đúng hạn để tham gia quá trình đấu thầu. Mọi thắc mắc xin liên hệ đơn vị mời thầu để được hướng dẫn thêm.</p>

<p>Trân trọng kính mời,</p>
<p><strong>Trường Đại học Sư phạm Kỹ thuật Đà Nẵng</strong></p>
<a href="http://localhost:3000/phieuthau/${maPhiendauthau}" target="_blank">Truy cập trang đấu thầu</a>
<br>
<small>(Email được gửi tự động từ hệ thống quản lý văn phòng phẩm)</small>
`;

  await sendEmailService(dsnhathau,html)

    return { message: "Tạo phiên đấu thầu thành công" };
  } catch (e) {
    console.error('Lỗi khi tạo phiên đấu thầu:', e);
    throw new Error("Không thể tạo phiên đấu thầu");
  }
};

const update_trangthai_hopdong_moithau_service = async (maPhienDauThau) => {
  try {
    const query = `
      UPDATE phiendauthau
      SET trangThai = 'Đã tạo HD'
      WHERE maPhienDauThau = ?
    `;
    const params = [maPhienDauThau];
    const [result] = await poolPromise.query(query, params);

    if (result.affectedRows === 0) {
      throw new Error(`Phiên đấu thầu với mã ${maPhienDauThau} không tồn tại.`);
    }

    return { errCode: 0, message: 'Cập nhật thành công!' };
  } catch (e) {
    console.error('Lỗi khi cập nhật hợp đồng:', e);
    throw new Error('Không thể cập nhật hợp đồng');
  }
};


const generateMaGoiThau10 = (maLinhVuc) => {
  const now = new Date();

  const lv = maLinhVuc.slice(-2); // Lấy 2 số cuối của mã lĩnh vực
  const yyMMdd = now.toISOString().slice(2, 10).replace(/-/g, ''); // yyMMdd
  const hour = now.getHours().toString().padStart(2, '0'); // hh
  const second = now.getSeconds().toString().padStart(2, '0'); // ss

  // Rút gọn còn 10 ký tự
  return `GT${lv}${yyMMdd.slice(2)}${hour.slice(-1)}${second.slice(-1)}`;
};

const creategoithau_service = async (
  tenGoiThau,
  moTaChitiet,
  maLinhVuc
) => {
  try {
   
    const maGoiThau = generateMaGoiThau10(maLinhVuc);
   
    const formattedDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    // ✅ Câu lệnh SQL
    const sql = `
      INSERT INTO goithau (
        maGoiThau, tenGoiThau, moTaChitiet, maLinhVuc,
      trangThai,ngayTao
      
      )
      VALUES ( ?, ?, ?, ?, ?, ?)
    `;

    const value = [
    maGoiThau,
    tenGoiThau,
    moTaChitiet,
    maLinhVuc,
    "Hoạt động",
    formattedDate

    ]

   const result= await poolPromise.query(sql,value)
    return result;
  } catch (e) {
    console.error(e);
    throw new Error('Error while creating kế hoạch');
  }
};

const updatePhienDauThau_service = async (
  maPhienThau,
  trangThai,
  maNhaThau = null,
  giaTrungThau = null
) => {
  try {
    // Validate inputs
    if (!maPhienThau || !trangThai) {
      throw new Error('maPhienThau và trangThai là bắt buộc');
    }
    if (trangThai === 'Hoàn thành' && maNhaThau && giaTrungThau !== null && (isNaN(giaTrungThau) || giaTrungThau < 0)) {
      throw new Error('giaTrungThau phải là một số không âm khi trạng thái là Hoàn thành');
    }

    let sql = `
      UPDATE phiendauthau
      SET trangThai = ?
    `;
    const values = [trangThai];

    if (trangThai === 'Hoàn thành') {
      if (maNhaThau) {
        sql += `, maNhaThau = ?`;
        values.push(maNhaThau);
      }
      if (giaTrungThau !== null) {
        sql += `, giaTrungThau = ?`;
        values.push(Number(giaTrungThau));
      }
    }

    sql += ` WHERE maPhienDauThau = ?`;
    values.push(maPhienThau);

    const [result] = await poolPromise.query(sql, values);
    
    if (result.affectedRows === 0) {
      throw new Error('Không tìm thấy phiên đấu thầu với maPhienThau cung cấp');
    }

    return {
      success: true,
      message: 'Cập nhật phiên đấu thầu thành công',
      affectedRows: result.affectedRows
    };
  } catch (error) {
    console.error('Lỗi khi cập nhật phiên đấu thầu:', error);
    throw new Error(error.message || 'Lỗi khi cập nhật phiên đấu thầu');
  }
};

  module.exports ={
    get_dsmoithau_service,
    get_chitietmoithau_service,
    get_dsgoithau_service,
   create_phiendauthau_service,
    get_dsnhathaulv_service,
    update_trangthai_hopdong_moithau_service,
   creategoithau_service,
   update_goithau_service,
   get_chitietgoithau_service,
   updatePhienDauThau_service


  }