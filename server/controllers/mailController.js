const nodemailer=require("nodemailer");

exports.sendmail=function (req, res) {
  async function main() {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "ang.conejeros@gmail.com",
        pass: "qwe123asd123",
      },
    });

    let info = await transporter.sendMail({
      from: 'No responder', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject,
      text: req.body.text,
      html: req.body.html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
  res.json({
    status: "Correo Enviado",
    message: "El correo fue enviado con exito",
  });
};
