import React, {useState} from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {Link} from 'react-router-dom';
import {sidebarData} from '../pages/Home/sidebarData';
import "./Riskyy.css";
import {IconContext} from 'react-icons';
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons'

//https://www.youtube.com/watch?v=q8cabjyUTVY

function SideBar(){

    const [barSamping, setBarSamping] = useState(false)
    const sideBarTampil = () => setBarSamping(!barSamping)

//Style CSS
    const navbarStyle = {
        backgroundColor: '#060b26',
        height: '80px',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
    }

    const menuBars = {
        marginLeft:'2rem',
        fontSize:'2rem',
        background:'none'
    }

    const menuBarsll = {
        marginLeft:'2rem',
        fontSize:'2rem',
        background:'none'
    }

    const navMenu = {
        backgroundColor:'#060b26',
        width:'250px',
        height:'100vh',
        display:'flex',
        justifyContent:'center',
        position:'fixed',
        top:'0',
        left:'-100%',
        transition:'850ms',
        zIndex:100
    }

    const navMenuActive = {
        left:'0',
        width:'250px',
        top:'0',
        height:'100vh',
        position:'fixed',
        backgroundColor:'#060b26',
        transition:'850ms',
        zIndex:100
    }

    const navRight = {
        marginLeft:'auto', 
        display:'flex', 
        alignItems:'baseline',
        marginRight:'3%',
    }

    const buttonNav = {
        padding:'5px',
        paddingLeft:'10px',
        paddingRight:'10px'
    }

    const textNav = {
        color:'white', 
        fontSize:'15px',
        marginLeft:'10px'
    }


    return(
        <div>
            <IconContext.Provider value={{color:'#fff'}}>

                <div className='navbar fixed-top' style={navbarStyle}>
                    <Link 
                        to='#' 
                        className='menu-bars' 
                        style={menuBars}>
                        <FaIcons.FaBars onClick={sideBarTampil}/>
                    </Link>

                    <div style={navRight}>
                        <Button 
                            style={buttonNav}
                            title='Lonceng'
                            variant='warning'>
                            <FontAwesomeIcon icon={faBell}/>
                        </Button>

                        <h5 style={textNav}>
                            Point Of Sale
                        </h5>
                    </div>
                </div>

                <nav style={barSamping ? navMenuActive : navMenu}>
                    <ul className='nav-menu-items' onClick={sideBarTampil}>

                        <li className='navbar-toggle'>
                            <Link 
                                to='#' 
                                className='menu-bars' 
                                style={menuBarsll}>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>

                        {sidebarData.map((item, index) => {
                            return(
                                <li key={index} className={item.cName}>
                                    <Link style={{marginLeft:'-20px'}} to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                        
                    </ul>
                </nav>
            </IconContext.Provider>
        </div>
    )
}
export default SideBar;