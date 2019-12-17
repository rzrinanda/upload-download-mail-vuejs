var express = require("express");
var fs = require("fs");
const util = require("util");
var mkdir = util.promisify(fs.mkdir);
var path = require("path");
var router = express.Router();
const nodemailer = require("nodemailer");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express get" });
});
router.post("/", function(req, res, next) {
  res.json({ title: "Express Post", name: "Something" });
});
router.get("/mail", async (req, res) => {
  var transporter = nodemailer.createTransport({
    // sendmail: true,
    // newline: 'unix',
    // path: '/usr/sbin/sendmail'
    // host: "smtp.mailtrap.io",
    // port: 2525,
    host: "localhost",
    port: 1025
    // auth: {
    //   user: "321678e0259fa3a32",
    //   pass: "a7d329c08d6281"
    // }
  });

  let info = await transporter.sendMail({
    from: req.body.from || "rzrinanda@gmail.com",
    to: req.body.to || "rzrinanda@gmail.com",
    subject: req.body.subject || "Lorem ipsum",
    text: req.body.message || "Hello World!"
    // html: "<b>Hello world?</b>" // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  res.json(nodemailer.getTestMessageUrl(info));
});

router.post("/upload", function(req, res, next) {
  // console.log('wqeqwd'+req.files.file.name);
  // console.log('title '+req.body.name);

  //checknif directory is not exists
  if (!fs.existsSync("uploads")) fs.mkdirSync("uploads", { recursive: true });

  if (req.files.file.length > 1) {
    req.files.file.map((file, index) => {
      const ext = path.extname(file.name);
      const fileName = req.body.name[index] + ext;
      file.mv("uploads/" + fileName, err => {
        if (err) return res.status(500).send(err);
      });
    });
  } else {
    const ext = path.extname(req.files.file.name);
    req.files.file.mv("uploads/" + req.body.name + ext, err => {
      if (err) return res.status(500).send(err);
    });
  }

  res.json({
    message: "File has been uploaded!",
    data: req.files
  });
});

router.get("/download", function(req, res, next) {
  // console.log(req.files);
  const rootPath = path.resolve(__dirname, "../images");
  res.sendFile(rootPath + "/A0YoBxV.jpg");
});

module.exports = router;
