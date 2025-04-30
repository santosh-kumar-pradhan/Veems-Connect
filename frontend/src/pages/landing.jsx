import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'


export default function LandingPage() {

  const router = useNavigate();

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Veems Connect</h2>
        </div>
        <div className='navList'>
          <p onClick={() => {
            router("/guest")
          }}>Join as Guest</p>
          <p onClick={() => {
            router("/auth")

          }}
          >Register</p>
          <div onClick={() => {
            router("/auth")

          }}
            roll='button'>
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "#ff9839" }}>Connect</span> with your Loved Ones</h1>
          <br />
          <p>Cover a distance by Veems Connect</p> 
          <br />
          <div roll="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        <div>
          <img src="./mobile.png" alt="" />
        </div>
      </div>

    </div>
  )
}
