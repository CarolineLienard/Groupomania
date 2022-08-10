import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams, useNavigate } from "react-router-dom";
import { updatePost, getOnepost } from '../API/post';

export default function UpdatePost() {
    const { postId } = useParams();
    const [post, setPost] = useState('')
    const [imagePost, setImagePost] = useState(null)
    let navigate = useNavigate()

    const [storage] = useState(JSON.parse(localStorage.getItem('session')))

   // const isOwner = storage.userId === post.userId

    useEffect(() => {
        getOnepost(postId).then(res => {
            setPost(res[0].description)
            setImagePost(res[0].imageUrl)
        })
    }, [])



    function update(){
        const token = JSON.parse(localStorage.getItem('session'))
        const data = {
            userId: token.userId,
            description: post,
        }
        updatePost(postId, data, imagePost).then(() => { navigate('/homepage') })
    }

    function handlePicture(e){
        setImagePost(e.target.files[0])
    }

    function handleDescription(e){
        setPost(e.target.value)
    }

    return (
        <div>
            <h1>Update a post</h1>
            <Link to="/homepage"><ArrowBackIcon /></Link>
            <TextField 
                id="description" 
                label="outlined" 
                variant="outlined" 
                value={post}
                onChange={handleDescription}
            />
            {
                imagePost && (
                    <img src={imagePost} height={113}/>
                )
            }
            <IconButton color="primary" aria-label="upload picture" component="label" onChange={handlePicture}>
                <input hidden accept="image/*" type="file" />
                <PhotoCamera />
            </IconButton>
            <button onClick={update}>Modifier</button>
        </div>
    )
}