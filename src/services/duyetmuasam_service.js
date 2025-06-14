const { poolPromise } = require('../router/conect'); // Kết nối MySQL

const getkehoachmuasam = async () => {
    const query = `
        SELECT kehoach.*, taikhoan.* 
        FROM kehoach 
        INNER JOIN taikhoan ON kehoach.maTaiKhoan = taikhoan.id
    `;
    const [rows] = await poolPromise.query(query);
    return rows;
};

module.exports = { getkehoachmuasam };
