import React from 'react'
import '../src/sass/main.scss'
import ReactDOM from "react-dom/client"
import Login from './pages/Login'
import Register from './pages/Register'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import AddPost from './pages/AddPost'
import UpdatePost from './pages/UpdatePost'


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login to="/login" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/homepage" element={<HomePage/>} />
        <Route path="/addPost" element={<AddPost/>} />
        <Route path="/UpdatePost/:postId" element={<UpdatePost/>} />
        <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
      </Routes>
    </BrowserRouter>
)
