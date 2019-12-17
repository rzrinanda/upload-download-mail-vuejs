const express = require("express");
const fs = require("fs");
const util = require("util");
const mkdir = util.promisify(fs.mkdir);
const path = require("path");
const router = express.Router();
const nodemailer = require("nodemailer");
const Queue = require("bull");
const csvParse = require("csv-parse/lib/sync");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express get" });
});
router.post("/", function(req, res, next) {
  res.json({ title: "Express Post", name: "Something" });
});

router.get("/mail-queue", async (req, res) => {
  const mailQueue = new Queue("mail queue");

  mailQueue.add({
    from: req.body.from || "mul14.net@gmail.com",
    to: req.body.to || "mul14.net@gmail.com",
    subject: req.body.subject || "Lorem ipsum",
    text: req.body.message || "Hello World!"
    // html: "<b>Hello world?</b>" // html body
  });
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
  if (!fs.existsSync(process.env.UPLOADED_PATH))
    fs.mkdirSync(process.env.UPLOADED_PATH, { recursive: true });

  if (req.files.file.length > 1) {
    req.files.file.map((file, index) => {
      const ext = path.extname(file.name);
      const fileName = req.body.name[index] + ext;
      file.mv(process.env.UPLOADED_PATH + "/" + fileName, err => {
        if (err) return res.status(500).send(err);
      });
    });
  } else {
    const ext = path.extname(req.files.file.name);
    req.files.file.mv(
      process.env.UPLOADED_PATH + "/" + req.body.name + ext,
      err => {
        if (err) return res.status(500).send(err);
      }
    );
  }

  res.json({
    message: "File has been uploaded!",
    data: req.files
  });
});

router.get("/download/:filename", async (req, res) => {
  // await mkdir('folder')

  res.sendFile(
    process.cwd() + "/" + process.env.UPLOADED_PATH + "/" + req.params.filename
  );
});

router.get("/download-pdf", async (req, res) => {
  res.download(process.cwd() + "/uploads/dummy.pdf");
});

router.get("/preview-pdf", async (req, res) => {
  res.sendFile(process.cwd() + "/uploads/dummy.pdf");
});

router.get("/csv", async (req, res) => {
  const file = fs.readFileSync(process.cwd() + "/uploads/master_personil.csv");

  const csvContent = file.toString();

  const parsed = csvParse(csvContent);

  console.log(parsed);

  for (let i = 1; i < parsed.length; i++) {
    $sql =
      "INSERT INTO master_personil (npp, nama_lengkap, email_internet) VALUES (?, ?, ?)";
    const [[result]] = await sequelize.query($sql, {
      replacements: [parsed[i][0], parsed[i][1], parsed[i][21]],
      type: sequelize.QueryTypes.INSERT
    });

    console.log(result);
  }

  res.end();
});

router.get("/view-html", async (req, res) => {
  const html = `
    <div>NAMA ORANG: ME</div>
    <div>AGE: 322</div>
    <div>NAMA ORANG: ME</div>
    <div>NAMA ORANG: ME</div>
  `;
  res.send(html);
});

router.get("/create-pdf", async (req, res) => {
  const { spawn } = require("child_process");
  const pdf = spawn("/usr/local/bin/wkhtmltopdf", [
    process.env.BASE_URL_EXPRESS + "/view-html",
    process.cwd() +
      "/" +
      process.env.UPLOADED_PATH +
      "/output" +
      Date.now() +
      ".pdf"
  ]);

  pdf.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });

  res.end();
});

module.exports = router;
