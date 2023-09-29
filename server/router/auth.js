const express = require('express');
const router = express.Router();
const multer = require('multer');
require('../db/conn');
const { v4: uuidv4 } = require('uuid');
const hashing = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authentication");
const User = require('../model/userschema');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const path = require('path');


const fs = require('fs');
router.get('/', (req, res) => {
  res.send("Hello Router");
});


//Using Async Await
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json("Error!!! Please fill all the details properly");
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ error: "User Already exists" });
    }
    else if (password != cpassword) {
      return res.status(422).json({ error: "Please check your Password " });
    }
    else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //Hashing Of Password will be done before save 

      const userRegister = await user.save();
      if (userRegister) {
        res.status(201).json({ message: "Registered Successfully" });
      }
    }

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login

router.post('/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please Fill Your Details");
    }
    const login = await User.findOne({ email: email });

    if (login) {
      const isMatch = await hashing.compare(password, login.password);

      token = await login.generateAuthToken();
      // console.log(token);
      res.cookie("jwtoken", token,
        {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
          secure: true,
          sameSite: 'strict'
        });

      if (!isMatch) {
        res.status(404).json({ error: "Failed to Sign In" })
      }
      else {
        res.status(201).json({ message: "Sign In Successfully" });
      }
    }
    else {
      res.status(422).json({ error: "Invalid Credentials" });
    }

  }
  catch (err) {
    console.log(err);
  }

});

router.get('/about', authenticate, (req, res) => {
  res.send(req.rootUser);

});
router.get('/getdata', authenticate, (req, res) => {
  res.status(200).send(req.rootUser);

});
router.get('/logout', authenticate, (req, res) => {
  res.clearCookie('jwtoken', { path: '/' });
  res.status(200).send(`User Logout`);

});


// Create the "uploads" directory if it doesn't exist
const uploadsDirectory = './uploads';
if (!fs.existsSync(uploadsDirectory)) {
  fs.mkdirSync(uploadsDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // The destination folder where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4();
    cb(null, uniqueFilename + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB (in bytes)
  },
});

// Route for file upload
router.post('/uploadfile', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // console.log('Uploaded file:', req.file);
    // At this point, you can save the file information to the database associated with the authenticated user.
    const userId = req.rootUser._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the file information to the user's documents or create a new document for files if needed.
    user.uploadedFiles.push({
      fileName: req.file.filename,
      filePath: req.file.path,
      originalName: req.file.originalname,
    });

    await user.save();
    res.status(200).json({ message: 'File uploaded successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to upload file' });
  }

});

// Route for viewing all files
router.get('/viewfiles', authenticate, async (req, res) => {
  try {
    const userId = req.rootUser._id;
    const usersWithFiles = await User.findById(userId, 'uploadedFiles');

    if (!usersWithFiles) {
      return res.status(404).json({ message: 'User not found' });
    }

    const usedStorage = usersWithFiles.uploadedFiles.reduce(
      (totalSize, file) => totalSize + file.fileSize,
      0
    );

    const remainingStorage = 10 * 1024 * 1024 - usedStorage; // 10 MB in bytes

    const filesList = usersWithFiles.uploadedFiles.map((file) => ({
      userName: usersWithFiles.name,
      userEmail: usersWithFiles.email,
      fileName: file.fileName,
      filePath: file.filePath,
      originalName: file.originalName,
      fileSize: file.fileSize,
    }));

    res.status(200).json({ files: filesList, usedStorage, remainingStorage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch files' });
  }
});
// Route for downloading a file
router.get('/download/:fileName', authenticate, (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);
  console.log("view")
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.error(err);
      return res.status(404).json({ error: 'File not found' });
    }

    // Use the "Content-Disposition" header to specify the file name for download
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    // Stream the file as the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Handle any errors during the file stream
    fileStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Unable to download the file' });
    });
  });
});



module.exports = router;