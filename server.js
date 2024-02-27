
import express from 'express';
import multer from 'multer'
import path from 'path';

import mergedPdf from './merge_pdf.js';


const app = express();
app.use('/static', express.static('public'))

const __dirname = path.resolve()

const port = 3000;

const upload = multer( {dest: 'uploads/' } );

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
  }); 

// Handle form submission
// For more info: https://www.npmjs.com/package/multer
app.post('/merge', upload.fields([{ name: 'pdf1', maxCount: 1 }, { name: 'pdf2', maxCount: 1 }]), async (req, res) => {
  const pdf1 = path.join(__dirname, req.files.pdf1[0].path);
  const pdf2 = path.join(__dirname, req.files.pdf2[0].path);
//   console.log(req.files)
//   res.send({data: req.files})

await mergedPdf(pdf1, pdf2)
res.redirect("http://localhost:3000/static/merged.pdf")
});

// Listen to the port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
