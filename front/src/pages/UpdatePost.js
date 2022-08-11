import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Link, useParams, useNavigate } from "react-router-dom";
import { updatePost, getOnepost } from '../API/post';
import Header from '../components/Header'


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
            <Header />
            
            <div className='addPost flex column'>
                
                <div className='postContent flex'>
                    <div className='addImg flex column align-center justify-center text-center'>
                        <div className='postTitle flex align-center justify-center column'>
                            <IconButton className="material-icons red" color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file" onChange={handlePicture}/>
                                <PhotoCamera />
                            </IconButton>
                            <h1>Cliquez pour télécharger la photo depuis votre appareil</h1>
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
                    onChange={handleDescription}
                    />
                </div>
            
                <div className='postButton flex end'>
                    <button onClick={update}>Enregistrer</button>
                </div>    
            </div>
        </div>    
    )
}