const { poolPromise } = require('../router/conect');

const get_all_kehoachchonnhathau_service = async () => {
    try {
        const query = `
            SELECT 
                k.maKeHoach AS id,
                k.tenKeHoach AS title,
                n.tenNhaThau AS contractor,
                k.donVi AS investor,
                CONCAT(DATE_FORMAT(k.thoiGianBatDau, '%d/%m'), ' - ', DATE_FORMAT(k.thoiGianKetThuc, '%d/%m/%Y')) AS time,
                IFNULL(gt.tenGoiThau, 'Mua sắm thiết bị') AS type,
                CASE k.trangThai WHEN '1' THEN 'approved' WHEN '0' THEN 'pending' ELSE k.trangThai END AS status
            FROM kehoach k
            LEFT JOIN phiendauthau pdt ON pdt.maKehoach = k.maKeHoach
            LEFT JOIN nhathau n ON n.maNhaThau = pdt.maNhaThau
            LEFT JOIN goithau gt ON gt.maGoiThau = pdt.maGoiThau
            ORDER BY k.thoiGianBatDau DESC
        `;
        const [rows] = await poolPromise.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

const get_kehoachchonnhathau_by_id_service = async (id) => {
    try {
        const query = `
            SELECT 
                k.maKeHoach AS id,
                k.tenKeHoach AS title,
                n.tenNhaThau AS contractor,
                k.donVi AS investor,
                CONCAT(DATE_FORMAT(k.thoiGianBatDau, '%d/%m'), ' - ', DATE_FORMAT(k.thoiGianKetThuc, '%d/%m/%Y')) AS time,
                IFNULL(gt.tenGoiThau, 'Mua sắm thiết bị') AS type,
                CASE k.trangThai WHEN '1' THEN 'approved' WHEN '0' THEN 'pending' ELSE k.trangThai END AS status,
                n.maSoThue,
                n.hoTenNguoiDaiDien
            FROM kehoach k
            LEFT JOIN phiendauthau pdt ON pdt.maKehoach = k.maKeHoach
            LEFT JOIN nhathau n ON n.maNhaThau = pdt.maNhaThau
            LEFT JOIN goithau gt ON gt.maGoiThau = pdt.maGoiThau
            WHERE k.maKeHoach = ?
            LIMIT 1
        `;
        const [rows] = await poolPromise.query(query, [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
};

const approve_kehoachchonnhathau_service = async (id) => {
    try {
        const query = `UPDATE kehoach SET trangThai = '1' WHERE maKeHoach = ?`;
        await poolPromise.query(query, [id]);
    } catch (error) {
        throw error;
    }
};

const reject_kehoachchonnhathau_service = async (id) => {
    try {
        const query = `UPDATE kehoach SET trangThai = '0' WHERE maKeHoach = ?`;
        await poolPromise.query(query, [id]);
    } catch (error) {
        throw error;
    }
};

const approve_all_kehoachchonnhathau_service = async () => {
    try {
        const query = `UPDATE kehoach SET trangThai = '1' WHERE trangThai = '0'`;
        await poolPromise.query(query);
    } catch (error) {
        throw error;
    }
};

const reject_all_kehoachchonnhathau_service = async () => {
    try {
        const query = `UPDATE kehoach SET trangThai = '0' WHERE trangThai = '0'`;
        await poolPromise.query(query);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    get_all_kehoachchonnhathau_service,
    get_kehoachchonnhathau_by_id_service,
    approve_kehoachchonnhathau_service,
    reject_kehoachchonnhathau_service,
    approve_all_kehoachchonnhathau_service,
    reject_all_kehoachchonnhathau_service
};