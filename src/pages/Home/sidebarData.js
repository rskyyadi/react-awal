import React from'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';


export const sidebarData = [
    {
        title:'Dashboard',
        path:'/',
        icon:<AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:'List Mahasiswa',
        path:'/reports',
        icon:<IoIcons.IoIosPaper />,
        cName:'nav-text'
    },
    {
        title:'Product',
        path:'/product',
        icon:<FaIcons.FaCartPlus />,
        cName:'nav-text'
    },
    {
        title:'Team',
        path:'/team',
        icon:<IoIcons.IoMdPeople />,
        cName:'nav-text'
    },
    {
        title:'Messages',
        path:'/messages',
        icon:<FaIcons.FaEnvelopeOpenText />,
        cName:'nav-text'
    },
    {
        title:'Support',
        path:'/support',
        icon:<IoIcons.IoMdHelpCircle />,
        cName:'nav-text'
    },
    {
        title:'Contoh',
        path:'/contoh',
        icon:<IoIcons.IoMdHelpCircle />,
        cName:'nav-text'
    },
    {
        title:'Biodata',
        path:'/biodata',
        icon:<IoIcons.IoMdHelpCircle />,
        cName:'nav-text'
    },
    {
        title:'Perpustakaan',
        path:'/perpus',
        icon:<IoIcons.IoMdHelpCircle />,
        cName:'nav-text'
    }
]