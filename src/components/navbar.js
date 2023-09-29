import React, {useContext} from 'react';
import ongcimage from '../components/ongcimage.png';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import {userContext} from "../App"

export default function Navbar() { 
    const PageRender=()=>
    {
    const {state}=useContext(userContext);
    if(state)
    {
        return(
            <>
                <NavLink to="/home"><li>Home</li></NavLink>
                <NavLink to="/about"><li>About</li></NavLink>
                <NavLink to="/logout"><li>Logout</li></NavLink>
                <NavLink to="/filelist"><li>FileList</li></NavLink>
            </>
        )
    }
    else
        return(
            <>
                <NavLink to="/home"><li>Home</li></NavLink>
                <NavLink to="/about"><li>About</li></NavLink>
                <NavLink to="/login"><li>Sign In</li></NavLink>
                <NavLink to="/signup"><li>Sign Up</li></NavLink>
            </>
        )
    

}
    
    return (
        <>
            <nav>
                <div className='maindiv'>
                    <div>
                        <ol className='navitems'>
                            <li id='logoimage'><img src={ongcimage} alt='ongcimage'></img></li>
                        </ol>
                    </div>


                    <div >
                        <ol className='navitems'>
                            <li className='navlists'>ONGC</li>

                            <PageRender/>
                        </ol>
                    </div>

                </div>
            </nav >
        </>
    )
}

