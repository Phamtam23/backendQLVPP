const { get_all_yeucau_service, get_chi_tiet_yeucau_service, duyet_yeucau_service, tu_choi_yeucau_service } = require("../services/yeucau_service");

const get_dsyeucau=async(req,res)=>{
    try
    {
        const data =await get_all_yeucau_service()
        if(!data||data.length<0)
        {
            return res.status(400).json({
                errCode: 1,
                message: 'Loi khi lay danh sach yeu cau!',
                users: []
            });
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            danhsachyeucau: data
        });

    }
    catch(error)
    {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
}

const get_chitietyeucau = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await get_chi_tiet_yeucau_service(id);
        console.log(id);
        
        if (!data) {
            return res.status(400).json({
                errCode: 1,
                message: 'Loi khi lay chi tiet yeu cau!',
                chitietyeucau: {}
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Lấy dữ liệu thành công',
            chitietyeucau: data
        });

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};

const duyet_yeucau = async (req, res) => {
    try {
        const { maYeuCau, ngayDuyet } = req.body;
        const success = await duyet_yeucau_service(maYeuCau, ngayDuyet);

        if (!success) {
            return res.status(400).json({ errCode: 1, message: 'Không tìm thấy yêu cầu để duyệt' });
        }

        return res.status(200).json({ errCode: 0, message: 'Duyệt yêu cầu thành công' });
    } catch (error) {
        return res.status(500).send('Lỗi: ' + error.message);
    }
};

const tu_choi_yeucau = async (req, res) => {
    try {
        const { maYeuCau, ngayDuyet, lyDoTuChoi } = req.body;
        const success = await tu_choi_yeucau_service(maYeuCau, ngayDuyet, lyDoTuChoi);

        if (!success) {
            return res.status(400).json({ errCode: 1, message: 'Không tìm thấy yêu cầu để từ chối' });
        }

        return res.status(200).json({ errCode: 0, message: 'Từ chối yêu cầu thành công' });
    } catch (error) {
        return res.status(500).send('Lỗi: ' + error.message);
    }
};

module.exports={
    get_dsyeucau,
    tu_choi_yeucau,
    duyet_yeucau,
    get_chitietyeucau
}