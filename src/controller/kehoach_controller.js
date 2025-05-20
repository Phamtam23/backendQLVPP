const { getkehoach_services, getkehoachchitiet_services } = require("../services/kehoach_service");

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

module.exports={
    get_dskehoach,
    get_chitietkehoach
}