import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    const filenameParts = file.originalname.split('.');
    if (filenameParts.length <= 1) {
      cb(new Error('File has invalid extension ' + file.originalname));
      return;
    }

    const extension = filenameParts[filenameParts.length - 1];
    const originalFileName = filenameParts.join('.');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    const newFileName =
      uniqueSuffix + '___' + originalFileName + '.' + extension;

    cb(null, newFileName);
  },
});
const upload = multer({ storage });

app.post('/form', (req, res) => {
  delete req.body.password;
  res.send({ data: req.body });
});

app.post('/file', upload.single('file'), (req, res) => {
  res.send({ data: req.body });
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
