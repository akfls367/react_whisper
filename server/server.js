const express = require("express");
const multer = require("multer");
const cors = require("cors"); // CORS 추가
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 5000;

// CORS 설정
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;

  const pythonProcess = spawn("python", [
    path.join(__dirname, "transcribe.py"),
    filePath,
  ]);

  let transcription = "";
  pythonProcess.stdout.on("data", (data) => {
    transcription += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("Python 에러:", data.toString());
  });

  pythonProcess.on("close", (code) => {
    fs.unlinkSync(filePath);

    if (code === 0) {
      try {
        const result = JSON.parse(transcription);
        if (result.error) {
          res.status(500).json({ error: result.error });
        } else {
          res.json({ transcription: result.transcription });
        }
      } catch (error) {
        res.status(500).json({ error: "결과 처리 오류" });
      }
    } else {
      res.status(500).json({ error: "Python 실행 실패" });
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
