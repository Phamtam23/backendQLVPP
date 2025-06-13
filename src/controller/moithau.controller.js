const { get_dsmoithau_service, get_chitietmoithau_service, get_dsgoithau_service, get_dsnhathaulv_service, create_phiendauthau_service } = require("../services/moithau_service");



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

const createphiendathau_controller = async (req, res) => {
  try {
    const {
      maKeHoach,
      maGoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc
    } = req.body;

    const data = {
      maKeHoach,
      maGoiThau,
      duToanKinhPhi,
      ngayNopHoSo,
      ngayDauThau,
      ngayKetThuc
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

module.exports= {
    get_dsmoithau,
    get_chitietmoithau,
    get_dsgoithau,
    get_dsnhathaulv,
   createphiendathau_controller
}