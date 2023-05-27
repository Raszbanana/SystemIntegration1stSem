import express from 'express';
import multer from 'multer';

const app = express();

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
    const uniqueSuffix = Date.now() + '-' + 'song';

    const newFileName =
      uniqueSuffix + '___' + originalFileName + '.' + extension;

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('mp3File'), (req, res) => {
  res.send('MP3 file uploaded successfully!');
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
