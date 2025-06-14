const { poolPromise } = require('../router/conect');

const getdanhsachhopdong = async () => {
    try {
        const query = `
                SELECT h.*, p.*,n.* FROM hopdong as h
                inner join phiendauthau as p on  h.maPhienDauThau = p.maPhienDauThau
                inner join nhathau as n on p.maNhaThau = n.maNhaThau
        `;
        const [rows] = await poolPromise.query(query);
        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy danh sách hop dong: ' + error.message);
    }
};
const getThongTinHopDong = async (maHopDong) => {
    try {
        const query = `
            SELECT h.*, p.*, n.*
            FROM hopdong AS h
            INNER JOIN phiendauthau AS p ON h.maPhienDauThau = p.maPhienDauThau
            INNER JOIN nhathau AS n ON p.maNhaThau = n.maNhaThau
            WHERE h.maHopDong = ?;
        `;
        const [rows] = await poolPromise.query(query, [maHopDong]);
        return rows;
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin hợp đồng: ' + error.message);
    }
};

module.exports = {
    getdanhsachhopdong,
    getThongTinHopDong
};