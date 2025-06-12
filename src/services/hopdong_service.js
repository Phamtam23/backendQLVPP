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
        query = "SELECT hopdong.*, tenNhaThau FROM hopdong inner join phiendauthau on hopdong.maPhienDauThau = phiendauthau.maPhienDauThau inner join nhathau on phiendauthau.maNhaThau = nhathau.maNhaThau where hopdong.maHopDong = ?"; 
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

module.exports = {
    get_all_hopdong_service,
    get_detail_hopdong_service
};