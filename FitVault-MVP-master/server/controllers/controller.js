const multer = require('multer');
const Models = require('../models/Models.js');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/photosUploaded/'); // Specify the destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for each uploaded file
    const uniqueFileName = path.basename(file.originalname);
    cb(null, uniqueFileName);

  },
});

// Initialize multer with the storage configuration
const imageUpload = multer({ storage: storage });
const uploadedFileNames = new Set();


module.exports = {

  addItem:  (function (req, res) {
    imageUpload.array('photos', 6)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log('Error uploading files:', err);
        return res.status(500).send('File upload error');
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log('Unknown error uploading files:', err);
        return res.status(500).send('Internal Service Error');
      }

    const params = {item: req.body.item, category: req.body.category, color: req.body.color, brand: req.body.brand, occasion: req.body.occasion, tags: req.body.tags, photos: []}


    // Handle file uploads
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const originalName = file.originalname;
        if (!uploadedFileNames.has(originalName)) {
          uploadedFileNames.add(originalName);
          params.photos.push(file.filename);
        } else {
          console.log('Duplicate file name:', originalName);
        }
      }
    }

    Models.addItem(params)
    .then(() => {
      res.status(201).send('successfully added')
    })
    .catch((error) => {
      console.log('Error adding item', error);
      res.status(500).send('Internal Service Error')
    })
  })
  }),

  getCloset: (function (req, res) {
      Models.getCloset()
      .then((closet) => {
        res.status(200).send(closet)
      })
      .catch((error) => {
        console.log('Error retrieving closet', error);
        res.status(500).send('Internal Service Error')
      })
  }),

  searchCloset: (function (req, res) {
    const searched = req.params.searched
    Models.searchCloset(searched)
    .then((searchedCloset) => {
    res.status(200).send(searchedCloset)
    })
  .catch((error) => {
    console.log('Error searching closet', error);
    res.status(500).send('Internal Service Error')
  })
}),

  updateItem: (function (req, res) {
    console.log('INSDE PUT CONTROLLER')
    imageUpload.array('photos', 6)(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log('Error uploading files:', err);
        return res.status(500).send('File upload error');
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log('Unknown error uploading files:', err);
        return res.status(500).send('Internal Service Error');
      }

    const itemId = req.params.id;
    const params = {item: req.body.item, category: req.body.category, color: req.body.color, brand: req.body.brand, occasion: req.body.occasion, tags: req.body.tags, photos: []}


    // Handle file uploads
    if (req.files && req.files.length > 0) {
      // Assuming you want to store the filenames in the database as an array
      params.photos = req.files.map((file) => file.filename);
    }

    Models.updateItem(itemId, params)
    .then(() => {
      res.status(201).send('successfully edited')
    })
    .catch((error) => {
      console.log('Error adding item', error);
      res.status(500).send('Internal Service Error')
    })
  })

  }),

  deleteItem: (function(req, res) {
    const id = req.params.id;
    Models.deleteItem(id)
    .then((response) => {
      res.status(200).send('Item deleted successfully');
    })
    .catch((error) => {
      console.log('Error deleting item', error);
      res.status(500).send('Internal Service Error')
    })

  }),

  async chatWithGPT(req, res) {
    try {
      const { message, cleanClosetData } = req.body;
      // console.log(req.body, 'REQ.BODY')
      // Call the method from models to get the outfit suggestion
      const chatResponse = await Models.getOutfitSuggestionFromGPT(cleanClosetData, message);

      // You can now send the 'chatResponse' back to the client
      res.json({ response: chatResponse });
    } catch (error) {
      console.error('Error while chatting with GPT:', error);
      res.status(500).json({ error: 'Failed to chat with GPT' });
    }
  },




}

