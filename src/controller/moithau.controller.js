const { get_dsmoithau_service, get_chitietmoithau_service, get_dsgoithau_service, get_dsnhathaulv_service, create_phiendauthau_service, creategoithau_service, get_chitietgoithau_service, update_goithau_service} = require("../services/moithau_service");



const get_dsmoithau=async(req,res)=>{
    try
    {
        const data =await get_dsmoithau_service()
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


const get_dsnhathaulv=async(req,res)=>{
    try
    {
        const malinhvuc = req.query.malinhvuc;
        const data =await get_dsnhathaulv_service(malinhvuc)
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
const get_dsgoithau=async(req,res)=>{
    try
    {
        const data =await get_dsgoithau_service()
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

const get_chitietmoithau = async (req, res) => {
    try {
        const maphienthau = req.query.maphienthau;
        const data = await get_chitietmoithau_service(maphienthau)
        if (!data) {
            return res.status(404).send("Not found");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};


const get_chitietgoithau = async (req, res) => {
    try {
        const maGoiThau = req.query.maGoiThau;
        const data = await get_chitietgoithau_service(maGoiThau)
        if (!data) {
            return res.status(404).send("Not found");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};


const suagoithau_controller = async (req, res) => {
  const maGoiThau = req.query.maGoiThau;
  const data = req.body;

  try {
    const result = await update_goithau_service(maGoiThau, data);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      errCode: -1,
      errMessage: error.message || "Lỗi server khi cập nhật gói thầu",
    });
  }
};
const createphiendathau_controller = async (req, res) => {
  try {
    const {
      KeHoach,
      GoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc,
      nhathau
    } = req.body;

    const data = {
      KeHoach,
      GoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc,
      nhathau
    };

    const result = await create_phiendauthau_service(data);
    return res.json(result);
  } catch (error) {
    console.error('Lỗi tạo phiên đấu thầu:', error);
    if (error.message === "Thiếu dữ liệu bắt buộc") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Lỗi server khi tạo phiên đấu thầu" });
  }
};

const update_moithau_taohopdong = async (req, res) => {
  const { maPhienDauThau } = req.body;
  console.log(maPhienDauThau);
  
  try {
    const result = await update_trangthai_hopdong_moithau_service(maPhienDauThau);
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({ errCode: -1, message: e.message });
  }
};



const createGoiThauController = async (req, res) => {
  try {
    const { tenGoiThau, moTaChitiet, maLinhVuc } = req.body;

    if (!tenGoiThau || !moTaChitiet || !maLinhVuc) {
      return res.status(400).json({
        errCode: 1,
        message: 'Thiếu thông tin gói thầu',
      });
    }

    const result = await creategoithau_service (tenGoiThau,moTaChitiet,maLinhVuc)
    return res.status(200).json(result);
  } catch (e) {
    return res.status(500).json({
      errCode: -1,
      message: 'Lỗi server khi tạo gói thầu',
    });
  }
};


module.exports= {
    get_dsmoithau,
    get_chitietmoithau,
    get_dsgoithau,
    get_dsnhathaulv,
   createphiendathau_controller,
   update_moithau_taohopdong,
   createGoiThauController,
    get_chitietgoithau,
    suagoithau_controller
}