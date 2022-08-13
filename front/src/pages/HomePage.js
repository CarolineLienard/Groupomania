import Post from '../components/Post'
import Header from '../components/Header'
import HeaderMobile from '../components/HeaderMobile'
import MobileNav from '../components/MobileNav'

import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAllPost } from '../API/post'
import { useTheme } from '@mui/material/styles'

import Box from '@mui/material/Box'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ImageList from '@mui/material/ImageList'
import useMediaQuery from '@mui/material/useMediaQuery'


export default function HomePage(){
    const [storage] = useState(JSON.parse(localStorage.getItem("session")))
    const [listPosts, setListPost] = useState([])
    const theme = useTheme()
    const smallDevice = useMediaQuery(theme.breakpoints.down("sm"))
    const mediumDevice =  useMediaQuery(theme.breakpoints.down('md'))
    const largeDevice =  useMediaQuery(theme.breakpoints.down('lg'))


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
            <HeaderMobile />
            <MobileNav />
            <div className='mainContainer flex column'>
                <div className="filter flex">
                    <span className='flex align-center'>Lastest<KeyboardArrowDownIcon/></span>
                </div>
                <Box>
                    <ImageList variant="masonry" cols={ smallDevice ? 1 : mediumDevice ? 2 : largeDevice ? 3 : 4 } gap={30}>
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




