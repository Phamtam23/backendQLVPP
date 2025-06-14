const nodemailer = require("nodemailer");

/**
 * Gửi email tới danh sách nhà thầu
 * @param {string} dsemail - Danh sách email, ngăn cách bằng dấu phẩy
 * @param {string} thu - Nội dung HTML của thư
 */
const sendEmailService = async (dsemail, thu) => {
  try {
    console.log(dsemail)
    console.log(thu)
    const transporter = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "bnlptt009@gmail.com",
      pass: "gsmelrzxvdgpqapu",
    },
  });

    const info = await transporter.sendMail({
      from: '"Trường Đại học Sư phạm Kỹ thuật Đà Nẵng" <bnlptt009@gmail.com>',
      to:dsemail, 
      subject:"Thư mời đấu thầu-Trường Đại học Sư phạm Kỹ thuật Đà nẵng",
      html:thu,
    });

    console.log("✔️ Email đã được gửi:", info.messageId);
  } catch (e) {
    console.error("❌ Lỗi khi gửi email:", e);
  }
};

module.exports = { sendEmailService };
