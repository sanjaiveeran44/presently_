const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());


app.use("/slides", express.static(path.join(__dirname, "slides")));


const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});


app.post("/upload", upload.single("ppt"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const inputPath = req.file.path;
  const folderId = uuidv4();
  const outputDir = path.join(__dirname, "slides", folderId);

  await fs.ensureDir(outputDir);

  console.log("Processing:", inputPath);

  
  const libreOfficeCommand = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

  exec(libreOfficeCommand, (err) => {
    if (err) {
      console.error("PDF conversion failed:", err);
      return res.status(500).json({ error: "PPT → PDF conversion failed" });
    }

    // Find generated PDF
    const pdfFile = fs.readdirSync(outputDir).find(f => f.endsWith(".pdf"));
    if (!pdfFile) {
      return res.status(500).json({ error: "PDF not generated!" });
    }

    const pdfPath = path.join(outputDir, pdfFile);

 
    const magickPath = `"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe"`;
    const pngCommand = `${magickPath} "${pdfPath}" "${outputDir}\\slide_%d.png"`;

    exec(pngCommand, (err2) => {
      if (err2) {
        console.error("PNG conversion failed:", err2);
        return res.status(500).json({ error: "PDF → PNG conversion failed" });
      }

     
      const slideFiles = fs.readdirSync(outputDir)
        .filter(f => f.endsWith(".png"))
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/));
          const numB = parseInt(b.match(/\d+/));
          return numA - numB;
        });

      const slideURLs = slideFiles.map(
        file => `http://localhost:5000/slides/${folderId}/${file}`
      );
      console.log("Slide URLs:", slideURLs);
      return res.json({ slides: slideURLs });
    });
  });
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
