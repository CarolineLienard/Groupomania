const Post = require('../model/Post')
const fs = require('fs'); // Node module for images


                                        // ADD A NEW POST

exports.createPost = async (req, res, next) => {

    // Create an object with req.body
    const postObject = JSON.parse(req.body.post)

    // Create a new post
    const post = new Post({
        ...postObject, // copy the object and add the rest

        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        usersLiked: [],
        
    })
    // Save the post and send the response
    try {
      post.save()
      res.send({message: "Post créé"})
    } catch(err) {
          res.status(401).send(err)
    }
}



                                    // GET ALL POST ON HOMEPAGE

exports.getAllPost = (req, res, next) => {

    // Find all the sauces in the database
    Post.find()

    // Return the sauce
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({
        error
      }))
}


                                         // GET ONE POST

exports.getOnePost = (req, res, next) => {

    // Find the post ID we want in the DB
    Post.findOne({
        _id: req.params.id
    })

    // Return the post
    .then(post => res.status(200).json(post))
    .catch(error => res.status(404).json({
    error
    }));
};


                                        // UPDATE A POST

exports.modifyPost = (req, res, next) => {

    let postObject = {}

    console.log(req.body, 'body')
    // If there is an image modification
    req.file ? (

        // Find the ID of the post to update
        Post.findOne({
            _id: req.params.id
        }).then((post) => {
            const filename = post.imageUrl.split('/images/')[1]
            fs.unlinkSync(`images/${filename}`) // Delete the old image from the DB
        }),
      
      // Update the post object with the new image
      postObject = {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }  
    ) : ( // else just update the object with the new values
      postObject = {
        ...req.body
      }
    )

    // Update the post with the new parameters
    Post.updateOne(
        {
          _id: req.params.id
        }, {
          ...postObject,
          _id: req.params.id
        }
    )

    // Send the response
    .then(() => res.status(200).json({
    message: 'Post modifiée !'
    }))
    .catch((error) => res.status(400).json({
    error
    }))
}


                                        // DELETE A POST

exports.deletePost = (req, res, next) => {

    // Find the ID of the sauce we want to delete
    Post.findOne({
        _id: req.params.id
    })

    .then(post => {
        const filename = post.imageUrl.split('/images/')[1] // Get the image url, split around the name of the file
        fs.unlink(`images/${filename}`, () => { // Delete the file and then, the rest

            Post.deleteOne({
                _id: req.params.id
            })
            .then(() => res.status(200).json({
                message: 'Post supprimé !'
            }))
            .catch(error => res.status(400).json({
                error
            }))
        })
    })

    .catch(error => res.status(500).json({
    error
    }));
}


                                        // LIKE A POST
                                  
exports.likePost = (req, res, next) => {

    let like = req.body.like
    let userId = req.body.userId
    let postId = req.params.id
  
    // Adding 1 like
    if (like === 1) { 
      Post.updateOne({
          _id: postId
        }, {
          $push: {
            usersLiked: userId
          },
          $inc: {
            likes: +1
          }
        })
        .then(() => res.status(200).json({
          message: '1 like added !'
        }))
        .catch((error) => res.status(400).json({
          error
        }))
    }

    // Update like or dislike
    if (like === 0) {
      Post.findOne({
          _id: postId
        })
        .then((post) => {
          if (post.usersLiked.includes(userId)) { 
            Post.updateOne({
                _id: postId
              }, {
                $pull: {
                  usersLiked: userId
                },
                $inc: {
                  likes: -1
                }
              })
              .then(() => res.status(200).json({
                message: '-1 like'
              }))
              .catch((error) => res.status(400).json({
                error
              }))
            }
          })
    }
}                              