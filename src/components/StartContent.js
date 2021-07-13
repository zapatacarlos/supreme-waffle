import React from 'react'
import homeImage from "../images/homeImage.jpg";
import "../App.css";
import {Button} from '@material-ui/core';
import { Link } from "react-router-dom";

function StartContent() {
    return (
        <div>
         <header className="App-header">
            <img src={homeImage} className="homeImage" alt="Home"></img>  
            <p className="homeTitle">
            Let the PokeFight begin!
            </p>
            <hr/>
            <Link to="/pokemonarena" style={{ textDecoration: 'none' }} >
            <Button variant="contained" size="large"> Let's go!</Button>
            </Link>
            
         </header>

        </div>
    )
}

export default StartContent

