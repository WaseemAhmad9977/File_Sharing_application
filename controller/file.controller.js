import fileModel from "../model/file.schema.js";
import nodemailer from 'nodemailer'

//configure nodemailer

const smtpLayout = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New File Received</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #007bff;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #333;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            background: #007bff;
            color: white;
            text-decoration: none;
            padding: 12px 20px;
            font-size: 16px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .button:hover {
            background: #0056b3;
        }
        .footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background: #f4f4f4;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="header">
            📁 ShareKit - New File Received!
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>You have received a new file through ShareKit. Click the button below to access your file.</p>
            <a href="#" class="button">Download File</a>
        </div>
        <div class="footer">
            &copy; 2025 ShareKit. All rights reserved.
        </div>
    </div>

</body>
</html>`



export const uploadFile = async (req, res) => {
  try {
    console.log(req.file);
    const file = new fileModel({
      user: req.user.id,
      filename: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size,
      path: `storage/file/${req.file.filename}`,
    });

    await file.save();

    res.status(200).json({
      message: file,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const fetchFile = async (req, res) => {
  try {
    const user = await fileModel.find();
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteFile = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await fileModel.findByIdAndDelete(id);

    if (!user)
      return res.status(404).json({
        message: "failed to delete",
      });

    res.status(200).json({
      message: "file deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const downloadFile = async (req, res) => {
  try {

    const { path } = req.body;
    // res.send(path)
    res.download(path, (err) => {
       if(err)
        return res.status(404).send("failed to download");
    });
  } catch (err) {
    res.status(500).send("failed to request");
  }
};



export const shareFile=async (req,res)=>{
    try {
      //createTransport 
    const transport = nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:process.env.SMTP_EMAIL,
        pass:process.env.SMTP_PASSWORD
      }
    })

    await transport.sendMail({
      from:process.env.SMTP_EMAIL,
      to:'bipasha.malik1@gmail.com',
      subject:'ShareKit ! New file recieved',
      html:smtpLayout
    })

    res.status(200).json({message:'email sent'})
    
    } catch (err) {
        console.log(err.message)
    }
    
}
