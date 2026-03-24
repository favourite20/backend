const nodemail = require("nodemailer");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.post("/send", async (req, res) => {
  const { Name, Subject, Email, Message } = req.body;
  const contactMail = nodemail.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    service: "gmail",
    port: "550",
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASS,
    },
  });

  const mailOpt = {
    from: Email,
    to: "favouriteudeh10@gmail.com",
    subject: Subject,
    text: `
    Name : ${Name}
    Email : ${Email}
    Message : ${Message}
    `,
  };
  await contactMail.sendMail(mailOpt);
  res.send(`
    <body>
    <h1>
    Thanks for reaching out to us</h1>
    <a href="portfolio.html">go back</a>
    </body>
    `);
});
app.get("/send", async (req, res) => {
    res.send('backend is working')
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("server is running"));
