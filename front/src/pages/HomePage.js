import Post from '../components/Post'
import Header from '../components/Header'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllPost } from '../API/post'
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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
            setListPost(res)
        })
    }

    return (
        <div>
            <Header />
            <div className='mainContainer flex column'>
                <div className="filter flex">
                    <span className='flex align-center'>Lastest<KeyboardArrowDownIcon/></span>
                </div>
                <Grid container spacing={2}>
                {
                    listPosts && listPosts.map((post) => (
                        <Grid item xs={3} key={post._id}>
                            <Post post={post} refreshPost={handlePosts} userId={storage.userId}/>
                        </Grid>
                    ))
                }
                </Grid>
            </div>
        </div>
    )
}