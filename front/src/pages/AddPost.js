import Header from '../components/Header'
import HeaderMobile from '../components/HeaderMobile'

import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import PhotoCamera from '@mui/icons-material/PhotoCamera'
import { useState } from 'react'
import { addUserPost } from '../API/post'
import { useNavigate } from "react-router-dom";

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

    console.log(imagePost);
    
    return (
        <div>
            <Header />
            <HeaderMobile />
          
            <div className='addPost flex column'>
                
                <div className='postContent flex'>
                    <div className='addImg flex column align-center justify-center text-center'>
                        <div className='postTitle flex align-center justify-center column'>
                            <IconButton className="material-icons red" color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={handlePicture}/>
                                <PhotoCamera />
                            </IconButton>
                           
                            <h1>
                                {
                                    imagePost ? imagePost.name : "Cliquez pour télécharger la photo depuis votre appareil"
                                }
                            </h1>
                        </div>
                        <span>Recommandation: Utilisez des fichiers .jpg de haute qualité de moins de 20mo.</span>
                    </div>
                    
                    <TextField
                    id="standard-multiline-static"
                    multiline
                    fullWidth
                    maxRows={10}
                    helperText="60 caractères maximum"
                    placeholder="Commencer votre post"
                    variant="standard"
                    onChange={(e) => {setPost(e.target.value)}}
                    />
                </div>

                <div className='postButton flex end'>
                    <button onClick={onSubmit}>Enregistrer</button>
                </div>    
            </div>

        </div>    
    )
}