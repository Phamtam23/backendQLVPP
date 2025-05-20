const { rows } = require('mssql');
const { poolPromise } = require('../router/conect');
require('dotenv').config

const getkehoach_services=async()=>
{
    try
    {
        const [data]=await poolPromise.query("select * from kehoach");
        return data
    }
    catch(e)
    {
        console.error('Error occurred in get_user_service:', e);
        throw new Error("Unable to retrieve users");
    }
}

const getkehoachchitiet_services = async (maKeHoach) => {
    try {
        const [keHoachRows] = await poolPromise.query(
            `SELECT * FROM kehoach WHERE maKeHoach = ?`, [maKeHoach]
        );

        if (!keHoachRows || keHoachRows.length === 0) {
            throw new Error("Không tìm thấy kế hoạch với mã này.");
        }
    
        const data = keHoachRows[0];
        let datasp;
        console.log("maYeucau:", data.maYeucau);
        if (data.loaiyeucau === "Mua sắm") {
            const [res] = await poolPromise.query(
                `SELECT * FROM yeucau_muasam WHERE maYeucau = ?`, [data.maYeuCau]
            );
            datasp = res;
        } else {
            const [res] = await poolPromise.query(
                `SELECT * FROM yeucau_suachua,thietbi WHERE yeucau_suachua.maSanPham=thietbi.maThietbi and maYeucau = ?`, [data.maYeuCau]
            );
           
            datasp = res;
        }

        // Gán danh sách sản phẩm vào data
        data.sanpham = datasp;
        return data;

    } catch (e) {
        console.error('Error occurred in getkehoachchitiet_services:', e);
        throw new Error("Unable to retrieve users");
    }
};



module.exports={
   getkehoach_services,
   getkehoachchitiet_services
}