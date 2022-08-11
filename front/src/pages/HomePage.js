import Post from '../components/Post'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllPost } from '../API/post'
import Box from '@mui/material/Box';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageList from '@mui/material/ImageList';


export default function HomePage(){
    const [storage] = useState(JSON.parse(localStorage.getItem("session")))
    const [listPosts, setListPost] = useState([])

    let navigate = useNavigate()

    useEffect(()=>{
        if(!storage){
            navigate('/login')
        }
        handlePosts()
    }, [storage, navigate])


    function handlePosts(){
        getAllPost().then(res => {
            setListPost(res.reverse())
        })
    }

    return (
        <div>
            <Header />
            <div className='mainContainer flex column'>
                <div className="filter flex">
                    <span className='flex align-center'>Lastest<KeyboardArrowDownIcon/></span>
                </div>
                <Box>
                    <ImageList variant="masonry" cols={4} gap={30}>
                    {
                        listPosts && listPosts.map((post, index) => (
                            <Post index={index} post={post} refreshPost={handlePosts} userId={storage.userId}/>
                        ))
                    }
                    </ImageList>       
                </Box>  
            </div>
        </div>
    )
}




