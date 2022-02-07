import logoSidebar from './logo-baru.png';
import './sidebar_2.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChevronLeft, faChevronRight, faUsers} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {sidebarData} from './sidebar_2data';
import {Navbar, Container} from 'react-bootstrap';

//https://www.youtube.com/watch?v=bFvfqUMjvsA

function Sidebar(){
    const [barSamping, setBarSamping] = useState(false)
    const sideBarTampil = () => setBarSamping(!barSamping)
    
    return(
        <div className={barSamping ? 'main-open' : 'main-close'}>
            <Navbar 
                className='fixed-top utama'
                expand="lg">
                    
                <Container className={barSamping ? 'navbar-open' : 'navbar-close'}>
                    <Navbar.Brand 
                        className='navbar-brand d-flex 
                            justify-content-flex-start' 
                        href="#home">

                        <div className='fa-user'>
                            <FontAwesomeIcon 
                                className='users-icon' 
                                icon={faUsers}
                            />
                        </div>
                        <div>
                            Rskyy.id
                        </div>
                    </Navbar.Brand>
                </Container>
            </Navbar>

            <nav className={barSamping ? 'sidebar-open' : 'sidebar-close'}>
                <header>
                    <div className='image-text'>
                        <span className='image'>
                            <img src={logoSidebar} alt='logo'/>
                        </span>

                        <div className='text header-text'>
                            <span className='nama'>Rskyy.id</span>
                            <span className='profesi'>Web Developer</span>
                        </div>
                    </div>

                    <div className='toggle' onClick={sideBarTampil}>
                        <FontAwesomeIcon icon={barSamping ? faChevronLeft : faChevronRight}/>
                    </div>

                    <div className='container menu-bar'>
                        <div className='menu'>
                            <ul className='menu-link'>
                                {sidebarData.map((item, index) => {
                                    return(
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                <span className='item-icon'>{item.icon}</span>
                                                <span className={barSamping ? 'title' : 'title-close'}>{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </header>
            </nav>
        </div>
    )
}
export default Sidebar;