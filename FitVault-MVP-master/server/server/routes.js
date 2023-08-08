const express = require('express')
const router = express.Router()
const Controller = require('../controllers/Controller.js');

router.post('/',Controller.addItem);
router.get('/', Controller.getCloset);
router.get('/search/:searched', Controller.searchCloset);
router.put('/edit/:id', Controller.updateItem);
router.delete('/delete/:id', Controller.deleteItem);

// New route for ChatGPT API integration
router.post('/api/chat', Controller.chatWithGPT);


module.exports = router;