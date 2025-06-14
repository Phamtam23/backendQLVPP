const { poolPromise } = require('../router/conect'); // Kết nối MySQL


const getTatCaNhaThau = async (req, res) => {
    try {
        const query = `
            SELECT nhathau.*, linhvuc.tenLinhVuc 
            FROM nhathau 
            INNER JOIN linhvuc ON nhathau.maLinhVuc = linhvuc.maLinhVuc
        `;
        const [rows] = await poolPromise.query(query);

        return res.status(200).json({
            errCode: 0,
            message: "Lấy danh sách nhà thầu thành công",
            danhsachnhathau: rows
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thầu:', error);
        return res.status(500).json({
            errCode: -1,
            message: "Không thể lấy dữ liệu nhà thầu."
        });
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