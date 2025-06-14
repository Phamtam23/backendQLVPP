const { getkehoach_services, getkehoachchitiet_services, getyeucau_services, createkehoach_service, updateKeHoach_service, deletekehoahc_services } = require("../services/kehoach_service");

const get_dskehoach=async(req,res)=>{
    try
    {
        const data =await getkehoach_services()
        if(!data||data.length<0)
        {
            return res.status(404).send("Not found")
    
        }
       return res.status(200).json(data)

    }
    catch(error)
    {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
}

const get_chitietkehoach = async (req, res) => {
    try {
        const maKeHoach = req.query.maKeHoach;
        const data = await getkehoachchitiet_services(maKeHoach);

        if (!data) {
            return res.status(404).send("Not found");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};

const get_dsyeucau=async(req,res)=>{
    try
    {
        const data =await getyeucau_services()
        if(!data||data.length<0)
        {
            return res.status(404).send("Not found")
    
        }
       return res.status(200).json(data)

    }
    catch(error)
    {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
}

const create_kehoach = async (req, res) => {
    try {
        const {
            tenKeHoach,
            TongHopYeuCau,
            chuDautu,
            thoiGianBatDau,
            thoiGianKetThuc,
            donVi,
            matk,
            loaiyc,
            trangThai,
            chiPhiKeHoach
        } = req.body;

        // ✅ Kiểm tra bắt buộc các trường cần thiết
        if (!tenKeHoach || !chuDautu || !matk || !loaiyc) {
            return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
        }

        // ✅ Gọi service tạo kế hoạch
        await createkehoach_service(
            tenKeHoach,
            TongHopYeuCau,
            chuDautu,
            thoiGianBatDau || null,
            thoiGianKetThuc || null,
            donVi || '',
            matk,
            loaiyc,
            trangThai || 0,
            chiPhiKeHoach
        );

        return res.status(200).send('Kế hoạch created successfully');
    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred');
    }
};

const update_kehoach = async (req, res) => {
    try {
        const {
            maKeHoach,
            tenKeHoach,
            TongHopYeuCau,
            chuDautu,
            thoiGianBatDau,
            thoiGianKetThuc,
            donVi,
            matk,
            loaiyeucau,
            trangThai,
            chiPhiKeHoach
        } = req.body;


        // ✅ Gọi service cập nhật kế hoạch
        await updateKeHoach_service(
            maKeHoach,
            tenKeHoach,
            TongHopYeuCau,
            chuDautu,
            thoiGianBatDau || null,
            thoiGianKetThuc || null,
            donVi || '',
            matk,
            loaiyeucau,
            trangThai || 0,
            chiPhiKeHoach
        );

        return res.status(200).send('Cập nhật kế hoạch thành công');
    } catch (error) {
        console.error('Lỗi khi cập nhật kế hoạch:', error);
        return res.status(500).send('Đã xảy ra lỗi khi cập nhật kế hoạch');
    }
};

const delete_kehoach = async (req, res) => {
    try {
      const maKeHoach=req.query.maKeHoach
      await deletekehoahc_services(maKeHoach)
        return res.status(200).send('Xóa kế hoạch thành công');
    } catch (error) {
        console.error('Lỗi khi cập nhật kế hoạch:', error);
        return res.status(500).send('Đã xảy ra lỗi khi cập nhật kế hoạch');
    }
};


module.exports={
    get_dskehoach,
    get_chitietkehoach,
    get_dsyeucau,
   create_kehoach,
   update_kehoach,
   delete_kehoach
   
}