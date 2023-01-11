const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const upload = multer({ dest: './uploads/' });
const fs = require('fs');
const { PythonShell } = require('python-shell');
const PORT = 4000;

app.use(cors());
app.use(express.static('uploads'));

app.post('/upload', upload.array('images', 2), (req, res) => {
  // add checks for invalid file types.
  console.log('req files', req.files);

  const id = Math.floor(Math.random() * 100000000);
  fs.mkdirSync(`${__dirname}/uploads/${id}`);

  // maybe make the name the entire path so that the python file can use it as well
  const styleFileType = req.files[0].mimetype.split('/')[1];
  const styleFileName = `style.${styleFileType}`;
  const transferFileType = req.files[1].mimetype.split('/')[1];
  const transferFileName = `transfer.${transferFileType}`;

  fs.rename(
    `./uploads/${req.files[0].filename}`,
    `./uploads/${id}/${styleFileName}`,
    () => {
      // delete original image here
      console.log('Style Image renamed and saved');
      // fs.unlink(
      //   `${__dirname}/uploads/${req.files[1].filename + '.' + transferFileType}`,
      //   (err) => {
      //     if (err) console.log(err);
      //     else console.log('Style Image deleted successfully');
      //   }
      // );
    }
  );
  fs.rename(
    `./uploads/${req.files[1].filename}`,
    `./uploads/${id}/${transferFileName}`,
    () => {
      console.log('Transfer Image renamed and saved');
    }
  );

  // Need to make sure that this runs once the others are done
  // Maybe nest all these.
  const options = {
    scriptPath: `${__dirname}`,
    pythonPath:
      '/Users/harish/programming/neural-style-transfer/env/bin/python',
    args: [
      `${__dirname}/uploads/${id}/${styleFileName}`,
      `${__dirname}/uploads/${id}/${transferFileName}`,
      `${__dirname}/uploads/${id}/generated.jpg`,
    ],
  };
  PythonShell.run('image_styling.py', options, (err, res1) => {
    if (err) console.log(err);
    if (res1) console.log(res1);

    // delete original images and keep the

    // could alternativelty set up static and send the id as the response. a
    res.send(String(id));
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
