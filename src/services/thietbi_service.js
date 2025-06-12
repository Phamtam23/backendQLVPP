const { poolPromise } = require('../router/conect');

const get_all_thietbi_service = async () => {
   try {
        let query, params;
            query = "SELECT * FROM thietbi"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_thieibi_service:', e);
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
const get_all_danhmuc_service = async () => {
    try {
        let query, params;
            query = "SELECT *  FROM danhmuc"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_all_danhmuc_service:', e);
        throw new Error("Unable to retrieve categories");
    }
}
module.exports = {
    get_all_thietbi_service,
    get_all_phong_service,
    get_all_danhmuc_service,
};
