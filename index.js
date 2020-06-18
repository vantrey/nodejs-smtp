const express = require('express');
const nodemailer = require("nodemailer");
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

let transporter = nodemailer.createTransport({
  service: "gmail",
  /*host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports*/
  auth: {
    user: 'vantreysmtp@gmail.com', // generated ethereal user
    pass: 'kelmeteka12345687', // generated ethereal password
  },
});

app.post('/sendMessage', async function (req, res) {

  let {name, email, message} = req.body.data

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'Ivan Tolkachev portfolio', // sender address
    to: "vantrey@yandex.ru", // list of receivers
    subject: "portfolio mail", // Subject line
    //text: "Hello world?", // plain text body
    html: `<b>message from my portfolio</b>
          <div>
          name: ${name}
          </div>
          <div>
          email: ${email}
          </div>
          <div>
          message: ${message}
          </div>
`, // html body
  });

  res.send(req.body)
})

app.listen(3010, function () {
  console.log('Example app listening on port 3000!');
});