const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
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
      return res.json({ slides: slideURLs });
    });
  });
});

app.post("/ask-ai", async (req, res) => {
  try {
    const { prompt, slideImage } = req.body;

    let inputMessage = [];

    // If slide image is included → attach both text + image
    if (slideImage) {
      inputMessage.push({
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
            ${prompt}

            FORMAT INSTRUCTIONS:
            - Respond ONLY in clear bullet points.
            - No long paragraphs.
            - Keep points short and simple.
            - If slide image is provided, explain elements in bullet points.
            - Use bullets like:
            • Point
            • Point
            • Point
            `
            },

          {
            type: "input_image",
            image_url: slideImage
          }
        ]
      });
    } else {
      // Only text
      inputMessage.push({
        role: "user",
        content: [
          { type: "input_text", text: prompt }
        ]
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: inputMessage
      })
    });

    const data = await response.json();

    // Extract output
    let answer = "";

    if (data.output_text) {
      answer = data.output_text;
    } else if (data.output && data.output[0]?.content) {
      answer = data.output[0].content.map(c => c.text || "").join("");
    } else {
      console.log("⚠ OPENAI EMPTY RESPONSE:", data);
      answer = "I could not understand the slide. Try rephrasing.";
    }

    return res.json({ answer });

  } catch (err) {
    console.error("AI Error:", err);
    return res.status(500).json({ error: "AI request failed" });
  }
});


app.get("/slide-base64", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const filePath = url.replace("http://localhost:5000", __dirname);

    const imageBuffer = await fs.readFile(filePath);
    const base64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    res.json({ base64 });

  } catch (err) {
    console.error("Base64 Error:", err);
    res.status(500).json({ error: "Failed to convert slide" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
