import nodemailer from "nodemailer";

var mailList: any[] = [
  "trankha.230102@gmail.com",
  "lamlhdgcs200675@fpt.edu.vn"
]

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_SERVICE_USER,
      pass: process.env.MAIL_SERVICE_PASSWORD,
    },
  });

export const mailOption = {
    from: {
        name: "New submission",
        address: process.env.MAIL_SERVICE_USER
    },
    to: mailList,
    subject: "New submission",
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trang với panel và nút</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f0f0f0;
      }
    
      .panel {
        background-color: #fff;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        text-align: center;
      }
    
      .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }
    
      .btn:hover {
        background-color: #45a049;
      }
    </style>
    </head>
    <body>
    
    <div class="panel">
      <h2>Panel ở giữa</h2>
      <p>Nhấn vào nút dưới đây để điều hướng đến trang web khác:</p>
      <a href="https://www.example.com" class="btn">Điều hướng</a>
    </div>
    
    </body>
    </html>`,

}