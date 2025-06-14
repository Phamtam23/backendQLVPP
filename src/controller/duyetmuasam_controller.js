const { getkehoachmuasam } = require('../services/duyetmuasam_service');

const getChonMuaSam = async (req, res) => {
    try {
        const data = await getkehoachmuasam();
        res.status(200).json({ errCode: 0, message: 'Thành công', danhsachkehoach: data });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách nhà thầu:', error);
        res.status(500).json({ errCode: 3, message: error.message, danhsachkehoach: [] });
    }
};


module.exports = {
    getChonMuaSam,

};
