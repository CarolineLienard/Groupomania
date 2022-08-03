const router = require('express').Router()
const multer = require('../middleware/multer-config')
const verify = require('../middleware/verifyToken')
const saucesCtrl = require('../controllers/post')


// Get all post on homepage
router.get('/', verify, saucesCtrl.getAllPost)

// Get one post 
router.get('/:id', verify, saucesCtrl.getOnePost)

// Create a new Post
router.post('/', verify, multer, saucesCtrl.createPost)

// Modifiy a Post
router.put('/:id', verify, multer, saucesCtrl.modifyPost)

// Delete a Post
router.delete('/:id', verify, saucesCtrl.deletePost);

// Like Post
router.post('/:id/like', verify, saucesCtrl.likePost)


module.exports = router;