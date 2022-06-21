const express = require("express");
const multer = require("multer");
const path = require('path')

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage })

app.use(express.static("public"))

const port = process.env.PORT || 4000;

app.post("/file/upload", upload.single("file"), (req, res) => {
    res.send("<h2>Upload realizado com sucesso</h2>");
})

app.listen(port, () => console.log(`APP run on ${port}`))