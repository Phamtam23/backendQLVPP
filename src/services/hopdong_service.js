const { poolPromise } = require('../router/conect');

const get_all_hopdong_service = async () => {
   try {
        let query, params;
            query = "SELECT * FROM hopdong"; 
            params = [];
        const [rows] = await poolPromise.query(query, params);
        return rows;
    } catch (e) {
        console.error('Error occurred in get_hopdong_service:', e);
        throw new Error("Unable to retrieve equipments");
    }
};

module.exports = {
    get_all_hopdong_service
};