const { poolPromise } = require('../router/conect');

const get_all_thietbi_service = async (idDanhMuc) => {
    try {
        let query, params;

        if (idDanhMuc) {
            query = "SELECT * FROM thietbi WHERE maDanhMuc = ?";
            params = [idDanhMuc];
        } else {
            query = "SELECT * FROM thietbi";
            params = [];
        }

        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_thietbi_service:', e);
        throw new Error("Unable to retrieve equipments");
    }
};


const get_all_phong_service = async () => {
   try {
        let query, params;
            query = "SELECT DISTINCT tenPhong FROM ThietBi"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_phong_service:', e);
        throw new Error("Unable to retrieve departments");
    }
};
const get_all_danhmuc_service = async (idDanhMuc) => {
    try {
        let query, params;
         if (idDanhMuc) {
            query = "SELECT * FROM danhmuc WHERE maDanhMuc = ?";
            params = [idDanhMuc];
        } else {
            query = "SELECT *  FROM danhmuc"; 
            params = [];
        }
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_all_danhmuc_service:', e);
        throw new Error("Unable to retrieve categories");
    }
}
// Tạo thiết bị
const create_thietbi_service = async (data) => {
    const {
        tenThietBi,
        maDanhMuc,
        giaBan,
        viTriTrongPhong,
        moTa,
        Hang,
        xuatXu,
        hinhAnh,
        createdAt,
        tenPhong,
        trangThai,
        huongDanSuDung,
        soLuong,
    } = data;

    // Kiểm tra các trường bắt buộc chung
    if (!tenThietBi || !maDanhMuc || !giaBan || !Hang || !xuatXu || !tenPhong || !trangThai) {
        return {
            errCode: 1,
            message: 'Thiếu một hoặc nhiều tham số đầu vào bắt buộc (chung)'
        };
    }
    try {
        const sql = `
            INSERT INTO thietbi (tenThietBi,maDanhMuc,giaBan,viTriTrongPhong,moTa,Hang,
        xuatXu,hinhAnh,createdAt,tenPhong,trangThai,huongDanSuDung,soLuong,soLuongHu
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?, 0)
        `;

        const [result] = await poolPromise.query(sql, [
            tenThietBi,
            maDanhMuc,
            giaBan,
            viTriTrongPhong || null, // Nếu viTriTrongPhong không có giá trị, gán là null
            moTa || null, // Nếu moTa không có giá trị, gán là null
            Hang,
            xuatXu,
            hinhAnh,
            createdAt || new Date(),
            tenPhong,
            trangThai,
            huongDanSuDung,
            soLuong,
        ]);

        return {
            errCode: 0,
            message: 'Tạo thiết bị thành công',
            insertId: result.insertId
        };

    } catch (e) {
        console.error('Lỗi khi tạo thiết bị:', e);
        throw new Error('Đã xảy ra lỗi khi tạo thiết bị');
    }
};
const edit_thietbi_service = async (data) => {
    const {
        maThietBi, // bắt buộc để biết thiết bị nào cần cập nhật
        tenThietBi,
        maDanhMuc,
        giaBan,
        viTriTrongPhong,
        moTa,
        Hang,
        xuatXu,
        hinhAnh,
        createdAt,
        tenPhong,
        trangThai,
        huongDanSuDung,
        soLuong
    } = data;

    if (!maThietBi || !tenThietBi || !maDanhMuc || !giaBan || !Hang || !xuatXu || !tenPhong || !trangThai) {
        return {
            errCode: 1,
            message: 'Thiếu tham số đầu vào bắt buộc khi cập nhật'
        };
    }

    try {
        const sql = `
            UPDATE thietbi SET
                tenThietBi = ?,
                maDanhMuc = ?,
                giaBan = ?,
                viTriTrongPhong = ?,
                moTa = ?,
                Hang = ?,
                xuatXu = ?,
                hinhAnh = ?,
                createdAt = ?,
                tenPhong = ?,
                trangThai = ?,
                huongDanSuDung = ?,
                soLuong = ?
            WHERE maThietBi = ?
        `;

        const [result] = await poolPromise.query(sql, [
            tenThietBi,
            maDanhMuc,
            giaBan,
            viTriTrongPhong || null,
            moTa || null,
            Hang,
            xuatXu,
            hinhAnh,
            createdAt || new Date(),
            tenPhong,
            trangThai,
            huongDanSuDung,
            soLuong,
            maThietBi
        ]);

        return {
            errCode: 0,
            message: 'Cập nhật thiết bị thành công'
        };
    } catch (e) {
        console.error('Lỗi khi cập nhật thiết bị:', e);
        throw new Error('Đã xảy ra lỗi khi cập nhật thiết bị');
    }
};

const delete_thietbi_service = async (maThietBi) => {
    try {
        // Kiểm tra xem user có tồn tại không
        const [rows] = await poolPromise.query("SELECT * FROM thietbi WHERE maThietBi = ?", [maThietBi]);
        if (rows.length === 0) {
            return {
                errCode: 2,
                errMessage: 'Thiết bị không tồn tại',
            };
        }

        // Xóa user
        await poolPromise.query("DELETE FROM thietbi WHERE maThietBi = ?", [maThietBi]);

        return {
            errCode: 0,
            message: 'Thiết bị đã được xóa',
        };
    } catch (error) {
        console.error('Lỗi khi xóa thiết bị:', error);
        throw new Error('Đã xảy ra lỗi khi xóa thiết bị');
    }
};
module.exports = {
    get_all_thietbi_service,
    get_all_phong_service,
    get_all_danhmuc_service,
    create_thietbi_service,
    edit_thietbi_service,
    delete_thietbi_service
};
