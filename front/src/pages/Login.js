import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.svg'
import { useState } from "react"
import { loginUser } from '../API/auth'

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate()

    function handleLogin(){
        const user = {
            email: email,
            password: password
        }
        loginUser(user).then(res => {
            if(res && res.token && res.userId){
                const userInfo = {
                    token : res.token,
                    userId: res.userId
                }
                localStorage.setItem('session', JSON.stringify(userInfo));
                navigate('/homepage')
            }
        })
    }

    return(
        <div className="login-page flex column">
            <div className="form flex align-center justify-center column">
                
                <img src={Logo} alt=""/>
                
                <div className="inputs flex column">
                    <div className="email-input">
                        <span>Email</span>
                        <input type="text" placeholder="" onChange={(e) => {setEmail(e.target.value)}}/>
                    </div>

                    <div className="pass-input">
                        <span>Password</span>
                        <input type="text" placeholder="" onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                </div>
                

                <div className="button flex align-center column">
                    <button onClick={handleLogin}>Login</button>
                    <p className="message">You don't have an account yet?<Link to="/register"> Sign up</Link></p>
                </div>
                
            </div>
        </div>
    )
}