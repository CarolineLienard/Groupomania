import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import Edit from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import {remove, likePost} from '../API/post';
import ImageListItem from '@mui/material/ImageListItem';

export default function Post({post, refreshPost, userId, isAdmin}){
    const arrayLikes = post.usersLiked
    const [storage] = useState(JSON.parse(localStorage.getItem('session')))

    const isOwner = storage.userId === post.userId

    function removePost(){
        remove(post._id).then( () => { refreshPost() })
    }

    function handleLike (){
        const isLiked = !arrayLikes.includes(userId)
        likePost(post._id, userId, isLiked).then( () => { refreshPost() })
    }

    return(
       <ImageListItem className="post-card">
            <img 
                className='post-card__image'
                alt={'coucou'} 
                src={post.imageUrl}
                srcSet={post.imageUrl}
                loading="lazy"
             />
            <div className='post-card__content'>
                <div className="post-card__content--text">
                    <p>{post.description}</p>
                </div>
                <div className="post-card__content--interact flex between">
                        <div className="like material-icons grey">
                            <IconButton className="material-icons grey" aria-label="like" size="small" onClick={handleLike}>
                                {
                                    arrayLikes.includes(userId) ? <ThumbUpIcon/> : <ThumbUpOffAltIcon />
                                }
                            </IconButton>
                            <span>{post.likes}</span>
                        </div>
                        
                        {
                            (isOwner || isAdmin) && (
                                <div className="more">
                                    <Link to={`/updatePost/${post._id}`}>
                                        <IconButton className="material-icons grey" aria-label="delete" size="small">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <IconButton className="material-icons grey" aria-label="delete" size="small" onClick={removePost}>
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ) 
                        }
                        
                </div>
            </div>
            
       </ImageListItem>
    )
}
