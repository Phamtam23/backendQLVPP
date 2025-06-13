const { poolPromise } = require('../router/conect'); // Kết nối MySQL

const getTatCaNhaThau = async () => {
    try {
        const query = `
            SELECT nhathau.*, linhvuc.tenLinhVuc 
            FROM nhathau 
            INNER JOIN linhvuc ON nhathau.maLinhVuc = linhvuc.maLinhVuc
        `;
        const [rows] = await poolPromise.query(query);
        return rows;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thầu:', error);
        throw new Error("Không thể lấy dữ liệu nhà thầu.");
    }
};

const getNhaThauByMa = async (id) => {
    try {
        const query = `
            SELECT nhathau.*, linhvuc.tenLinhVuc 
            FROM nhathau 
            INNER JOIN linhvuc ON nhathau.maLinhVuc = linhvuc.maLinhVuc 
            WHERE nhathau.maNhaThau = ?
        `;
        const [rows] = await poolPromise.query(query, [id]);
        if (rows.length === 0) throw new Error(`Nhà thầu với ID ${id} không tồn tại.`);
        return rows[0];
    } catch (error) {
        console.error('Lỗi khi lấy nhà thầu:', error);
        throw new Error("Không thể lấy nhà thầu theo ID.");
    }
};

module.exports = { getTatCaNhaThau, getNhaThauByMa };