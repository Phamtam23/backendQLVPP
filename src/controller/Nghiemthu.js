const { getnghiemthu_services, getnghiemthuchitiet_services, xacNhanNghiemThu_service } = require("../services/nghiemthu_service");

const get_dsnghiemthu=async(req,res)=>{
    try
    {
        const data =await getnghiemthu_services()
        if(!data)
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



const get_chitietnghiemthu = async (req, res) => {
    try {
        const manghiemthu = req.query.maNghiemthu;
        const data = await getnghiemthuchitiet_services(manghiemthu)

        if (!data) {
            return res.status(404).send("Not found");
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error('Error occurred:', error);
        return res.status(500).send('An error occurred: ' + error.message);
    }
};


const xacNhanNghiemThu = async (req, res) => {
  try {
    const result = await xacNhanNghiemThu_service(req.body)
    return res.json(result);
  } catch (error) {
    console.error('Lỗi xác nhận nghiệm thu:', error);
    if (error.message === "Thiếu dữ liệu bắt buộc") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Lỗi server khi xác nhận nghiệm thu" });
  }
};




module.exports={
   get_dsnghiemthu,
   get_chitietnghiemthu,
   xacNhanNghiemThu
   
}