const nodemail = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/send", async (req, res) => {
  const { Name, Subject, Email, Message } = req.body;
  const contactMail = nodemail.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOpt = {
    from: process.env.EMAIL_USER,
    to: "favouriteudeh10@gmail.com",
    subject: Subject,
    text: `
    Name : ${Name}
    Email : ${Email}
    Message : ${Message}
    `,
  };
  try{
  await contactMail.sendMail(mailOpt);
    res.status(200).send("message sent");
  }catch(err){
    console.error(err);
    res.status(500).send(err.message);
  }
  res.send(`
    <body>
    <h1>
    Thanks for reaching out to us</h1>
    
    </body>
    `);
});
app.get("/send", async (req, res) => {
    res.send('backend is working')
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server is running"));
