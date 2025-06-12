const { getDashboardDataService } = require("../services/dashboard_service");

const getDashboardData = async (req, res) => {
  try {
    const { month, year } = req.query;
    const result = await getDashboardDataService(month, year);
    return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            dashboard: result
        });
  } catch (err) {
    return res.status(500).json({
      errCode: 1,
      message: 'Internal server error from controller.',
      dashboard: {}
    });
  }
};

module.exports = {
  getDashboardData,
};
