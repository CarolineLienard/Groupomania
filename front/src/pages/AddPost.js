import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { addUserPost } from '../API/post'

export default function AddPost() {
    const [post, setPost] = useState('')
    const [imagePost, setImagePost] = useState('')
    let navigate = useNavigate()


    function onSubmit () {
        const token = JSON.parse(localStorage.getItem('session'))
        const data = {
            userId: token.userId,
            description: post,
        }
        addUserPost(data, imagePost).then(() => { navigate('/homepage') })
    }

    function handlePicture(e){
        setImagePost(e.target.files[0])
    }

    
    return (
        <div>
            <h1>Add a post</h1>
            <Link to="/homepage"><ArrowBackIcon /></Link>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => {setPost(e.target.value)}}/>
            <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handlePicture}/>
                <PhotoCamera />
            </IconButton>
            <button onClick={onSubmit}>Post</button>
        </div>
    )
}